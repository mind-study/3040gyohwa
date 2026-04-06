import { useCallback, useState } from 'react'
import Header from './components/Header'
import ProgramCard from './components/ProgramCard'
import Modal from './components/Modal'
import Footer from './components/Footer'
import { LeafDecoration } from './components/Illustrations'
import { programs } from './data/programs'
import type { ProgramItem } from './data/programs'
import './App.css'

export default function App() {
  const [selectedItem, setSelectedItem] = useState<ProgramItem | null>(null)
  const handleClose = useCallback(() => setSelectedItem(null), [])

  return (
    <div className="app">
      <Header />
      <main className="program-list">
        <div className="section-header">
          <LeafDecoration />
          <h2 className="section-title">프로그램 일정</h2>
          <p className="section-desc">매월 토요일 오후, 온 가족이 함께하는 특별한 시간</p>
        </div>
        <div className="card-grid">
          {programs.map((program) => (
            <ProgramCard
              key={program.month}
              program={program}
              onItemClick={setSelectedItem}
            />
          ))}
        </div>
      </main>
      <Footer />
      <Modal item={selectedItem} onClose={handleClose} />
    </div>
  )
}
