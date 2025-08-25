import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('olive')

  // Define the colors array here (before return)
  const colors = ["red", "blue", "pink", "green", "yellow", "purple"]

  return (
    <div className="w-full h-screen duration-200" style={{ backgroundColor: color }}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          {colors.map((c) => (
            <button
              key={c}
              className={`px-4 py-1 rounded-full text-white shadow-lg bg-${c}-500`}
              onClick={() => setColor(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
