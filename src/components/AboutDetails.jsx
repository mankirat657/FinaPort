import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FaArrowRight, FaHandSparkles, FaRocket, FaLightbulb } from 'react-icons/fa'

const AboutDetails = () => {
  const marqueeRef = useRef(null)
  const textRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const text = textRef.current
    const marquee = marqueeRef.current
    
    const clone = text.cloneNode(true)
    marquee.appendChild(clone)
    
    const textWidth = text.offsetWidth
    
    const tl = gsap.timeline({
      repeat: -1,
      ease: "none"
    })
    
    tl.to(marquee, {
      x: -textWidth,
      duration: 20,
      ease: "none"
    })
    
    animationRef.current = tl
    
    const handleMouseEnter = () => {
      if (animationRef.current) {
        animationRef.current.pause()
      }
    }
    
    const handleMouseLeave = () => {
      if (animationRef.current) {
        animationRef.current.resume()
      }
    }
    
    marquee.addEventListener('mouseenter', handleMouseEnter)
    marquee.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
      marquee.removeEventListener('mouseenter', handleMouseEnter)
      marquee.removeEventListener('mouseleave', handleMouseLeave)
      if (clone && marquee.contains(clone)) {
        marquee.removeChild(clone)
      }
    }
  }, [])

  return (
    <div className='max-w-[1600px] marqueeSpace pb-12 min-h-fit relative mx-auto overflow-hidden bg-[#FFF1E9]'>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF0004]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FF0004]/20 to-transparent"></div>
      </div>

      <div className="relative w-full py-3 fontTri overflow-hidden cursor-pointer group">
        <div className="absolute inset-0 bg-[#FF0004]"></div>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500"></div>
        
        <div 
          ref={marqueeRef} 
          className="flex items-center gap-2 whitespace-nowrap will-change-transform relative z-10"
          style={{ display: 'flex' }}
        >
          <div ref={textRef} className="flex marqueediv items-center gap-2">
            {['CREATIVITY', 'PROBLEM SOLVING', 'DEVELOPMENT', 'DESIGN', 'MINDSET'].map((text, index) => (
              <React.Fragment key={index}>
                <h1 className='text-[#FFF1E9] marqueeTExt text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider'>
                  {text}
                </h1>
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FFF1E9]/80 flex-shrink-0"></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-5 pt-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
          
          {/* Card 1 - Creator */}
          <div className="group relative w-full lg:w-auto">
            <div className="flex flex-col items-center lg:items-start gap-4 p-8 lg:p-10 rounded-2xl bg-[#FF0004] border border-[#FF0004]/20 hover:border-[#FFF1E9]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF0004]/30">
              <div className="flex items-center gap-4 w-full">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#FFF1E9] flex items-center justify-center">
                    <FaHandSparkles className="text-[#FF0004] w-5 h-5" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FFF1E9] flex items-center justify-center text-xs font-bold text-[#FF0004] border-2 border-[#FF0004]">
                    01
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[#FFF1E9]/60 text-xs uppercase tracking-[0.2em] font-montserrat font-semibold">I Start As</p>
                </div>
              </div>
              
              <h1 className='fontTri text-6xl sm:text-7xl lg:text-8xl text-[#FFF1E9] font-bold tracking-tight group-hover:scale-105 transition-transform duration-300'>
                CREATOR
              </h1>
              
              <div className="w-full h-px bg-[#FFF1E9]/20"></div>
              
              <div className="flex items-center justify-between w-full">
                <span className="text-[#FFF1E9]/50 text-xs uppercase tracking-wider font-montserrat">Passion to Create</span>
                <div className="w-10 h-10 rounded-full bg-[#FFF1E9]/10 group-hover:bg-[#FFF1E9]/30 transition-all duration-300 flex items-center justify-center">
                  <FaArrowRight className="text-[#FFF1E9] w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-48 bg-[#FF0004]/20"></div>

          {/* Card 2 - Developer */}
          <div className="group relative w-full lg:w-auto">
            <div className="flex flex-col items-center lg:items-start gap-4 p-8 lg:p-10 rounded-2xl bg-[#FF0004] border border-[#FF0004]/20 hover:border-[#FFF1E9]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF0004]/30">
              <div className="flex items-center gap-4 w-full">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#FFF1E9] flex items-center justify-center">
                    <FaRocket className="text-[#FF0004] w-5 h-5" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FFF1E9] flex items-center justify-center text-xs font-bold text-[#FF0004] border-2 border-[#FF0004]">
                    02
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[#FFF1E9]/60 text-xs uppercase tracking-[0.2em] font-montserrat font-semibold">I Evolve As</p>
                </div>
              </div>
              
              <h1 className='fontTri text-6xl sm:text-7xl lg:text-8xl text-[#FFF1E9] font-bold tracking-tight group-hover:scale-105 transition-transform duration-300'>
                DEVELOPER
              </h1>
              
              <div className="w-full h-px bg-[#FFF1E9]/20"></div>
              
              <div className="flex items-center justify-between w-full">
                <span className="text-[#FFF1E9]/50 text-xs uppercase tracking-wider font-montserrat">Build & Scale</span>
                <div className="w-10 h-10 rounded-full bg-[#FFF1E9]/10 group-hover:bg-[#FFF1E9]/30 transition-all duration-300 flex items-center justify-center">
                  <FaArrowRight className="text-[#FFF1E9] w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-48 bg-[#FF0004]/20"></div>

          <div className="group relative w-full lg:w-auto">
            <div className="flex flex-col items-center lg:items-start gap-4 p-8 lg:p-10 rounded-2xl bg-[#FF0004] border border-[#FF0004]/20 hover:border-[#FFF1E9]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF0004]/30">
              <div className="flex items-center gap-4 w-full">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#FFF1E9] flex items-center justify-center">
                    <FaLightbulb className="text-[#FF0004] w-5 h-5" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FFF1E9] flex items-center justify-center text-xs font-bold text-[#FF0004] border-2 border-[#FF0004]">
                    03
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[#FFF1E9]/60 text-xs uppercase tracking-[0.2em] font-montserrat font-semibold">I Evolve As</p>
                </div>
              </div>
              
              <h1 className='fontTri text-6xl sm:text-7xl lg:text-8xl text-[#FFF1E9] font-bold tracking-tight group-hover:scale-105 transition-transform duration-300'>
                INNOVATOR
              </h1>
              
              <div className="w-full h-px bg-[#FFF1E9]/20"></div>
              
              <div className="flex items-center justify-between w-full">
                <span className="text-[#FFF1E9]/50 text-xs uppercase tracking-wider font-montserrat">Think Different</span>
                <div className="w-10 h-10 rounded-full bg-[#FFF1E9]/10 group-hover:bg-[#FFF1E9]/30 transition-all duration-300 flex items-center justify-center">
                  <FaArrowRight className="text-[#FFF1E9] w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

        </div>

        
      </div>
    </div>
  )
}

export default AboutDetails