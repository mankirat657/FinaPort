import React, { useState, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import AboutDetails from './components/AboutDetails'
import Project from './components/Project'
import Skills from './components/Skills'
import Footer from './components/Footer'
import Contact from './components/Contact'
import ArtShowCaseGallery from './components/ArtShowCaseGallery'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [loading, setLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setShowLoader(true)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2, 
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.2,
      lerp: 0.08,
      infinite: false,
      autoRaf: false
    })
    window.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('load', refresh)

    return () => {
      gsap.ticker.remove(raf)
      window.removeEventListener('load', refresh)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 500)
    }
  }, [loading])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3e6de',
        position: 'relative'
      }}
    >
      {showLoader && loading && (
        <Loader setLoading={setLoading} />
      )}

      {!loading && (
        <div className="min-h-screen bg-[#FFF1E9] w-full relative">

          <Navbar />
          <section id="home">
          <Hero />
          </section>
          <section id="about">
          <About />
          </section>
          <section id="aboutdetails">
          <AboutDetails />
          </section>
          <section id="project">
          <Project />
          </section>
          <section id="skills">
          <Skills />
          </section>
          <section id="gallery">
            <ArtShowCaseGallery />
          </section>
          <section id="connect">
          <Footer />
          </section>

        </div>
      )}
    </div>
  )
}

export default App