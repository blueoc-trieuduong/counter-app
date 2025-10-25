import './CopyApp.css'

function CopyApp() {
  const handleClick = (event) => {
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
    <div className="copy-app">
      <div className="title" onClick={handleClick}>
        không có đối tượng mới
      </div>
      <div className="title" onClick={handleClick}>
        đối tượng mới không đủ 6s
      </div>
      <div className="title" onClick={handleClick}>
        không đủ 9s
      </div>
      <div className="title" onClick={handleClick}>
        chuyển cảnh cắt ghép
      </div>
    </div>
  )
}

export default CopyApp
