import { useEffect } from 'react'
import type { ProgramItem } from '../data/programs'
import './Modal.css'

type Props = {
  item: ProgramItem | null
  onClose: () => void
}

const tagConfig: Record<string, { emoji: string; className: string }> = {
  '온 가족': { emoji: '👨‍👩‍👧‍👦', className: 'modal-tag-together' },
  '부모': { emoji: '🧘', className: 'modal-tag-adult' },
  '아이들': { emoji: '🧒', className: 'modal-tag-child' },
}

export default function Modal({ item, onClose }: Props) {
  useEffect(() => {
    if (!item) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  const tag = tagConfig[item.target] ?? { emoji: '📌', className: 'modal-tag-together' }
  const hasRichContent = item.instructor || item.sections

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${hasRichContent ? 'modal-rich' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">
          &times;
        </button>

        <div className="modal-header">
          <span className={`modal-tag ${tag.className}`}>
            {tag.emoji} {item.target}
          </span>
          <h2 className="modal-title">{item.title}</h2>
          <p className="modal-desc">{item.description}</p>
        </div>

        {/* 강사 정보 */}
        {item.instructor && (
          <div className="modal-instructor">
            <div className="instructor-photo-wrapper">
              <img
                src={`${import.meta.env.BASE_URL}${item.instructor.photo.replace(/^\//, '')}`}
                alt={`${item.instructor.name} 강사님`}
                className="instructor-photo"
              />
            </div>
            <div className="instructor-info">
              <p className="instructor-label">{item.instructor.title}</p>
              <h3 className="instructor-name">{item.instructor.name}</h3>
              <p className="instructor-subtitle">15년 경력의 커뮤니케이션 코치 &amp; 국내 최초 마술심리상담사</p>
            </div>
          </div>
        )}

        {/* 메인 카피 */}
        {item.mainCopy && (
          <div className="modal-main-copy">
            <p>&ldquo;{item.mainCopy}&rdquo;</p>
          </div>
        )}

        {/* 프로그램 섹션 */}
        {item.sections && (
          <div className="modal-sections">
            {item.sections.map((section, i) => (
              <div key={i} className="modal-section">
                <div className="section-icon-badge">{section.icon}</div>
                <div className="section-content">
                  <h4 className="section-heading">{section.heading}</h4>
                  <p className="section-body">{section.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 강사 약력 */}
        {item.instructor && (
          <div className="modal-credentials">
            <h4 className="credentials-title">강사 주요 약력</h4>
            <ul className="credentials-list">
              {item.instructor.credentials.map((cred, i) => (
                <li key={i}>{cred}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 일반 상세 텍스트 (기존 방식) */}
        {!hasRichContent && item.detail && (
          <div className="modal-body">
            {item.detail.split('\n').map((line, i) => (
              <p key={i} className={line === '' ? 'modal-spacer' : 'modal-line'}>
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
