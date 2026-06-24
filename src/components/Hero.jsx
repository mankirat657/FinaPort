import React, { useEffect, useRef } from 'react'
import { FaArrowDown, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa6'
import { FaCode, FaRocket, FaAward, FaUsers, FaArrowRight } from 'react-icons/fa'
import { myImg } from '../assets/assets'
import Button from './Button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const descRef = useRef(null)
    const statsRef = useRef(null)
    const buttonsRef = useRef(null)
    const socialRef = useRef(null)
    const tagsRef = useRef(null)
    const cardRef = useRef(null)
    const statusRef = useRef(null)
    const tagItems = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power4.out' }
            })

            tl.fromTo(statusRef.current,
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
            )

            tl.fromTo(titleRef.current,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(2.5)' },
                '-=0.4'
            )

            tl.fromTo(subtitleRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8 },
                '-=0.6'
            )

            tl.fromTo(descRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.4'
            )

            tl.fromTo(tagItems.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' },
                '-=0.3'
            )

            tl.fromTo(buttonsRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.3'
            )

            tl.fromTo(cardRef.current,
                { x: 100, opacity: 0, rotationY: 15 },
                { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: 'power3.out' },
                '-=0.8'
            )

            tl.fromTo(statsRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'back.out(2)' },
                '-=0.4'
            )

            tl.fromTo(socialRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.3'
            )

            gsap.fromTo(heroRef.current,
                { background: 'rgba(235, 229, 221, 0)' },
                {
                    background: 'rgba(235, 229, 221, 0.1)',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    }
                }
            )

            gsap.to(titleRef.current, {
                y: -30,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                }
            })

            const buttons = buttonsRef.current?.children
            if (buttons) {
                Array.from(buttons).forEach(btn => {
                    btn.addEventListener('mouseenter', () => {
                        gsap.to(btn, {
                            scale: 1.05,
                            boxShadow: '0 10px 40px rgba(255,0,4,0.3)',
                            duration: 0.3,
                            ease: 'power2.out'
                        })
                    })
                    btn.addEventListener('mouseleave', () => {
                        gsap.to(btn, {
                            scale: 1,
                            boxShadow: '0 0 0 rgba(255,0,4,0)',
                            duration: 0.3,
                            ease: 'power2.out'
                        })
                    })
                })
            }

            const socialIcons = socialRef.current?.children
            if (socialIcons) {
                Array.from(socialIcons).forEach(icon => {
                    icon.addEventListener('mouseenter', () => {
                        gsap.to(icon, {
                            y: -5,
                    scale: 1.15,
                            duration: 0.3,
                            ease: 'back.out(2)'
                        })
                    })
                    icon.addEventListener('mouseleave', () => {
                        gsap.to(icon, {
                            y: 0,
                    scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        })
                    })
                })
            }

            gsap.to(statusRef.current, {
                y: -5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                stagger: 0.2
            })

        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={heroRef} className='max-w-[1600px] min-h-screen border-b-8 border-b-[#FF0004] pb-9 mx-auto px-4 lg:px-6 relative overflow-hidden'>
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-50%] right-[-20%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-3xl" />
            </div>

            <div className="w-full pt-8 flex flex-col gap-2 relative">
                <div ref={statusRef} className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex px-3 montsterat text-sm font-[500] py-1.5 items-center gap-2 rounded-full bg-[#333333] shadow-lg shadow-[#333333]/20">
                        <div className="dot bg-[#ebe5dd] w-3 h-3 rounded-full "></div>
                        <p className='text-[#ebe5dd]'>4+ Real world Projects Delivered</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#ebe5dd] px-4 py-1.5 rounded-full shadow-lg shadow-[#333333]/10">
                        <div className="dot bg-[#20be00] w-3 h-3 rounded-full "></div>
                        <p className='montsterat font-[600] text-sm'>Available for work</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <h1 ref={titleRef} className='fontTri text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[21rem] text-[#333333] leading-[0.9] tracking-tight relative'>
                        INNOVATOR.
                    </h1>
                    
                    <div className="flex flex-col lg:flex-row items-start w-full justify-between gap-6">
                        <div className="flex flex-col w-full lg:w-[55%] px-3">
                            <div ref={subtitleRef} className="flex items-center gap-3 mb-1">
                                <div className="w-8 h-0.5 bg-[#FF0004]"></div>
                                <h1 className='montsterat font-[700] text-xl text-[#333333]'>Hi, I'm</h1>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <h1 className='font-[800] montsterat text-[#333333] text-3xl md:text-4xl lg:text-5xl tracking-tight'>
                                    MANKIRAT SINGH
                                </h1>
                                <div className="w-[15%] h-[4px] bg-gradient-to-r from-red-500 to-orange-400 rounded-full"></div>
                            </div>
                            
                            <div className="flex flex-col gap-1 w-full pt-4">
                                <p className='montsterat text-sm font-extrabold text-[#FF0004] tracking-wider'>
                                    FULL STACK DEVELOPER
                                </p>
                                <p ref={descRef} className='w-full md:w-[80%] montsterat text-sm font-semibold text-[#333333] leading-relaxed'>
                                    I build clean, scalable and impactful digital experiences that solve real world problems.
                                </p>
                                
                                <div ref={tagsRef} className="flex flex-wrap gap-2 mt-2">
                                    {['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'].map((tag, i) => (
                                        <span 
                                            key={tag}
                                            ref={el => tagItems.current[i] = el}
                                            className="px-3 py-1 bg-[#ebe5dd] rounded-full text-xs font-semibold text-[#333] border border-[#dad2c8] hover:border-[#FF0004] hover:shadow-md transition-all duration-300 cursor-default"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                <div ref={buttonsRef} className="flex items-center gap-4 mt-4">
                                    <Button 
                                        children='See my work' 
                                        Icon={FaArrowRight} 
                                        classnames='bg-[#FF0004] text-white px-6 py-2 rounded-lg font-[500] hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 flex items-center gap-2 group'
                                    />
                                    <Button 
                                        children='Download CV' 
                                        Icon={FaArrowDown} 
                                        classnames='bg-[#333333] text-white px-6 py-2 rounded-lg font-[500] hover:shadow-xl hover:shadow-[#333333]/30 transition-all duration-300 flex items-center gap-2 group'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full lg:w-[40%] px-3">
                            <div ref={cardRef} className="flex flex-col gap-4 bg-[#ebe5dd] shadow-xl p-5 rounded-2xl hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl" />
                                
                                <p className='montsterat font-[550] text-xl w-full text-[#333333] relative z-10'>
                                    A passionate fullstack developer and problem solver who turns ideas into impactful digital solutions.
                                </p>
                                
                                <div ref={statsRef} className="flex items-center gap-8 border-t border-gray-200 pt-4">
                                    <div className="text-center group cursor-default">
                                        <p className="text-2xl font-bold text-[#333] group-hover:text-[#FF0004] transition-colors duration-300">4+</p>
                                        <p className="text-xs text-gray-500">Projects</p>
                                    </div>
                                    <div className="text-center group cursor-default">
                                        <p className="text-2xl font-bold text-[#333] group-hover:text-[#FF0004] transition-colors duration-300">2+</p>
                                        <p className="text-xs text-gray-500">Years Exp</p>
                                    </div>
                                    <div className="text-center group cursor-default">
                                        <p className="text-2xl font-bold text-[#333] group-hover:text-[#FF0004] transition-colors duration-300">10+</p>
                                        <p className="text-xs text-gray-500">Clients</p>
                                    </div>
                                </div>
                                
                                <div ref={socialRef} className="links flex flex-wrap gap-4 sm:gap-6 pt-2">
                                    <FaFacebook className='w-10 h-auto text-[#333333] hover:text-[#1877f2] cursor-pointer transition-all duration-300' />
                                    <FaTwitter className='w-10 h-auto text-[#333333] hover:text-[#1da1f2] cursor-pointer transition-all duration-300' />
                                    <FaLinkedin className='w-10 h-auto text-[#333333] hover:text-[#0a66c2] cursor-pointer transition-all duration-300' />
                                    <FaInstagram className='w-10 h-auto text-[#333333] hover:text-[#e4405f] cursor-pointer transition-all duration-300' />
                                    <FaGithub className='w-10 h-auto text-[#333333] hover:text-[#333] cursor-pointer transition-all duration-300' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero