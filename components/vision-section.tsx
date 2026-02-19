"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/contexts/themeContext"

const logos = [
  "/logos/logo01.svg",
  "/logos/logo02.svg",
  "/logos/logo03.svg",
  "/logos/logo04.svg",
  "/logos/logo05.svg",
  "/logos/logo06.svg",
  "/logos/logo07.svg",
  "/logos/logo08.svg",
]

const track = [...logos, ...logos, ...logos]

export function VisionSection() {
  const { isDark } = useTheme()

  return (
    <>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
      `}</style>

      <section
        className="relative overflow-hidden"
        style={{
          background: isDark ? "var(--color-surface-1)" : "var(--color-surface-2)",
          marginTop: "-80px",
          paddingTop: "140px",
          paddingBottom: "100px",
          borderRadius: "3.5rem 3.5rem 0 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <h2
              className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              Making AI{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Accessible
              </span>{" "}
              to Everyone, Everywhere
            </h2>

            <p className="text-lg leading-relaxed max-w-md" style={{ color: "var(--color-text-muted)" }}>
              We believe artificial intelligence should be a force multiplier for every developer, startup, and enterprise. Outsoor breaks down barriers with unified APIs, transparent pricing, and infrastructure that scales from your first API call to billions.
            </p>

            <div
              className="w-16 h-0.5 rounded-full"
              style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-success))" }}
            />
          </motion.div>

          {/* Right — scrolling logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="marquee-track">
              {track.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  style={{
                    flexShrink: 0,
                    height: "3rem",
                    width: "auto",
                    objectFit: "contain",
                    marginRight: "1.75rem",
                    filter: isDark
                      ? "brightness(0) invert(1) opacity(0.55)"
                      : "brightness(0) opacity(0.4)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}