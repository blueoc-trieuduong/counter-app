import { useState } from 'react'
import './CopyApp.css'

const LS_KEY = 'copy-msgs'
const DEFAULT = [
  'không có đối tượng mới',
  'đối tượng mới không đủ 6s',
  'không đủ 9s',
  'chuyển cảnh cắt ghép',
]

function CopyApp() {
  const [list, setList] = useState(() => {
    try {
      const stored = window.localStorage.getItem(LS_KEY)
      const parsed = JSON.parse(stored ?? JSON.stringify(DEFAULT))
      return Array.isArray(parsed) ? parsed : DEFAULT
    } catch {
      return DEFAULT
    }
  })
  const [input, setInput] = useState('')

  const updateList = (newList) => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(newList))
    setList(newList)
  }

  const handlePlus = () => {
    if (input.trim() === '') return
    const newList = [...list, input]
    updateList(newList)
    setInput('')
  }

  const handleMinus = () => {
    if (list.length === 0) return
    const newList = list.slice(0, -1)
    updateList(newList)
  }

  const handleReset = () => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT))
    setList(DEFAULT)
  }

  const handleCopyClick = (event) => {
    event.stopPropagation()
    const textToCopy = event.target.textContent
    
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        event.target.style.backgroundColor = '#348a37ff'
        setTimeout(() => {
          event.target.style.backgroundColor = ''
        }, 200)
      })
      .catch(err => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <>
      <button
        onClick={handleReset}
      >
        Reset
      </button>

      <h1>Copy-TrieuDZ</h1>

      <div className="card">
        <button
          onClick={handleMinus}
          disabled={list.length === 0}
        >
          -
        </button>
        <input 
          type="text"
          value={input}
          placeholder='New message'
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handlePlus}
        >
          +
        </button>
      </div>

      <div className="copy-app">
        {list.map((msg, i) => {
          return (
            <div key={i} className="title" onClick={handleCopyClick}>
              {msg}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CopyApp
