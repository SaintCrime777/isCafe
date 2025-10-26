import { useState } from 'react'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Coffee from './components/coffee'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero/>
      <Coffee/>
      <Footer/>
    </>
  )
}

export default App
