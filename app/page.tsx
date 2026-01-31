import Header from './components/Header'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import Certifications from './components/Certifications'
import CurrentWork from './components/CurrentWork'
import Recognitions from './components/Recognitions'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import WhatILearning from './components/WhatILearning'
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
      <Reveal variant="depth"><Hero /></Reveal>
      <Reveal delay={80} variant="left"><InteractiveTerminal /></Reveal>
      <Reveal delay={120} variant="right"><Expertise /></Reveal>
      <Reveal delay={140} variant="left"><Certifications /></Reveal>
      <Reveal delay={160} variant="right"><CurrentWork /></Reveal>
      <Reveal delay={180} variant="left"><Recognitions /></Reveal>
      <Reveal delay={200} variant="right"><Experience /></Reveal>
      <Reveal delay={220} variant="left"><Skills /></Reveal>
      <Reveal delay={240} variant="right"><Education /></Reveal>
      <Reveal delay={260} variant="left"><WhatILearning /></Reveal>
      <Reveal delay={280} variant="scale"><Contact /></Reveal>
      <Footer />
    </>
  )
}
