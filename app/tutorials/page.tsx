"use client"

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { useTheme } from "@/contexts/themeContext"
import { Footer } from "@/components/footer"
import { PageTopBar } from "@/components/page-top-bar"
import {
  Play, BookOpen, Shield, Zap, Database, Clock,
  Users, Star, ArrowRight, ChevronRight, Check, Lock,
  Code, Flame, Target, TrendingUp,
  GraduationCap, Trophy
} from "lucide-react"

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="relative h-1 w-full overflow-hidden" style={{ background: "var(--color-border)" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.0, ease: [0.25, 0.25, 0, 1], delay: 0.2 }}
        className="absolute inset-y-0 left-0"
        style={{ background: color }}
      />
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tracks = [
  {
    id: "foundations",
    num: "01",
    label: "Foundations",
    icon: BookOpen,
    accent: "#6366f1",
    tagline: "Zero to first API call",
    duration: "2h 15m",
    lessons: 8,
    enrolled: 12470,
    rating: 4.9,
    difficulty: "Beginner",
    modules: [
      { title: "What is Outsoor?", duration: "8 min", done: true },
      { title: "Your first API call", duration: "12 min", done: true },
      { title: "Authentication basics", duration: "15 min", done: false },
      { title: "Understanding responses", duration: "10 min", done: false },
    ],
    progress: 25,
  },
  {
    id: "integration",
    num: "02",
    label: "Integration",
    icon: Code,
    accent: "#10b981",
    tagline: "Real apps, real patterns",
    duration: "3h 40m",
    lessons: 12,
    enrolled: 8923,
    rating: 4.8,
    difficulty: "Intermediate",
    modules: [
      { title: "Chat completions deep-dive", duration: "18 min", done: false },
      { title: "Streaming responses", duration: "14 min", done: false },
      { title: "Error handling patterns", duration: "12 min", done: false },
      { title: "Rate limit strategies", duration: "16 min", done: false },
    ],
    progress: 0,
  },
  {
    id: "auth",
    num: "03",
    label: "Authentication",
    icon: Shield,
    accent: "#f59e0b",
    tagline: "Secure by design",
    duration: "1h 50m",
    lessons: 6,
    enrolled: 6541,
    rating: 4.9,
    difficulty: "Intermediate",
    modules: [
      { title: "API key management", duration: "15 min", done: false },
      { title: "OAuth 2.0 flow", duration: "22 min", done: false },
      { title: "Token rotation", duration: "12 min", done: false },
      { title: "Audit logging", duration: "10 min", done: false },
    ],
    progress: 0,
  },
  {
    id: "webhooks",
    num: "04",
    label: "Webhooks",
    icon: Zap,
    accent: "#ec4899",
    tagline: "Real-time everything",
    duration: "1h 20m",
    lessons: 5,
    enrolled: 4210,
    rating: 4.7,
    difficulty: "Intermediate",
    modules: [
      { title: "Webhook fundamentals", duration: "10 min", done: false },
      { title: "Signature verification", duration: "12 min", done: false },
      { title: "Retry & idempotency", duration: "15 min", done: false },
      { title: "Testing with ngrok", duration: "8 min", done: false },
    ],
    progress: 0,
  },
  {
    id: "sdks",
    num: "05",
    label: "SDKs",
    icon: Database,
    accent: "#8b5cf6",
    tagline: "Native in every language",
    duration: "4h 05m",
    lessons: 10,
    enrolled: 9876,
    rating: 4.8,
    difficulty: "All levels",
    modules: [
      { title: "Python SDK mastery", duration: "35 min", done: false },
      { title: "Node.js patterns", duration: "28 min", done: false },
      { title: "Go concurrency", duration: "22 min", done: false },
      { title: "Type safety in TS", duration: "18 min", done: false },
    ],
    progress: 0,
  },
  {
    id: "advanced",
    num: "06",
    label: "Advanced",
    icon: Flame,
    accent: "#ef4444",
    tagline: "Production at scale",
    duration: "5h 30m",
    lessons: 14,
    enrolled: 3120,
    rating: 4.9,
    difficulty: "Advanced",
    modules: [
      { title: "Caching strategies", duration: "20 min", done: false },
      { title: "Load balancing", duration: "25 min", done: false },
      { title: "Cost optimization", duration: "18 min", done: false },
      { title: "Observability", duration: "22 min", done: false },
    ],
    progress: 0,
  },
]

const quickstarts = [
  { label: "5-min setup",    icon: Play,       time: "5 min",  color: "#10b981", desc: "First API call from scratch" },
  { label: "API keys",       icon: Lock,       time: "10 min", color: "#6366f1", desc: "Create & manage keys safely" },
  { label: "Error handling", icon: Target,     time: "12 min", color: "#f59e0b", desc: "Graceful failure patterns" },
  { label: "Rate limits",    icon: TrendingUp, time: "8 min",  color: "#ec4899", desc: "Work within constraints" },
]

const stats = [
  { n: "55K+", l: "Learners enrolled", icon: Users },
  { n: "47",   l: "Total lessons",     icon: BookOpen },
  { n: "4.85", l: "Average rating",    icon: Star },
  { n: "18h",  l: "Total content",     icon: Clock },
]

// ─── Track Card ───────────────────────────────────────────────────────────────

function TrackCard({
  track, index, isActive, onClick,
}: { track: typeof tracks[0]; index: number; isActive: boolean; onClick: () => void }) {
  const { isDark } = useTheme()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.25, 0.25, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer"
      style={{
        background: isDark ? "var(--color-surface-1)" : "#fff",
        border: `1px solid ${isActive ? track.accent : hovered ? "var(--color-border-hover)" : "var(--color-border)"}`,
        transition: "border-color 0.15s",
      }}
    >
      {/* Left accent stripe when active */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
        background: isActive ? track.accent : "transparent",
        transition: "background 0.2s",
      }} />

      <div className="p-6 flex flex-col gap-4" style={{ paddingLeft: isActive ? 22 : 24, transition: "padding 0.2s" }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
              style={{ background: `${track.accent}18`, border: `1px solid ${track.accent}30` }}>
              <track.icon className="w-4 h-4" style={{ color: track.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)", opacity: 0.45 }}>{track.num}</span>
                <span className="font-bold text-sm" style={{ color: "var(--color-text)", letterSpacing: "-0.02em" }}>{track.label}</span>
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)", opacity: 0.55 }}>{track.tagline}</div>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 flex-shrink-0"
            style={{ border: `1px solid ${track.accent}35`, color: track.accent, background: `${track.accent}0e` }}>
            {track.difficulty}
          </span>
        </div>

        {/* Progress */}
        <ProgressBar value={track.progress} max={100} color={track.accent} />

        {/* Meta + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono" style={{ color: "var(--color-text-muted)", opacity: 0.55 }}>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{track.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{track.lessons}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3" style={{ color: "#f59e0b" }} />{track.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold transition-colors"
            style={{ color: isActive || hovered ? track.accent : "var(--color-text-muted)" }}>
            {track.progress > 0 ? "Continue" : "Start"}
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Track Detail Panel ───────────────────────────────────────────────────────

function TrackPanel({ track }: { track: typeof tracks[0] }) {
  const { isDark } = useTheme()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={track.id}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="flex flex-col h-full"
        style={{ background: isDark ? "var(--color-surface-1)" : "#fff" }}
      >
        {/* Panel header */}
        <div className="px-8 py-6" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 flex items-center justify-center"
              style={{ background: `${track.accent}18`, border: `1px solid ${track.accent}30` }}>
              <track.icon className="w-4 h-4" style={{ color: track.accent }} />
            </div>
            <div>
              <div className="font-bold text-base" style={{ color: "var(--color-text)", letterSpacing: "-0.02em" }}>
                {track.label}
              </div>
              <div className="text-xs font-mono mt-0.5" style={{ color: track.accent, opacity: 0.85 }}>{track.tagline}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
            <span>{track.duration} total</span>
            <span>·</span>
            <span>{track.lessons} lessons</span>
            <span>·</span>
            <span>{track.enrolled.toLocaleString()} enrolled</span>
          </div>
        </div>

        {/* Modules */}
        <div className="flex-1">
          {track.modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 px-8 py-4 group cursor-pointer transition-colors"
              style={{
                borderBottom: i < track.modules.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold"
                style={{
                  background: mod.done ? `${track.accent}18` : "transparent",
                  border: `1px solid ${mod.done ? track.accent : "var(--color-border)"}`,
                  color: mod.done ? track.accent : "var(--color-text-muted)",
                }}>
                {mod.done ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <div className="flex-1 text-sm" style={{
                color: mod.done ? "var(--color-text-muted)" : "var(--color-text)",
                opacity: mod.done ? 0.5 : 1,
                textDecoration: mod.done ? "line-through" : "none",
              }}>
                {mod.title}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)", opacity: 0.4 }}>{mod.duration}</span>
                <div className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ border: `1px solid ${track.accent}40`, background: `${track.accent}0e` }}>
                  <Play className="w-2.5 h-2.5" style={{ color: track.accent }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-8 py-5" style={{ borderTop: "1px solid var(--color-border)" }}>
          <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: track.accent, color: "#fff" }}>
            <Play className="w-3.5 h-3.5" />
            {track.progress > 0 ? `Continue — ${track.progress}% complete` : "Start Track"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TutorialsPage() {
  const { isDark } = useTheme()
  const [activeTrack, setActiveTrack] = useState<string | null>(null)

  const selected = tracks.find(t => t.id === activeTrack) ?? null
  const border = "var(--color-border)"
  const surface = isDark ? "var(--color-surface-1)" : "#fafaf9"

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg)" }}>
      <PageTopBar breadcrumb="Docs · Tutorials" />

      {/* ── HERO ── */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div className="max-w-6xl mx-auto px-10 py-24 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
              <span className="text-xs font-semibold uppercase tracking-widest font-mono" style={{ color: "var(--color-primary)" }}>
                Learning Tracks
              </span>
            </div>

            <h1 className="font-black leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.04em", color: "var(--color-text)" }}>
              Learn the Outsoor API.<br />
              <span style={{ color: "var(--color-primary)" }}>Ship faster.</span>
            </h1>

            <p className="text-base" style={{ color: "var(--color-text-muted)", lineHeight: 1.8, maxWidth: 520 }}>
              Six structured tracks covering everything from your first API call to production-grade integrations. Self-paced, hands-on, and free.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ background: "var(--color-primary)", color: "#fff" }}
                onClick={() => setActiveTrack("foundations")}>
                <Play className="w-4 h-4" /> Start Learning
              </button>
              <button className="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors"
                style={{ border: `1px solid ${border}`, color: "var(--color-text-muted)" }}>
                <BookOpen className="w-4 h-4" /> Browse all tracks
              </button>
            </div>

            <div className="flex items-center gap-6 text-xs" style={{ color: "var(--color-text-muted)", opacity: 0.55 }}>
              <span className="flex items-center gap-1.5"><Check className="w-3 h-3" style={{ color: "#10b981" }} /> Free forever</span>
              <span className="flex items-center gap-1.5"><Check className="w-3 h-3" style={{ color: "#10b981" }} /> No account required</span>
              <span className="flex items-center gap-1.5"><Check className="w-3 h-3" style={{ color: "#10b981" }} /> Certificate on completion</span>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px mt-4"
            style={{ background: border, border: `1px solid ${border}` }}
          >
            {stats.map((s) => (
              <div key={s.l} className="flex flex-col gap-1 px-8 py-5" style={{ background: "var(--color-bg)" }}>
                <span className="font-black font-mono text-2xl" style={{ color: "var(--color-text)", letterSpacing: "-0.04em" }}>{s.n}</span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── QUICK STARTS ── */}
      <section style={{ borderBottom: `1px solid ${border}` }}>
        <div className="max-w-6xl mx-auto px-10 py-14 flex flex-col gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest font-mono" style={{ color: "var(--color-primary)" }}>Quick Start</span>
            <h2 className="mt-1.5 text-2xl font-black" style={{ color: "var(--color-text)", letterSpacing: "-0.03em" }}>Up and running in minutes.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: border, border: `1px solid ${border}` }}>
            {quickstarts.map((q, i) => (
              <motion.div
                key={q.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex flex-col gap-4 p-6 group cursor-pointer"
                style={{ background: "var(--color-bg)" }}
              >
                <div className="w-9 h-9 flex items-center justify-center"
                  style={{ background: `${q.color}14`, border: `1px solid ${q.color}28` }}>
                  <q.icon className="w-4 h-4" style={{ color: q.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{q.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)", opacity: 0.55 }}>{q.desc}</div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-mono px-2 py-0.5"
                    style={{ border: `1px solid ${q.color}28`, color: q.color, background: `${q.color}08` }}>
                    {q.time}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: q.color }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACKS ── */}
      <section className="max-w-6xl mx-auto w-full px-10 py-14 flex flex-col gap-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest font-mono" style={{ color: "var(--color-primary)" }}>Learning Tracks</span>
            <h2 className="mt-1.5 text-2xl font-black" style={{ color: "var(--color-text)", letterSpacing: "-0.03em" }}>Six tracks. One complete education.</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "var(--color-text-muted)", opacity: 0.4 }}>
            <Trophy className="w-3.5 h-3.5" /> Complete all tracks to earn certification
          </div>
        </div>

        {/* Split layout: track list left, detail right */}
        <div className="flex gap-px" style={{ background: border, border: `1px solid ${border}` }}>
          {/* Left: track list */}
          <div className="flex flex-col gap-px flex-1" style={{ background: border, minWidth: 0 }}>
            {tracks.map((track, i) => (
              <div key={track.id} style={{ background: "var(--color-bg)" }}>
                <TrackCard
                  track={track}
                  index={i}
                  isActive={activeTrack === track.id}
                  onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
                />
              </div>
            ))}
          </div>

          {/* Right: detail panel — desktop */}
          <div className="hidden lg:block flex-shrink-0" style={{ width: 360, background: "var(--color-bg)" }}>
            <AnimatePresence>
              {selected ? (
                <TrackPanel track={selected} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center gap-3 p-10 text-center"
                  style={{ minHeight: 420 }}
                >
                  <GraduationCap className="w-10 h-10" style={{ color: "var(--color-text-muted)", opacity: 0.2 }} />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "var(--color-text)", opacity: 0.4 }}>Select a track</div>
                    <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)", opacity: 0.3 }}>
                      Click any track to preview its modules
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: panel below */}
        <div className="lg:hidden">
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden", border: `1px solid ${border}` }}
              >
                <TrackPanel track={selected} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CERTIFICATION ── */}
      <section style={{ borderTop: `1px solid ${border}` }}>
        <div className="max-w-6xl mx-auto px-10 py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
            style={{ border: `1px solid ${border}`, padding: "3rem" }}>
            <div className="flex flex-col gap-4 max-w-lg">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" style={{ color: "#f59e0b" }} />
                <span className="text-xs font-semibold uppercase tracking-widest font-mono" style={{ color: "#f59e0b" }}>Certification</span>
              </div>
              <h2 className="text-2xl font-black" style={{ color: "var(--color-text)", letterSpacing: "-0.03em" }}>
                Prove your expertise.
              </h2>
              <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: 1.8 }}>
                Complete all six tracks and pass the final assessment to earn your Outsoor API Certified Developer credential — shareable on LinkedIn and verifiable by employers.
              </p>
              <div className="flex items-center gap-6 text-xs font-mono" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 2,341 certified</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3" style={{ color: "#f59e0b" }} /> Employer verified</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <button className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ background: "#f59e0b", color: "#000" }}>
                <ArrowRight className="w-4 h-4" /> View Requirements
              </button>
              <button className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ border: `1px solid ${border}`, color: "var(--color-text-muted)" }}>
                <Trophy className="w-4 h-4" /> See sample certificate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Status bar */}
      <div className="flex items-center justify-between px-6 text-xs font-mono flex-shrink-0"
        style={{ height: "24px", background: "var(--color-primary)", color: "#fff" }}>
        <div className="flex items-center gap-5">
          <span>Outsoor Tutorials</span>
          <span style={{ opacity: 0.7 }}>6 tracks · 47 lessons · 18h content</span>
        </div>
        <div className="flex items-center gap-4" style={{ opacity: 0.8 }}>
          <span>All levels</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
            <span>Updated Feb 2025</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}