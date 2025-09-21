import { Community } from './components/community'
import { Features } from './components/features'
import { Hero } from './components/hero'
import { Roadmap } from './components/roadmap'
import Sub from './components/sub'
import { Tokenomics } from './components/tokenomics'

function App() {
  return (
    <div>
      <Hero />
      <Sub />
      <Features />
      <Tokenomics />
      <Roadmap />
      <Community />
    </div>
  )
}

export default App
