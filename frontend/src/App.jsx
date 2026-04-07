import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-600">
          APPLIK
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          AI-Driven Recruitment for Nicaragua. 
          <span className="block font-semibold text-applik-accent">
            Frontend Environment: ACTIVE
          </span>
        </p>
        <button className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition-hover hover:bg-blue-700">
          Enter Dashboard
        </button>
      </div>
    </div>
  )
}

export default App
