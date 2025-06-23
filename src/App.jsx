import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="border bg-red-100">
        Hello world
      </p>
    </>
  )
}

export default App
