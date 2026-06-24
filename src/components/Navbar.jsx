import React, { useState, useEffect, useRef } from 'react'
import Button from './Button'
import { LuGalleryVerticalEnd, LuSearch, LuMenu } from 'react-icons/lu'
import gsap from 'gsap'

const NAV_ITEMS = ["Work", "Studio", "Insights", "Connect"]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState('Work')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navRef = useRef(null)
  const logoRef = useRef(null)
  const logoAccentRef = useRef(null)
  const navItemsContainerRef = useRef(null)
  const itemRefs = useRef([])
  const ctaRef = useRef(null)
  const borderRef = useRef(null)
  const bgRef = useRef(null)
  const menuItemsRef = useRef([])
  const mobileMenuRef = useRef(null)
  const gradientLineRef = useRef(null)
  const glowRef = useRef(null) 

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundColor: isScrolled ? 'rgba(250, 245, 240, 0.92)' : 'rgba(250, 245, 240, 0)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        boxShadow: isScrolled ? '0 4px 40px rgba(0,0,0,0.05)' : '0 0 0 rgba(0,0,0,0)',
        duration: 0.8,
        ease: 'power3.inOut'
      })
    }
  }, [isScrolled])

  useEffect(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: isScrolled ? 0.6 : 0,
        scale: isScrolled ? 1 : 0.8,
        duration: 0.8,
        ease: 'power3.inOut'
      })
    }
  }, [isScrolled])

  useEffect(() => {
    gsap.to(borderRef.current, {
      scaleX: isScrolled ? 1 : 0,
      opacity: isScrolled ? 1 : 0,
      duration: 0.8,
      ease: 'power4.inOut'
    })
  }, [isScrolled])

  useEffect(() => {
    if (gradientLineRef.current) {
      gsap.to(gradientLineRef.current, {
        scaleX: isScrolled ? 1 : 0,
        opacity: isScrolled ? 1 : 0.6,
        duration: 0.8,
        ease: 'power4.inOut'
      })
    }
  }, [isScrolled])

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    
    tl.fromTo(logoRef.current,
      { y: -40, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(2)' }
    )
    tl.fromTo(logoAccentRef.current,
      { width: 0, opacity: 0 },
      { width: 48, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    tl.fromTo(itemRefs.current,
      { y: -20, opacity: 0, rotationX: -15 },
      { y: 0, opacity: 1, rotationX: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    tl.fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' },
      '-=0.3'
    )
  }, [])

  const handleItemClick = (item, idx) => {
    setActiveItem(item)
    
    const activeEl = itemRefs.current[idx]
    if (activeEl) {
      gsap.fromTo(activeEl,
        { scale: 0.9 },
        { scale: 1, duration: 0.3, ease: 'back.out(2)' }
      )
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { y: -20, opacity: 0, display: 'none' },
        { y: 0, opacity: 1, display: 'flex', duration: 0.5, ease: 'power3.out' }
      )
      gsap.fromTo(menuItemsRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.2 }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = 'none'
          }
        }
      })
    }
  }

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-[99999] w-full"
    >
      <div 
        ref={bgRef}
        className="absolute inset-0 -z-10"
      />

      <div
        ref={glowRef}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-28 bg-red-500 rounded-full blur-3xl opacity-0 pointer-events-none"
        style={{
          filter: 'blur(10px)',
          background: 'radial-gradient(ellipse at center, rgba(255,0,4,0.3) 0%, transparent 80%)'
        }}
      />

      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF0004] to-transparent relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
        <div className="flex items-center justify-between py-2 ">

          <div className="flex items-center gap-3">
            <a 
              ref={logoRef} 
              href="/" 
              className="group opacity-0 flex items-center gap-2 relative"
            >
              <span className="inline-flex items-center justify-center bg-[#1a1a1a] rounded-2xl px-3 py-2 shadow-2xl border border-white/10">
                <span className="text-2xl font-black tracking-tight text-white">
                  M
                  <span className="text-[#FF0004]">S</span>
                </span>
              </span>
              <div 
                ref={logoAccentRef}
                className="h-[2px] bg-[#FF0004] origin-left opacity-0"
              />
            </a>
          </div>

          <div 
            ref={navItemsContainerRef}
            className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-[#1a1a1a]/5 backdrop-blur-sm border border-[#1a1a1a]/5"
          >
            {NAV_ITEMS.map((item, idx) => (
              <div
                key={item}
                ref={el => itemRefs.current[idx] = el}
                className="opacity-0"
              >
                <Button
                  classnames={`
                    relative px-3 py-1 rounded-full text-sm font-medium tracking-wide
                    transition-all duration-300
                    ${activeItem === item 
                      ? 'text-white bg-[#1a1a1a] shadow-lg shadow-[#1a1a1a]/20' 
                      : 'text-[#4a4a4a] hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5'
                    }
                  `}
                  onClick={() => handleItemClick(item, idx)}
                >
                  {item}
                  {activeItem === item && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF0004] rounded-full" />
                  )}
                </Button>
              </div>
            ))}
          </div>

          <div ref={ctaRef} className="opacity-0 flex items-center gap-3">
            <Button
              classnames="
                group relative overflow-hidden
                bg-[#1a1a1a] text-white text-xs tracking-[0.15em] uppercase
                font-semibold px-6 py-2.5 rounded-full
                transition-all duration-300
                hover:bg-[#FF0004]
                hover:shadow-[0_8px_30px_rgba(255,0,4,0.3)]
                active:scale-95
                flex items-center gap-2
              "
              Icon={LuGalleryVerticalEnd}
              iconColor="#fff"
              iconSize={16}
            >
              <span className="relative z-10">Gallery</span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF0004] to-[#cc0004] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Button>

            <Button
              classnames="
                lg:hidden p-2 rounded-lg text-[#1a1a1a] hover:bg-[#1a1a1a]/5
                transition-all duration-300
              "
              onClick={toggleMenu}
              Icon={LuMenu}
              iconSize={22}
            />
          </div>

        </div>

        <div
          ref={gradientLineRef}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#FF0004] to-transparent origin-left scale-x-0 opacity-0"
        />

        <div 
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 right-0 mt-2 p-6 bg-[#faf5f0]/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#1a1a1a]/5 hidden flex-col gap-2"
        >
          {NAV_ITEMS.map((item, idx) => (
            <Button
              key={item}
              ref={el => menuItemsRef.current[idx] = el}
              classnames={`
                w-full text-left px-4 py-3 rounded-xl text-base font-medium
                transition-all duration-300
                ${activeItem === item 
                  ? 'bg-[#1a1a1a] text-white' 
                  : 'text-[#4a4a4a] hover:bg-[#1a1a1a]/5'
                }
              `}
              onClick={() => {
                handleItemClick(item, idx)
                toggleMenu()
              }}
            >
              {item}
            </Button>
          ))}
          <div className="h-px bg-[#1a1a1a]/10 my-2" />
          <Button
            classnames="
              w-full flex items-center justify-center gap-3
              bg-[#FF0004] text-white text-sm font-semibold
              px-4 py-3 rounded-xl
              hover:bg-[#cc0004] transition-colors duration-300
            "
            Icon={LuGalleryVerticalEnd}
            iconColor="#fff"
          >
            Visit Gallery
          </Button>
        </div>

        <div
          ref={borderRef}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#1a1a1a]/10 to-transparent origin-left scale-x-0 opacity-0"
        />
      </div>
    </nav>
  )
}

export default Navbar