import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import './App.css'

const LS_KEY = 'photo-takes'

function App() {
  const [list, setList] = useState(() => {
    try {
      const stored = window.localStorage.getItem(LS_KEY)
      const parsed = JSON.parse(stored ?? '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [showReset, setShowReset] = useState(false)

  const updateList = (newList) => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(newList))
    setList(newList)
  }

  const handlePlus = () => {
    const newList = [...list, new Date().toISOString()]
    updateList(newList)
  }

  const handleMinus = () => {
    if (list.length === 0) return
    const newList = list.slice(0, -1)
    updateList(newList)
  }

  const handleReset = () => {
    window.localStorage.removeItem(LS_KEY)
    setList([])
  }

  useEffect(() => {
    setShowReset(list.length >= 36)
  }, [list])

  return (
    <>
      {showReset && (
        <button
          onClick={handleReset}
        >
          Reset
        </button>
      )}

      <h1>Film Photo Counter</h1>

      <div className="card">
        <button
          onDoubleClick={handleMinus}
          disabled={list.length === 0}
        >
          -
        </button>
        <div>{list.length}</div>
        <button
          onClick={handlePlus}
          disabled={list.length >= 36}
        >
          +
        </button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '200px',
        overflowY: 'auto',
        gap: '8px'
      }}>
        {list.map((timestamp, i) => {
          const date = new Date(timestamp)
          return (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <span>{i + 1}.</span>
              <strong>{format(date, 'hh:mm:ss a - dd MMM, yyyy')}</strong>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
