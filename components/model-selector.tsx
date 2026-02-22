"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/contexts/themeContext"
import { ChevronDown, Sparkles, Bot, Mic, Video, Brain, Radio, Check } from "lucide-react"

interface ModelSelectorProps {
  models: Array<{ id: string; name: string }>
  selectedModel: string
  onModelChange: (model: string) => void
  disabled?: boolean
}

// Map model id → category for icon + color
const MODEL_META: Record<string, { category: string; provider: string }> = {
  "deepseek/deepseek-v3-0324": { category:"llm",           provider:"DeepSeek"  },
  "gpt-4-turbo":               { category:"conversational", provider:"OpenAI"    },
  "gpt-4o":                    { category:"conversational", provider:"OpenAI"    },
  "gpt-3.5-turbo":             { category:"conversational", provider:"OpenAI"    },
  "claude-3-opus":             { category:"conversational", provider:"Anthropic" },
  "claude-3-sonnet":           { category:"conversational", provider:"Anthropic" },
  "gemini-pro":                { category:"conversational", provider:"Google"    },
  "whisper-v3":                { category:"voice",          provider:"OpenAI"    },
  "elevenlabs-pro":            { category:"voice",          provider:"ElevenLabs"},
  "runway-gen-3":              { category:"video",          provider:"Runway"    },
  "llama-3-70b":               { category:"llm",            provider:"Meta"      },
  "mistral-large":             { category:"llm",            provider:"Mistral"   },
}

const CAT_COLOR: Record<string, string> = {
  conversational:"#6366f1", voice:"#10b981",
  video:"#f59e0b", llm:"#06b6d4", livestreaming:"#ec4899"
}

function ModelIcon({ modelId, size=14 }: { modelId: string; size?: number }) {
  const meta = MODEL_META[modelId]
  const cat  = meta?.category ?? "conversational"
  const color = CAT_COLOR[cat] ?? "var(--color-primary)"
  if (cat === "voice")         return <Mic    size={size} style={{ color }} />
  if (cat === "video")         return <Video  size={size} style={{ color }} />
  if (cat === "llm")           return <Brain  size={size} style={{ color }} />
  if (cat === "livestreaming") return <Radio  size={size} style={{ color }} />
  return <Bot size={size} style={{ color }} />
}

function cleanName(name: string) {
  // Strip provider prefix e.g. "deepseek/deepseek-v3-0324" → "DeepSeek V3"
  if (name.includes("/")) {
    const slug = name.split("/").pop() ?? name
    return slug.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase())
  }
  return name
}

export function ModelSelector({ models, selectedModel, onModelChange, disabled }: ModelSelectorProps) {
  const { isDark } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => { if(ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [])

  const bg      = isDark ? "#111114" : "#ffffff"
  const border  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"
  const text     = isDark ? "#f4f4f5" : "#09090b"
  const muted    = isDark ? "#52525b" : "#a1a1aa"
  const dropBg   = isDark ? "#0f0f12" : "#ffffff"
  const hoverBg  = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"

  const selectedMeta = MODEL_META[selectedModel]
  const selectedColor = CAT_COLOR[selectedMeta?.category ?? ""] ?? "var(--color-primary)"

  return (
    <div ref={ref} style={{ position:"relative", userSelect:"none" }}>
      {/* Trigger */}
      <button
        onClick={() => !disabled && setOpen(o => !o)}
        disabled={disabled}
        style={{
          display:"flex", alignItems:"center", gap:10,
          padding:"0 12px", height:36, minWidth:220,
          background: open ? `color-mix(in srgb, var(--color-primary) 8%, ${bg})` : bg,
          border:`1px solid ${open ? "var(--color-primary)" : border}`,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          transition:"all 0.15s",
        }}
      >
        {/* Icon */}
        <div style={{ width:22, height:22, borderRadius:6, flexShrink:0,
          background: `${selectedColor}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <ModelIcon modelId={selectedModel} size={12} />
        </div>

        {/* Label */}
        <span style={{ flex:1, fontSize:12, fontWeight:600, color:text, textAlign:"left",
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {cleanName(models.find(m=>m.id===selectedModel)?.name ?? selectedModel)}
        </span>

        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.18 }}>
          <ChevronDown size={12} style={{ color:muted, flexShrink:0 }} />
        </motion.div>
      </button>

    
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, y:-6, scale:0.97 }}
            animate={{ opacity:1, y:0,  scale:1 }}
            exit={{ opacity:0, y:-4,  scale:0.98 }}
            transition={{ duration:0.14, ease:[0.25,0.25,0,1] }}
            style={{
              position:"absolute", top:"calc(100% + 6px)", left:0,
              minWidth:260, zIndex:9999,
              background: dropBg,
              border:`1px solid ${border}`,
              boxShadow: isDark
                ? "0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)"
                : "0 16px 48px rgba(0,0,0,0.15)",
              overflow:"hidden",
            }}
          >
            {/* Header */}
            <div style={{ padding:"10px 14px 8px", borderBottom:`1px solid ${border}`, display:"flex", alignItems:"center", gap:6 }}>
              <Sparkles size={12} style={{ color:"var(--color-primary)" }} />
              <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:muted }}>
                Select Model
              </span>
            </div>

            {/* Options */}
            <div style={{ maxHeight:260, overflowY:"auto" }}>
              {models.map(model => {
                const isSelected = model.id === selectedModel
                const meta   = MODEL_META[model.id]
                const color  = CAT_COLOR[meta?.category ?? ""] ?? "var(--color-primary)"
                return (
                  <button key={model.id}
                    onClick={() => { onModelChange(model.id); setOpen(false) }}
                    style={{
                      width:"100%", display:"flex", alignItems:"center", gap:10,
                      padding:"10px 14px", border:"none", cursor:"pointer",
                      background: isSelected ? `color-mix(in srgb, ${color} 10%, transparent)` : "transparent",
                      borderLeft:`2px solid ${isSelected ? color : "transparent"}`,
                      transition:"all 0.12s", textAlign:"left",
                    }}
                    onMouseEnter={e => { if(!isSelected) e.currentTarget.style.background = hoverBg }}
                    onMouseLeave={e => { if(!isSelected) e.currentTarget.style.background = "transparent" }}
                  >
                    {/* Icon box */}
                    <div style={{ width:26, height:26, borderRadius:7, flexShrink:0,
                      background: isSelected ? color : `${color}18`,
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <ModelIcon modelId={model.id} size={13} />
                    </div>

                    {/* Text */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:isSelected?color:text,
                        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {cleanName(model.name)}
                      </div>
                      {meta?.provider && (
                        <div style={{ fontSize:10, color:muted, marginTop:1 }}>{meta.provider}</div>
                      )}
                    </div>

                    {/* Check */}
                    {isSelected && <Check size={13} style={{ color, flexShrink:0 }} />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}