import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../data/profile.ts'

function StatusBadge({ project }: { project: Project }) {
  return project.url ? (
    <span className="project-card-status is-live">Online</span>
  ) : (
    <span className="project-card-status">{project.statusLabel ?? 'Em breve'}</span>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

type ProjectModalProps = {
  projects: Project[]
  index: number
  onNavigate: (index: number) => void
  onClose: () => void
}

export function ProjectModal({ projects, index, onNavigate, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const project = projects[index]
  const total = projects.length
  const prev = () => onNavigate((index - 1 + total) % total)
  const next = () => onNavigate((index + 1) % total)

  // Trava o scroll da página e devolve o foco ao fechar
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onNavigate((index - 1 + total) % total)
      else if (e.key === 'ArrowRight') onNavigate((index + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, total, onClose, onNavigate])

  return createPortal(
    <div
      className="card-modal-overlay project-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        className="project-modal-nav is-prev"
        onClick={prev}
        aria-label="Projeto anterior"
      >
        <ChevronLeft size={22} />
      </button>

      <div className="card-modal project-modal" key={project.name}>
        <div className="card-modal-header">
          <span className="project-card-kind mono">
            {pad(index + 1)} / {pad(total)} · {project.kind}
          </span>
          <button
            ref={closeRef}
            type="button"
            className="card-modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="project-modal-body">
          <div className="project-cover" aria-hidden="true">
            <span className="mono">{project.kind}</span>
            <strong>{project.name}</strong>
            <span className="mono">{project.url ? 'Online' : project.statusLabel ?? 'Em breve'}</span>
          </div>

          <div className="project-modal-info">
            <div className="project-modal-title-row">
              <h3 id="project-modal-title" className="project-modal-title">{project.name}</h3>
              <StatusBadge project={project} />
            </div>
            <p className="project-modal-desc">{project.description}</p>
            <ul className="project-card-stack" aria-label="Tecnologias">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            {project.url ? (
              <a className="btn btn-primary project-modal-cta" href={project.url} target="_blank" rel="noreferrer">
                {project.linkLabel ?? 'Visitar projeto'}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="project-modal-nav is-next"
        onClick={next}
        aria-label="Próximo projeto"
      >
        <ChevronRight size={22} />
      </button>
    </div>,
    document.body,
  )
}

type ProjectCardProps = {
  project: Project
  index?: number
  onOpen?: () => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <article className="project-card">
      <header className="project-card-head">
        <span className="project-card-kind mono">
          {index !== undefined ? `${pad(index + 1)} · ` : ''}
          {project.kind}
        </span>
        <StatusBadge project={project} />
      </header>

      <h3 className="project-card-title">
        {onOpen ? (
          // O botão cobre o card inteiro (::after) e abre o modal
          <button type="button" className="project-card-open" onClick={onOpen} aria-haspopup="dialog">
            {project.name}
          </button>
        ) : (
          project.name
        )}
      </h3>
      <p className="project-card-desc">{project.description}</p>

      <ul className="project-card-stack" aria-label="Tecnologias">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="project-card-footer">
        {onOpen ? (
          <span className="project-card-more" aria-hidden="true">
            Ver detalhes
            <Maximize2 size={13} />
          </span>
        ) : <span />}
        {project.url ? (
          <a
            href={project.url}
            className="project-card-link"
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.linkLabel ?? 'Visitar projeto'}: ${project.name}`}
          >
            {project.linkLabel ?? 'Visitar projeto'}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  )
}
