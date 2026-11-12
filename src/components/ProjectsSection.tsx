import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Project } from '../data/profile.ts'
import { ProjectCard, ProjectModal } from './ProjectCard.tsx'
import { SelectMenu } from './SelectMenu.tsx'

type Category = 'Todos' | Project['kind']
type SortOrder = 'padrao' | 'destaques' | 'a-z' | 'z-a' | 'online'

const categories: Category[] = ['Todos', 'Web', 'Mobile']

const sortLabels: Record<SortOrder, string> = {
  padrao: 'Ordem padrão',
  destaques: 'Destaques primeiro',
  online: 'Online primeiro',
  'a-z': 'A → Z',
  'z-a': 'Z → A',
}

const pad = (n: number) => String(n).padStart(2, '0')

function sortProjects(list: Project[], order: SortOrder) {
  const copy = [...list]
  switch (order) {
    case 'destaques':
      return copy.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    case 'online':
      return copy.sort((a, b) => Number(!!b.url) - Number(!!a.url))
    case 'a-z':
      return copy.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    case 'z-a':
      return copy.sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'))
    default:
      return copy
  }
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<Category>('Todos')
  const [order, setOrder] = useState<SortOrder>('padrao')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(1)
  const trackRef = useRef<HTMLUListElement>(null)

  const visible = useMemo(
    () => sortProjects(
      category === 'Todos' ? projects : projects.filter((p) => p.kind === category),
      order,
    ),
    [projects, category, order],
  )

  const countFor = (cat: Category) =>
    cat === 'Todos' ? projects.length : projects.filter((p) => p.kind === cat).length

  const closeModal = useCallback(() => setOpenIndex(null), [])

  const slideWidth = () => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return 0
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    return first.offsetWidth + gap
  }

  // Atualiza o slide atual e quantos cabem na tela conforme a rolagem
  const syncPosition = useCallback(() => {
    const track = trackRef.current
    const step = slideWidth()
    if (!track || !step) return
    setCurrent(Math.round(track.scrollLeft / step))
    const style = getComputedStyle(track)
    const inner = track.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
    setPerView(Math.max(1, Math.round(inner / step)))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: 0 })
    syncPosition()
    const observer = new ResizeObserver(syncPosition)
    observer.observe(track)
    return () => observer.disconnect()
  }, [visible, syncPosition])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const lastStart = Math.max(0, visible.length - perView)
    const target = Math.min(Math.max(index, 0), lastStart)
    track.scrollTo({ left: target * slideWidth(), behavior: 'smooth' })
  }

  const lastStart = Math.max(0, visible.length - perView)
  const shownFrom = visible.length ? current + 1 : 0
  const shownTo = Math.min(current + perView, visible.length)
  const progress = visible.length ? (shownTo / visible.length) * 100 : 0

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-title">
      <header className="section-head projects-head">
        <div>
          <p className="section-index mono">01 / Projetos</p>
          <h2 id="projetos-title" className="section-title">Projetos pessoais</h2>
          <p className="section-desc">
            Apps e produtos web que desenvolvi de ponta a ponta, da concepção ao deploy.
          </p>
        </div>
        <p className="projects-total" aria-live="polite">
          <strong>{pad(visible.length)}</strong>
          <span className="mono">
            {visible.length === 1 ? 'projeto' : 'projetos'}
            {category !== 'Todos' ? ` ${category}` : ''}
          </span>
        </p>
      </header>

      <div className="projects-toolbar">
        <div className="projects-tabs" role="group" aria-label="Filtrar por categoria">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`projects-tab${category === cat ? ' is-active' : ''}`}
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
              <span className="mono">{pad(countFor(cat))}</span>
            </button>
          ))}
        </div>

        <div className="projects-toolbar-end">
          <SelectMenu
            label="Ordenar projetos"
            value={order}
            options={(Object.keys(sortLabels) as SortOrder[]).map((key) => ({
              value: key,
              label: sortLabels[key],
            }))}
            onChange={setOrder}
          />

          <div className="projects-arrows">
            <button
              type="button"
              className="projects-arrow"
              onClick={() => goTo(current - perView)}
              disabled={current <= 0}
              aria-label="Projetos anteriores"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="projects-arrow"
              onClick={() => goTo(current + perView)}
              disabled={current >= lastStart}
              aria-label="Próximos projetos"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="projects-track"
        onScroll={syncPosition}
        aria-label="Projetos"
      >
        {visible.map((project, index) => (
          <li key={project.name} className="projects-slide">
            <ProjectCard
              project={project}
              index={index}
              onOpen={() => setOpenIndex(index)}
            />
          </li>
        ))}
      </ul>

      <div className="projects-progress">
        <span className="mono">
          {pad(shownFrom)}{shownTo > shownFrom ? `–${pad(shownTo)}` : ''} de {pad(visible.length)}
        </span>
        <div className="projects-progress-bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      {openIndex !== null && visible[openIndex] && (
        <ProjectModal
          projects={visible}
          index={openIndex}
          onNavigate={(i) => {
            setOpenIndex(i)
            goTo(i)
          }}
          onClose={closeModal}
        />
      )}
    </section>
  )
}
