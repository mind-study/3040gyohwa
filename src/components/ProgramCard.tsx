import { useState } from 'react'
import type { ProgramSession, ProgramItem } from '../data/programs'
import { getGoogleCalendarUrl, downloadICS } from '../utils/calendar'
import './ProgramCard.css'

type Props = {
  program: ProgramSession
  onItemClick: (item: ProgramItem) => void
}

const typeColors: Record<string, string> = {
  '같이': '#42A5F5',
  '따로': '#FF7043',
  '같이+따로': '#AB47BC',
}

function buildDescription(program: ProgramSession): string {
  const lines: string[] = []
  program.together?.forEach((item) => {
    lines.push(`[함께] ${item.title}: ${item.description}`)
  })
  program.adult?.forEach((item) => {
    lines.push(`[부모] ${item.title}: ${item.description}`)
  })
  program.child?.forEach((item) => {
    lines.push(`[아이들] ${item.title}: ${item.description}`)
  })
  return lines.join('\n')
}

export default function ProgramCard({ program, onItemClick }: Props) {
  const { month, date, type, icon, together, adult, child } = program
  const [showCalMenu, setShowCalMenu] = useState(false)
  const description = buildDescription(program)

  return (
    <article className="program-card">
      <div className="card-header" style={{ background: typeColors[type] }}>
        <span className="card-icon">{icon}</span>
        <div className="card-header-text">
          <span className="card-month">{month}월</span>
          <span className="card-type-badge">{type}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="card-date-row">
          <p className="card-date">{date}</p>
          <div className="cal-btn-wrapper">
            <button
              className="cal-add-btn"
              onClick={() => setShowCalMenu(!showCalMenu)}
              aria-label="캘린더에 추가"
            >
              📅 일정 추가
            </button>
            {showCalMenu && (
              <div className="cal-menu">
                <a
                  href={getGoogleCalendarUrl(month, description)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cal-menu-item"
                  onClick={() => setShowCalMenu(false)}
                >
                  Google Calendar
                </a>
                <button
                  className="cal-menu-item"
                  onClick={() => {
                    downloadICS(month, description)
                    setShowCalMenu(false)
                  }}
                >
                  Apple / 기타 (.ics)
                </button>
              </div>
            )}
          </div>
        </div>

        {together?.map((item, i) => (
          <div key={i} className="program-item item-together clickable" onClick={() => onItemClick(item)}>
            <div className="item-header">
              <span className="item-tag tag-together">👨‍👩‍👧‍👦 {item.target}</span>
            </div>
            <h3 className="item-title">{item.title}</h3>
            <p className="item-desc">{item.description}</p>
            <span className="item-more">자세히 보기 &rarr;</span>
          </div>
        ))}

        {(adult || child) && (
          <div className="separate-programs">
            {adult?.map((item, i) => (
              <div key={i} className="program-item item-adult clickable" onClick={() => onItemClick(item)}>
                <div className="item-header">
                  <span className="item-tag tag-adult">🧘 {item.target}</span>
                </div>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-desc">{item.description}</p>
                <span className="item-more">자세히 보기 &rarr;</span>
              </div>
            ))}
            {child?.map((item, i) => (
              <div key={i} className="program-item item-child clickable" onClick={() => onItemClick(item)}>
                <div className="item-header">
                  <span className="item-tag tag-child">🧒 {item.target}</span>
                </div>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-desc">{item.description}</p>
                <span className="item-more">자세히 보기 &rarr;</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
