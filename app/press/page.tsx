import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Press & Media - Outsoor',
  description: 'Press resources, brand assets, and contact information for Outsoor.',
}

const facts = [
  {
    label: 'Product',
    value: 'AI infrastructure & APIs for language, vision and retrieval',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <rect x="2" y="2" width="5" height="5" rx="1" stroke="#8C5CF7" strokeWidth="1.5" />
        <rect x="9" y="2" width="5" height="5" rx="1" stroke="#8C5CF7" strokeWidth="1.5" />
        <rect x="2" y="9" width="5" height="5" rx="1" stroke="#8C5CF7" strokeWidth="1.5" />
        <rect x="9" y="9" width="5" height="5" rx="1" stroke="#8C5CF7" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'Customers',
    value: 'SaaS companies, marketplaces and internal tools teams',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" stroke="#8C5CF7" strokeWidth="1.5" />
        <path d="M5.5 8.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5" stroke="#8C5CF7" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Focus',
    value: 'Low latency, reliability and clear, predictable pricing',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path d="M2 10l4-4 3 3 5-5" stroke="#8C5CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const contacts = [
  {
    title: 'Press contact',
    description:
      'For press inquiries, interviews or quotes, reach out directly. We aim to respond within one business day.',
    email: 'press@outsoor.com',
    iconColor: '#8C5CF7',
    glowColor: 'rgba(140,92,247,0.1)',
    iconBg: 'rgba(140,92,247,0.12)',
    iconBorder: 'rgba(140,92,247,0.25)',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <rect x="2" y="5" width="16" height="11" rx="2" stroke="#8C5CF7" strokeWidth="1.5" />
        <path d="M2 6.5l8 6 8-6" stroke="#8C5CF7" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Brand assets',
    description:
      'We provide logo files and brand guidelines on request. Include your organization name and intended use when reaching out.',
    email: 'brand@outsoor.com',
    iconColor: '#C85CFA',
    glowColor: 'rgba(200,92,250,0.1)',
    iconBg: 'rgba(200,92,250,0.12)',
    iconBorder: 'rgba(200,92,250,0.25)',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#C85CFA" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#C85CFA" strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#C85CFA" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="#C85CFA" strokeWidth="1.5" />
      </svg>
    ),
  },
]

const s = {
  gradientText: {
    background: 'linear-gradient(90deg, #8C5CF7, #C85CFA, #5567F7)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
  },
  sectionLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#6B6B75',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    marginBottom: '1.75rem',
  },
  titleBar: {
    display: 'inline-block',
    width: '18px',
    height: '2px',
    background: 'linear-gradient(135deg, #8C5CF7, #5567F7)',
    borderRadius: '2px',
    flexShrink: 0,
  },
}

export default function PressPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D0D0F',
        color: '#FFFFFF',
        fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(140,92,247,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 90%, rgba(200,92,250,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: 'relative',
          zIndex: 10,
          borderBottom: '1px solid #2D2D32',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(13,13,15,0.8)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: '#A0A0A8',
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Outsoor
          </Link>
          <span style={{ fontSize: '0.75rem', color: '#6B6B75', letterSpacing: '0.04em' }}>
            Company · Press
          </span>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem 3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              border: '1px solid #3D3D42',
              background: 'rgba(140,92,247,0.08)',
              fontSize: '0.72rem',
              color: '#A0A0A8',
              letterSpacing: '0.07em',
              textTransform: 'uppercase' as const,
              marginBottom: '2rem',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#8C5CF7',
                boxShadow: '0 0 8px #8C5CF7',
                display: 'inline-block',
              }}
            />
            Press & Media
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}
          >
            Resources for{' '}
            <span style={s.gradientText}>journalists</span>
            {' '}&amp; partners
          </h1>

          <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: '#A0A0A8', maxWidth: '540px' }}>
            Everything you need to write about Outsoor — fast facts, contact details,
            brand assets and a short boilerplate for attribution.
          </p>
        </section>

        {/* Fast facts */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
          <div style={s.sectionLabel}>
            <span style={s.titleBar} />
            Fast facts
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1px',
              background: '#2D2D32',
              border: '1px solid #2D2D32',
              borderRadius: '1rem',
              overflow: 'hidden',
            }}
          >
            {facts.map((fact) => (
              <div
                key={fact.label}
                style={{
                  background: '#121214',
                  padding: '1.75rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '0.5rem',
                    background: 'rgba(140,92,247,0.1)',
                    border: '1px solid rgba(140,92,247,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.25rem',
                  }}
                >
                  {fact.icon}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase' as const,
                    color: '#8C5CF7',
                  }}
                >
                  {fact.label}
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#A0A0A8', lineHeight: 1.5 }}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
          <div style={s.sectionLabel}>
            <span style={s.titleBar} />
            Get in touch
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {contacts.map((c) => (
              <div
                key={c.title}
                style={{
                  border: '1px solid #2D2D32',
                  borderRadius: '1rem',
                  background: '#121214',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Corner glow */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '160px',
                    height: '160px',
                    background: `radial-gradient(circle at top right, ${c.glowColor}, transparent 65%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '0.5rem',
                    background: c.iconBg,
                    border: `1px solid ${c.iconBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {c.icon}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {c.title}
                  </div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: '#A0A0A8' }}>
                    {c.description}
                  </p>
                </div>

                <Link
                  href={`mailto:${c.email}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #3D3D42',
                    background: '#1A1B1F',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#A0A0A8',
                    textDecoration: 'none',
                    alignSelf: 'flex-start',
                    marginTop: 'auto',
                    position: 'relative',
                  }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1.5 3.5l5.5 4.5 5.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  {c.email}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Boilerplate */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
          <div style={s.sectionLabel}>
            <span style={s.titleBar} />
            Suggested boilerplate
          </div>
          <div
            style={{
              border: '1px solid #2D2D32',
              borderRadius: '1rem',
              background: '#121214',
              padding: '2rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '300px',
                height: '200px',
                background: 'radial-gradient(ellipse at top right, rgba(140,92,247,0.09), transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase' as const,
                color: '#8C5CF7',
                marginBottom: '0.75rem',
              }}
            >
              For attribution &amp; publication
            </div>
            <div style={{ position: 'relative' }}>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  left: '-1.5rem',
                  fontSize: '3rem',
                  lineHeight: 1,
                  color: 'rgba(140,92,247,0.2)',
                  fontFamily: 'Georgia, serif',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.75,
                  color: '#A0A0A8',
                  maxWidth: '680px',
                  position: 'relative',
                }}
              >
                Outsoor is an AI infrastructure platform that gives product teams low-latency,
                production-ready APIs for language, vision and retrieval. Designed for reliability
                and simplicity, Outsoor handles scaling, observability and billing so engineering
                teams can focus on shipping features.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}