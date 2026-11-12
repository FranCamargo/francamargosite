import { ArrowDown, ArrowRight, ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LinkedInLogo } from '../components/BrandIcons.tsx'
import { ProjectsSection } from '../components/ProjectsSection.tsx'
import { coreStack, profile, projects } from '../data/profile.ts'

export function HomePage() {
  const year = new Date().getFullYear()

  return (
    <main className="app-shell home-shell">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero-copy">
          <p className="hero-tagline mono">
            <span className="hero-tagline-rule" aria-hidden="true" />
            {profile.role} <span aria-hidden="true">/</span> {profile.specialty}
          </p>
          <h1
            id="home-hero-title"
            className="hero-headline"
            aria-label="Interfaces que unem design e engenharia."
          >
            <span className="hl-row" aria-hidden="true">Interfaces</span>
            <span className="hl-row" aria-hidden="true">
              <span className="hl-small mono">que<br />unem</span>
              <em className="hl-serif">design</em>
            </span>
            <span className="hl-row" aria-hidden="true">
              <span className="hl-amp">&amp;</span>
              <span className="hl-outline">engenharia</span>
              <span className="hl-dot">.</span>
            </span>
          </h1>
          <p className="hero-lead">
            Sou <strong>{profile.name}</strong>, desenvolvedora Front-End especializada em Angular e
            React, com base sólida em UI/UX. Crio componentes reutilizáveis, design systems e
            produtos com IA generativa, sempre com foco em acessibilidade, performance e detalhe.
          </p>
          <div className="home-hero-actions">
            <a className="btn btn-primary" href="#projetos">
              Ver projetos
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <Link className="btn btn-ghost" to="/sobre-mim">
              Sobre mim
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <span className="home-hero-social">
              <a
                className="icon-btn"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInLogo size={16} />
              </a>
              <a
                className="icon-btn"
                href={`mailto:${profile.email}`}
                aria-label="Enviar e-mail"
                title="E-mail"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </span>
          </div>
        </div>

        <aside className="hero-poster" aria-label="Resumo do perfil">
          <div className="hero-poster-top mono">
            <span>Portfólio — {year}</span>
            <span>Nº 01</span>
          </div>

          <p className="hero-poster-name">
            <em>Fran</em>
            <span>Camargo</span>
          </p>

          <dl className="hero-poster-stats">
            <div>
              <dt className="mono">Projetos</dt>
              <dd>{String(projects.length).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt className="mono">Idiomas</dt>
              <dd>03</dd>
            </div>
            <div>
              <dt className="mono">Certificação</dt>
              <dd className="hero-poster-cert">AI-900</dd>
            </div>
          </dl>

          <div className="hero-poster-marquee mono" aria-hidden="true">
            <div className="hero-poster-track">
              {[0, 1].map((copy) => (
                <span key={copy}>
                  {coreStack.map((tech) => (
                    <span key={tech}>{tech} <i>✦</i> </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          <a
            className="hero-stamp"
            href={`mailto:${profile.email}`}
            aria-label="Aberta a conversas: enviar e-mail"
          >
            <svg className="hero-stamp-ring" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="hero-stamp-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#hero-stamp-circle">
                  Aberta a conversas ✦ Front-End ✦ UI/UX ✦
                </textPath>
              </text>
            </svg>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
        </aside>
      </section>

      {/* ── Projects ─────────────────────────────────────── */}
      <ProjectsSection projects={projects} />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-band" aria-labelledby="cta-title">
        <div>
          <h2 id="cta-title">Vamos construir algo juntos?</h2>
          <p>Aberta a conversas sobre oportunidades, projetos e colaborações em front-end e UI/UX.</p>
        </div>
        <div className="cta-band-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            <Mail size={16} aria-hidden="true" />
            Enviar e-mail
          </a>
          <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedInLogo size={15} />
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  )
}
