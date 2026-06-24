import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MankiratImg } from '../assets/assets'
import { FaArrowUp } from 'react-icons/fa'
gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const blackBoxRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const box = blackBoxRef.current

    const totalTravel = () => card.offsetHeight + box.offsetHeight

    gsap.set(box, { y: 0 }) 

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=100%',
      pin: card,
      scrub: true,
      onUpdate: (self) => {
        gsap.set(box, { y: -self.progress * totalTravel() })
      }
    })

    return () => ScrollTrigger.getAll().forEach(st => st.kill())
  }, [])

  return (
    <div ref={sectionRef} className='max-w-[1600px] min-h-screen relative mx-auto overflow-hidden'>
      <div
        ref={cardRef}
        className="w-full relative h-[80vh] p-16 rounded-bl-[84px] rounded-br-[84px] bg-[#FF0004] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF0004] via-[#E60000] to-[#CC0000] opacity-90" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%),
                           radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)`
        }} />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 border-white/10" />
        <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 border-white/10" />
        <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-white/10" />
        <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 border-white/10" />

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-white/80" />
            <span className="text-white/80 text-xs tracking-[0.3em] uppercase font-light">
              Inspiration & Design Philosophy
            </span>
            <span className="w-8 h-px bg-white/80" />
          </div>

          <h1 className="text-white font-bold leading-[1.05]">
            <span className="text-[4.2rem] block">
              I love to inspire, because I know
            </span>
            <span className="text-[4.2rem] block text-white/90">
              what it's like to be inspired.
            </span>
            <span className="text-[3.6rem] block mt-6 font-light italic text-white/80">
              Seeing design work and having fun, 
              <span className="block text-white/70 mt-2">
                that's what it's all about.
              </span>
            </span>
          </h1>

          <div className="absolute bottom-12 left-0 flex items-center gap-12">
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-white/20" />
              <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
                Since 2024
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-white/20" />
              <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
                Design & Innovation
              </span>
            </div>
          </div>
        </div>

        <div
          ref={blackBoxRef}
          className="absolute right-12 bottom-12 w-[25vw] h-[25vh] bg-black rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="relative w-full h-full">
            <img 
              src={MankiratImg} 
              alt="Mankirat"
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            <div className="absolute inset-0 border border-white/0 hover:border-white/10 transition-all duration-500 rounded-2xl" />
            
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/0 hover:border-white/20 transition-all duration-500" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/0 hover:border-white/20 transition-all duration-500" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/0 hover:border-white/20 transition-all duration-500" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/0 hover:border-white/20 transition-all duration-500" />
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase font-light">
              Scroll
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
      <div className="px-6 flex items-start justify-between">
        <h1 className='alterative text-[#333333] text-8xl font-[800]'>M.S.</h1>
        <p className='montsterat'>mankirat.matharu@gmail.com</p>
        <div className="flex flex-col text-[#333333] font-[500] alterative text-xl">
          <p>Home</p>
          <p>About</p>
          <p>Work</p>
        </div>
        <div className="flex flex-col text-[#333333] font-[500] alterative text-xl">
          <p>Linkdin</p>
          <p>Instagram</p>
          <p>Email</p>
        </div>
        <div className="w-20 h-20 rounded-full bg-[#DAD0C1] flex items-center justify-center">
          <FaArrowUp className='w-9 h-auto'/>
        </div>
      </div>
    </div>
  )
}

export default Footer