"use client"

import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Copy, RotateCcw, Edit, Trash2, Check } from "lucide-react"
import { useState } from "react"
import { maskToken, formatDate, copyToClipboard } from "@/lib/api-utils"
import { regenerateToken, deleteToken } from "@/app/actions/api-tokens"
import { TokenActionDialog } from "@/components/token-action-dialog"

interface Token {
  id: number
  name: string
  token_prefix: string
  last_used_at: string | null
  created_at: string
  expires_at: string | null
  is_active: boolean
}

interface ApiTokensListProps {
  tokens: Token[]
}

export function ApiTokensList({ tokens }: ApiTokensListProps) {
  const [visibleTokens, setVisibleTokens] = useState<Set<number>>(new Set())
  const [copiedTokens, setCopiedTokens] = useState<Set<number>>(new Set())
  const [regeneratingTokens, setRegeneratingTokens] = useState<Set<number>>(new Set())

  const toggleTokenVisibility = (tokenId: number) => {
    const newVisible = new Set(visibleTokens)
    if (newVisible.has(tokenId)) {
      newVisible.delete(tokenId)
    } else {
      newVisible.add(tokenId)
    }
    setVisibleTokens(newVisible)
  }

  const handleCopy = async (tokenPrefix: string, tokenId: number) => {
    try {
      await copyToClipboard(tokenPrefix)
      const newCopied = new Set(copiedTokens)
      newCopied.add(tokenId)
      setCopiedTokens(newCopied)
      setTimeout(() => {
        setCopiedTokens((prev) => {
          const updated = new Set(prev)
          updated.delete(tokenId)
          return updated
        })
      }, 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleRegenerate = async (tokenId: number) => {
    setRegeneratingTokens((prev) => new Set(prev).add(tokenId))
    try {
      const formData = new FormData()
      formData.append("tokenId", String(tokenId))
      const result = await regenerateToken(formData)
      if (result.success) {
        // Show the new token temporarily
        const newToken = "token" in result ? result.token : ""
        alert(`New token generated: ${newToken}\n\nPlease copy it now, you won't see it again!`)
      }
    } catch (error) {
      console.error("Failed to regenerate token:", error)
      alert("Failed to regenerate token")
    } finally {
      setRegeneratingTokens((prev) => {
        const updated = new Set(prev)
        updated.delete(tokenId)
        return updated
      })
    }
  }

  const handleDelete = async (tokenId: number) => {
    if (confirm("Are you sure you want to delete this token? This action cannot be undone.")) {
      try {
        const formData = new FormData()
        formData.append("tokenId", String(tokenId))
        await deleteToken(formData)
      } catch (error) {
        console.error("Failed to delete token:", error)
        alert("Failed to delete token")
      }
    }
  }

  return (
    <div className="space-y-3">
      {tokens.map((token) => (
        <div
          key={token.id}
          className="flex items-center justify-between p-4 bg-[#202126] border border-[#2D2D32] rounded-lg hover:border-[#8C5CF7]/30 transition-all duration-200"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-sm text-[#E0E0E0]">
                {visibleTokens.has(token.id) ? token.token_prefix : maskToken(token.token_prefix)}
              </span>
            </div>
            <div className="text-xs text-[#A0A0A8]">
              Created {formatDate(token.created_at)}
              {token.last_used_at && ` • Last used ${formatDate(token.last_used_at)}`}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View/Hide Token */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleTokenVisibility(token.id)}
              className="text-[#A0A0A8] hover:text-white hover:bg-[#2D2D32]"
              title={visibleTokens.has(token.id) ? "Hide token" : "Show token"}
            >
              {visibleTokens.has(token.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>

            {/* Copy Token */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(token.token_prefix, token.id)}
              className="text-[#A0A0A8] hover:text-white hover:bg-[#2D2D32]"
              title="Copy token"
            >
              {copiedTokens.has(token.id) ? <Check className="w-4 h-4 text-[#00ff88]" /> : <Copy className="w-4 h-4" />}
            </Button>

            {/* Regenerate Token */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRegenerate(token.id)}
              disabled={regeneratingTokens.has(token.id)}
              className="text-[#A0A0A8] hover:text-white hover:bg-[#2D2D32]"
              title="Regenerate token"
            >
              <RotateCcw className={`w-4 h-4 ${regeneratingTokens.has(token.id) ? "animate-spin" : ""}`} />
            </Button>

            {/* Edit Token */}
            <TokenActionDialog
              token={token}
              trigger={
                <Button variant="ghost" size="sm" className="text-[#A0A0A8] hover:text-white hover:bg-[#2D2D32]" title="Edit token">
                  <Edit className="w-4 h-4" />
                </Button>
              }
            />

            {/* Delete Token */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(token.id)}
              className="text-[#A0A0A8] hover:text-[#EF4444] hover:bg-[#2D2D32]"
              title="Delete token"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
