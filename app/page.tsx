import Header from './components/Header'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import Certifications from './components/Certifications'
import CurrentWork from './components/CurrentWork'
import Recognitions from './components/Recognitions'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import CommandPaletteHint from './components/CommandPaletteHint'
import InteractiveTerminal from './components/InteractiveTerminal'
import Reveal from './components/Reveal'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <CommandPaletteHint />
      <Reveal><Hero /></Reveal>
      <Reveal delay={80}><InteractiveTerminal /></Reveal>
      <Reveal delay={120}><Expertise /></Reveal>
      <Reveal delay={140}><Certifications /></Reveal>
      <Reveal delay={160}><CurrentWork /></Reveal>
      <Reveal delay={180}><Recognitions /></Reveal>
      <Reveal delay={200}><Experience /></Reveal>
      <Reveal delay={220}><Skills /></Reveal>
      <Reveal delay={240}><Education /></Reveal>
      <Reveal delay={260}><Contact /></Reveal>
      <Footer />
    </>
  )
}
