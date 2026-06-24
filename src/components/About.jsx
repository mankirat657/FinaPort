import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import { FaArrowRight, FaCode, FaFolder, FaInfinity, FaHandSparkles } from 'react-icons/fa'
import Card from './Card'
import { MdOutlineWork } from 'react-icons/md'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const marqueeRef = useRef(null)
  const textRef = useRef(null)
  const aboutRef = useRef(null)
  const titleRef = useRef(null)
  const headingRef = useRef(null)
  const descRef = useRef(null)
  const buttonRef = useRef(null)
  const cardsRef = useRef([])
  const gradientRef = useRef(null)
  const sparklesRef = useRef([])

  useEffect(() => {
    const text = textRef.current
    const marquee = marqueeRef.current
    
    const clone = text.cloneNode(true)
    marquee.appendChild(clone)
    
    const tl = gsap.timeline({
      repeat: -1,
      ease: "none"
    })
    
    const textWidth = text.offsetWidth
    
    tl.to(marquee, {
      x: -textWidth,
      duration: 12,
      ease: "none"
    })
    
    // ─── Scroll Animations ───
    const ctx = gsap.context(() => {
      // Gradient background reveal
      gsap.fromTo(gradientRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Title slide in
      gsap.fromTo(titleRef.current,
        { x: -50, opacity: 0, rotationY: -10 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Heading with split effect
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Description fade up
      gsap.fromTo(descRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Button reveal
      gsap.fromTo(buttonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(2.5)',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Cards staggered animation
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { 
            y: 80, 
            opacity: 0, 
            rotationX: 15,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'back.out(2.5)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Floating sparkles animation
      sparklesRef.current.forEach((sparkle, i) => {
        gsap.to(sparkle, {
          y: gsap.utils.random(-20, -40),
          x: gsap.utils.random(-10, 10),
          opacity: 0,
          duration: gsap.utils.random(1.5, 3),
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.3
        })
      })

      // Marquee speed increase on hover
      marquee.addEventListener('mouseenter', () => {
        gsap.to(marquee, {
          duration: 0.5,
          onUpdate: function() {
            tl.timeScale(2)
          }
        })
      })

      marquee.addEventListener('mouseleave', () => {
        gsap.to(marquee, {
          duration: 0.5,
          onUpdate: function() {
            tl.timeScale(1)
          }
        })
      })

    }, aboutRef)

    return () => {
      tl.kill()
      if (clone && marquee.contains(clone)) {
        marquee.removeChild(clone)
      }
      ctx.revert()
    }
  }, [])

  return (
    <div ref={aboutRef} className='max-w-[1600px] min-h-screen relative mx-auto px-4 lg:px-6 overflow-hidden'>
        
        {/* ─── Premium Gradient Orbs ─── */}
        <div className="absolute inset-0 -z-10">
          <div ref={gradientRef} className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl opacity-0" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl" />
        </div>

        {/* ─── Animated Sparkles ─── */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={el => sparklesRef.current[i] = el}
              className="absolute w-1 h-1 bg-red-400/40 rounded-full"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* ─── Background Marquee ─── */}
        <div className="textBackground absolute top-3 left-0 whitespace-nowrap overflow-hidden w-full opacity-20">
            <div 
              ref={marqueeRef} 
              className="flex whitespace-nowrap will-change-transform cursor-pointer"
              style={{ display: 'flex' }}
            >
                <h1 
                  ref={textRef}
                  className='text-[#c2b7b1] fontTri text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[18rem] leading-none font-[800] inline-block select-none'
                >
                  PROBLEM SOLVING
                </h1>
            </div>
        </div>

        <div className="about flex flex-col gap-24 header px-4 w-full relative z-10">
            
            <div ref={titleRef} className="pt-9 w-fit opacity-0">
                <h1 className='montsterat text-2xl font-[600] text-[#333333] flex items-center gap-3'>
                  About
                  <span className="w-2 h-2 bg-[#FF0004] rounded-full animate-pulse" />
                </h1>
                <div className="w-[60%] h-[.7vh] bg-gradient-to-r from-[#FF0004] to-red-400 rounded-full"></div>
            </div>

            <div className="aboutContent flex items-start  justify-between">
                
                <div className="w-[50%] flex flex-col gap-2">
                    <div className="w-[20%] h-[1vh] bg-gradient-to-r from-[#FF0004] to-red-400 rounded-full mb-3 animate-pulse"></div>
                    
                    <h1 ref={headingRef} className='text-6xl font-[500] fontTri text-[#333333] leading-none opacity-0'>
                      I DON'T JUST WRITE CODE.<br/> I BUILD <span className='text-[#FF0004] relative inline-block'>
                        DIGITAL EXPERIENCES.
                        <span className="absolute -inset-1 bg-red-500/10 blur-xl rounded-full" />
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF0004] to-transparent" />
                      </span>
                    </h1>
                    
                    <p ref={descRef} className='montsterat text-lg text-[#424242] opacity-0'>
                      I'm mankirat singh a full stack developer passionate about creating immersive experience
                      and solving real world problems. From building a full stack web app to developing ai 
                      integrated web applications i enjoy transforming ideas in to reality.
                    </p>
                    
                    <div ref={buttonRef} className="w-fit pt-2 opacity-0">
                      <Button 
                        children='Check out my work' 
                        Icon={FaArrowRight} 
                        classnames='bg-[#FF0004] text-white px-3 py-2 rounded-lg font-[500] hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 flex items-center gap-2 group relative overflow-hidden'
                      />
                    </div>
                </div>

                <div className="w-[45%] flex flex-wrap items-center gap-3">
                  {[
                    { Icon: FaFolder, title: "04+", desc: "Project delivered", color: "from-blue-500 to-blue-400" },
                    { Icon: MdOutlineWork, title: "02+", desc: "Internship completed", color: "from-green-500 to-green-400" },
                    { Icon: FaCode, title: "15+", desc: "Known Technology", color: "from-purple-500 to-purple-400" },
                    { Icon: FaInfinity, title: "∞", desc: "Learning Mindset", color: "from-red-500 to-orange-400" }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      ref={el => cardsRef.current[index] = el}
                      className="w-[calc(50%-0.375rem)] opacity-0"
                    >
                      <div className="relative group">
                        {/* Glow effect behind card */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                        
                        <Card 
                          Icon={item.Icon} 
                          title={item.title} 
                          desc={item.desc}
                          lastOne={index === 3}
                          className="relative bg-[#ebe5dd]/90 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                        />
                        
                        {/* Animated border on hover */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FF0004]/20 transition-all duration-500 pointer-events-none" />
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default About