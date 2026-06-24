import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MankiratImg } from '../assets/assets'
import { FaArrowUp, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import Button from './Button'
gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/mankirat-singh-217a3a290?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      link: "https://www.instagram.com/mankirat_x_gamechanger?igsh=M3Vub3BkbG93NDdo"
    },
    {
      name: "Email",
      icon: FaEnvelope,
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=mankirat.matharu@gmail.com&su=Portfolio Inquiry"
    }
  ];
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
        className="w-full relative h-[80vh] mypad p-16 rounded-bl-[84px] rounded-br-[84px] bg-[#FF0004] overflow-hidden"
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
            <span className="text-[4.2rem] footerText block">
              I love to inspire, because I know
            </span>
            <span className="text-[4.2rem] block footerText text-white/90">
              what it's like to be inspired.
            </span>
            <span className="text-[3.6rem] footerText block mt-6 font-light italic text-white/80">
              Seeing design work and having fun,
              <span className="block footerText text-white/70 mt-2">
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

      <div className="mainFooter  px-6 sm:px-10 md:px-16 lg:px-20 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 pb-10 md:pb-14 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-6">
              <h1 className='font-[800] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none'>
                <span className='text-[#1A1A1A]'>M.</span>
                <span className='text-[#DC2626]'>S</span>
                <span className='text-[#1A1A1A]'>.</span>
              </h1>
              <div className="hidden sm:block w-px h-12 bg-[#E5E5E5]"></div>
              <div className="hidden sm:block">
                <p className='text-[#666666] text-xs tracking-[0.2em] uppercase font-light'>Design Studio</p>
                <p className='text-[#1A1A1A] text-sm font-medium'>Est. 2024</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-[#DC2626]/30"></div>
              <a
                href="mailto:mankirat.matharu@gmail.com"
                className="group flex items-center gap-3 text-[#333333] hover:text-[#DC2626] transition-all duration-300"
              >
                <HiOutlineMail className="w-5 h-5 text-[#DC2626] group-hover:scale-110 transition-transform duration-300" />
                <span className='font-light tracking-wide text-sm md:text-base'>mankirat.matharu@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 md:gap-12 pt-10 md:pt-14">
            <div className="col-span-1 md:col-span-1 lg:col-span-3">
              <p className="text-[#999999] text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">Navigation</p>
              <div className="flex flex-col gap-3">
                {['home', 'about', 'project', 'connect'].map((item, index) => (
                  <Button
                    sectionId={item}
                    className="group flex items-center gap-3 text-[#1A1A1A] hover:text-[#DC2626] transition-all duration-300 text-base md:text-lg font-medium"
                  >
                    <span className="w-0 group-hover:w-6 h-px bg-[#DC2626] transition-all duration-300"></span>
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-3">
              <p className="text-[#999999] text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">Connect</p>
              <div className="flex flex-col gap-3">
                {socialLinks.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => window.open(item.link, "_blank")}
                    className="group flex items-center gap-3 text-[#1A1A1A] hover:text-[#DC2626] transition-all duration-300 text-base md:text-lg font-medium"
                  >
                    <item.icon className="w-4 h-4 text-[#DC2626] group-hover:scale-110 transition-transform duration-300" />
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-2">
              <div className="w-px h-full bg-gradient-to-b from-[#DC2626]/10 via-[#DC2626]/30 to-[#DC2626]/10 mx-auto"></div>
            </div>

            <div className="col-span-2 md:col-span-2 lg:col-span-4">
              <p className="text-[#999999] text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">Let's Talk</p>
              <div className="bg-[#e3d5d5] rounded-2xl p-6 md:p-8 hover:bg-[#F0F0F0] transition-all duration-300">
                <p className="text-[#1A1A1A] text-lg md:text-xl font-light leading-relaxed mb-4">
                  Have a project in mind?<br />
                  <span className="font-medium">Let's create something amazing.</span>
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-[#DC2626]"></div>
                  <span className="text-[#DC2626] text-sm font-medium tracking-wide cursor-pointer hover:tracking-wider transition-all duration-300">
                    Get in touch →
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 md:pt-14 mt-6 border-t border-[#E5E5E5]">
            <div className="flex items-center gap-6">
              <span className="text-[#999999] text-xs tracking-wide font-light">
                © 2026 M.S. Studio — All rights reserved
              </span>
              <div className="hidden sm:block w-px h-4 bg-[#E5E5E5]"></div>
              <span className="text-[#999999] text-xs tracking-wide font-light">Design & Innovation</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="group flex items-center gap-3 cursor-pointer">
                <Button children='Back on top' sectionId='home' />
                <div className="w-10 h-10 rounded-full bg-[#DC2626] flex items-center justify-center hover:bg-[#B91C1C] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#DC2626]/30 group-hover:rotate-12">

                  <FaArrowUp className='w-4 h-4 text-white' />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 mt-4">
            <div className="w-16 h-16 rounded-full bg-[#DC2626]/5 blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer