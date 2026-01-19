import Header from './components/Header'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import Certifications from './components/Certifications'
import CurrentWork from './components/CurrentWork'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Expertise />
      <Certifications />
      <CurrentWork />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
          <p>Built with Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </>
  )
}
