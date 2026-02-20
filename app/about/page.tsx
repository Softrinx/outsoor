"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { PageTopBar } from "@/components/page-top-bar"

const stats = [
  { value: "<200ms", label: "Median latency from edge" },
  { value: "99.99%", label: "Uptime SLO" },
  { value: "3",      label: "API modalities" },
  { value: "1",      label: "Unified API surface" },
]

const principles = [
  {
    label: "Developer-first",
    description: "Clear docs, simple APIs and honest errors. No magic, no mystery.",
  },
  {
    label: "Reliability by default",
    description: "We treat every request as production-critical, because it is.",
  },
  {
    label: "Transparency",
    description: "No surprise rate limits, hidden quotas, or ambiguous pricing.",
  },
  {
    label: "Security",
    description: "Data protection and compliance are built in from day one, not bolted on after.",
  },
]

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <PageTopBar breadcrumb="Company · About" />

      <div ref={ref} className="max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div
          className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-end"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
              About
            </span>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--color-text)",
              }}
            >
              Built for teams that{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ship fast
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Outsoor is an AI infrastructure platform that gives product teams
              low-latency, production-ready APIs for language, vision and retrieval.
              We handle scaling, reliability and billing so you can focus on shipping features.
            </p>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex flex-col gap-1 px-8 py-10"
              style={{ borderRight: i < stats.length - 1 ? "1px solid var(--color-border)" : "none" }}
            >
              <span
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* What we do + How teams use Outsoor */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-10 lg:p-14 flex flex-col gap-6"
            style={{ borderRight: "1px solid var(--color-border)" }}
          >
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--color-text-muted)" }}>
              What we do
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Modern products rely on AI for search, support, automation and
              personalization — but wiring all of this together reliably is hard.
              Outsoor provides a single, consistent API surface on top of
              best-in-class models.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "<200ms median latency from edge locations",
                "99.99% uptime backed by strict SLOs",
                "Usage-based pricing with clear, predictable invoices",
                "Enterprise features like audit logs and SSO",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0"
                    style={{ border: "1px solid var(--color-primary)", color: "var(--color-primary)" }}
                  >
                    <svg width="8" height="8" fill="none" viewBox="0 0 8 8">
                      <path d="M1.5 4l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-10 lg:p-14 flex flex-col gap-6"
          >
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--color-text-muted)" }}>
              How teams use Outsoor
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Customers use Outsoor to power AI assistants inside their apps,
              automate internal workflows, summarize large volumes of data and
              build custom retrieval pipelines. Our APIs are designed to drop
              into existing stacks without forcing a full rewrite.
            </p>
          </motion.div>
        </div>

        {/* Principles */}
        <div style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="p-10 lg:p-14 flex flex-col gap-8">
            <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--color-text-muted)" }}>
              Our principles
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex flex-col gap-2 p-6"
                  style={{ borderRight: i < principles.length - 1 ? "1px solid var(--color-border)" : "none" }}
                >
                  <span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>
                    {p.label}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {p.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between gap-6 flex-wrap py-12"
        >
          <div className="flex flex-col gap-1">
            <span className="font-bold" style={{ color: "var(--color-text)" }}>
              Ready to start building?
            </span>
            <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Get API access and have your first request running in minutes.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
            >
              Read the docs
            </Link>
            <Link
              href="/signup"
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ background: "var(--color-primary)", color: "#fff" }}
            >
              Get started free
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
      <Footer />
    </div>
  )
}