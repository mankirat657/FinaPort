import React, { useEffect, useRef, useState } from 'react'
import { proj1, proj2, Proj3, Proj4 } from '../assets/assets'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PiCursorClickLight, PiCursorLight } from 'react-icons/pi'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_TEXT = "SELECTED WORK"

const MarqueeTrack = ({ innerRef, textClassName }) => (
    <div
        ref={innerRef}
        className="absolute inset-0 flex items-center whitespace-nowrap will-change-transform"
    >
        {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0">
                {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className={textClassName}>
                        {MARQUEE_TEXT}
                        <span className="inline-block mx-4 sm:mx-6">★</span>
                    </span>
                ))}
            </div>
        ))}
    </div>
)

const Project = () => {
    const cardRef    = useRef(null)
    const sectionRef = useRef(null)

    const [frontIndex, setFrontIndex] = useState(0)
    const [backIndex,  setBackIndex]  = useState(1)
    const frontIndexRef = useRef(0)
    const backIndexRef  = useRef(1)

    const frontCursorContainerRef = useRef(null)
    const backCursorContainerRef  = useRef(null)
    const frontCursor1Ref = useRef(null)
    const frontCursor2Ref = useRef(null)
    const backCursor1Ref  = useRef(null)
    const backCursor2Ref  = useRef(null)

    const marqueeTrackARef  = useRef(null)
    const marqueeTrackBRef  = useRef(null)
    const scrollTweenARef   = useRef(null)
    const scrollTweenBRef   = useRef(null)
    const slideTimelineRef  = useRef(null)
    const visibleTrackRef   = useRef('A')

    const projects = [
        { image: proj1, title: "ALQUIDA AI (Learning Platform)",  tags: ["AI", "QUIZ", "EXAMINATION"] },
        { image: proj2, title: "ARCHITECT SHOWCASE WEBSITE",       tags: ["REACT", "GSAP", "TAILWIND"] },
        { image: Proj3, title: "LANDSLIDE MANAGEMENT",             tags: ["MERN", "SOCKET.IO", "MAPS"]  },
        { image: Proj4, title: "SKILL EXCHANGE PLATFORM",          tags: ["NODE", "MONGODB", "REDIS"]   },
    ]
    const totalProjects = projects.length

    const animateCursor = (c1, c2, dir) => {
        if (!c1.current || !c2.current) return
        gsap.killTweensOf([c1.current, c2.current])
        if (dir === 'enter') {
            gsap.to(c1.current,     { x: -100, opacity: 0, duration: 0.4, ease: "power2.in"  })
            gsap.fromTo(c2.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
        } else {
            gsap.to(c2.current,     { x: -100, opacity: 0, duration: 0.4, ease: "power2.in"  })
            gsap.fromTo(c1.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
        }
    }

    const initMarquee = () => {
        const A = marqueeTrackARef.current
        const B = marqueeTrackBRef.current
        if (!A || !B) return

        gsap.set(A, { yPercent: 0   })
        gsap.set(B, { yPercent: 100 })
        visibleTrackRef.current = 'A'

        if (scrollTweenARef.current) scrollTweenARef.current.kill()
        if (scrollTweenBRef.current) scrollTweenBRef.current.kill()

        scrollTweenARef.current = gsap.fromTo(A,
            { xPercent: 0 },
            { xPercent: -50, duration: 5, ease: "none", repeat: -1 }
        )
        scrollTweenBRef.current = gsap.fromTo(B,
            { xPercent: 0 },
            { xPercent: -50, duration: 5, ease: "none", repeat: -1 }
        )
    }

    // direction: 'forward' → old goes UP, new comes from BOTTOM
    //            'backward' → old goes DOWN, new comes from TOP
    const triggerMarqueeSwap = (direction = 'forward') => {
        if (slideTimelineRef.current && slideTimelineRef.current.isActive()) return

        const A = marqueeTrackARef.current
        const B = marqueeTrackBRef.current
        if (!A || !B) return

        const isAVisible = visibleTrackRef.current === 'A'
        const outEl = isAVisible ? A : B
        const inEl  = isAVisible ? B : A

        // Park incoming on the correct side depending on direction
        if (direction === 'forward') {
            gsap.set(inEl, { yPercent: 100 })   // below
        } else {
            gsap.set(inEl, { yPercent: -100 })  // above
        }

        const outTarget = direction === 'forward' ? -100 : 100
        const inTarget  = 0

        const tl = gsap.timeline({
            defaults: { duration: 0.55, ease: "power2.inOut" },
            onComplete: () => {
                // Park outgoing on the opposite side for next swap
                gsap.set(outEl, { yPercent: direction === 'forward' ? 100 : -100 })
                visibleTrackRef.current = isAVisible ? 'B' : 'A'
                slideTimelineRef.current = null
            }
        })

        tl.to(outEl, { yPercent: outTarget }, 0)
          .to(inEl,  { yPercent: inTarget  }, 0)

        slideTimelineRef.current = tl
    }

    useEffect(() => {
        initMarquee()
        return () => {
            if (scrollTweenARef.current) scrollTweenARef.current.kill()
            if (scrollTweenBRef.current) scrollTweenBRef.current.kill()
            if (slideTimelineRef.current) slideTimelineRef.current.kill()
        }
    }, [])

    useEffect(() => {
        const card    = cardRef.current
        const section = sectionRef.current
        if (!card || !section) return

        // Track midpoints in both directions
        // midpointsCrossed can go up AND down as user scrolls forward/backward
        let midpointsCrossed = 0

        const trigger = ScrollTrigger.create({
            trigger: section,
            start:   "20% top",
            end:     `+=${totalProjects * 1200}`,
            pin:     true,
            scrub:   1,
            anticipatePin: 1,

            onUpdate: (self) => {
                const progress      = Math.min(Math.max(self.progress, 0), 1)
                const totalRotation = progress * (totalProjects - 1) * 180

                if (card) card.style.transform = `rotateX(${totalRotation}deg)`

                // Midpoints at 90°, 270°, 450° …
                // floor((rot + 90) / 180) gives count of midpoints crossed
                const newMidpoints = Math.floor((totalRotation + 90) / 180)

                if (newMidpoints > midpointsCrossed) {
                    // scrolling forward — text goes UP, new comes from BOTTOM
                    midpointsCrossed = newMidpoints
                    triggerMarqueeSwap('forward')
                } else if (newMidpoints < midpointsCrossed) {
                    // scrolling backward — text goes DOWN, new comes from TOP
                    midpointsCrossed = newMidpoints
                    triggerMarqueeSwap('backward')
                }

                // face-swap logic
                const flip = Math.min(
                    Math.max(Math.floor(totalRotation / 180), 0),
                    totalProjects - 2 >= 0 ? totalProjects - 2 : 0
                )
                const flipIsEven   = flip % 2 === 0
                const restingIndex = flip
                const incomingIndex = Math.min(flip + 1, totalProjects - 1)
                const restingFace  = flipIsEven ? 'front' : 'back'

                const eff          = ((totalRotation % 360) + 360) % 360
                const frontVisible = !(eff > 90 && eff < 270)
                const hiddenFace   = frontVisible ? 'back' : 'front'
                const hiddenFaceTarget = hiddenFace === restingFace ? restingIndex : incomingIndex

                if (hiddenFace === 'front' && frontIndexRef.current !== hiddenFaceTarget) {
                    frontIndexRef.current = hiddenFaceTarget
                    setFrontIndex(hiddenFaceTarget)
                } else if (hiddenFace === 'back' && backIndexRef.current !== hiddenFaceTarget) {
                    backIndexRef.current = hiddenFaceTarget
                    setBackIndex(hiddenFaceTarget)
                }
            },

            onLeaveBack: () => {
                frontIndexRef.current = 0
                backIndexRef.current  = 1
                setFrontIndex(0)
                setBackIndex(1)
                midpointsCrossed = 0
                if (slideTimelineRef.current) {
                    slideTimelineRef.current.kill()
                    slideTimelineRef.current = null
                }
                initMarquee()
            }
        })

        return () => { trigger.kill() }
    }, [])

    const frontProject = projects[frontIndex]
    const backProject  = projects[backIndex]

    return (
        <section
            ref={sectionRef}
            className='w-full rounded-tr-[59px] rounded-tl-[59px] bg-[#FF0004]'
        >
            <div className="projHeading p-8 md:p-12">
                <h1 className='montsterat flex font-[550] text-3xl sm:text-4xl md:text-5xl text-white'>
                    Selected Work
                    <sup className='text-sm sm:text-base md:text-xl'>(4)</sup>
                </h1>
            </div>

            <div
                style={{ perspective: "2500px", perspectiveOrigin: "center center" }}
                className="relative flex justify-center items-center h-[80vh] md:h-screen overflow-hidden"
            >
                <div className="absolute min-h-[23vh] w-full inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden pointer-events-none z-0">
                    <MarqueeTrack
                        innerRef={marqueeTrackARef}
                        textClassName="montsterat font-[700] text-4xl sm:text-5xl md:text-[12rem] leading-none text-white uppercase"
                    />
                    <MarqueeTrack
                        innerRef={marqueeTrackBRef}
                        textClassName="montsterat font-[700] text-4xl sm:text-5xl md:text-[12rem] leading-none text-white uppercase"
                    />
                </div>

                <div
                    ref={cardRef}
                    className="w-[90%] md:w-[70%] lg:w-[50%] h-fit sm:h-[400px] md:h-[80vh] relative z-[1] rounded-3xl p-3"
                    style={{ transformStyle: "preserve-3d", transform: "rotateX(0deg)" }}
                >
                    <div
                        className="absolute inset-0 rounded-3xl p-3 bg-[#EEE1DA] overflow-hidden"
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    >
                        <div
                            ref={frontCursorContainerRef}
                            className="w-8 h-8 rounded-bl-lg bg-[#EEE1DA] absolute top-2 right-3 flex items-center justify-center z-10 overflow-hidden"
                        >
                            <div ref={frontCursor1Ref} className="absolute inset-0 flex items-center justify-center" style={{ opacity: 1 }}>
                                <PiCursorLight className='w-5 h-auto sm:w-6' />
                            </div>
                            <div ref={frontCursor2Ref} className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
                                <PiCursorClickLight className='w-5 h-auto sm:w-6' />
                            </div>
                        </div>
                        <div
                            className="w-full cursor-pointer h-[82%] rounded-2xl overflow-hidden relative z-[5]"
                            onMouseEnter={() => animateCursor(frontCursor1Ref, frontCursor2Ref, 'enter')}
                            onMouseLeave={() => animateCursor(frontCursor1Ref, frontCursor2Ref, 'leave')}
                        >
                            <img src={frontProject.image} alt={frontProject.title}
                                className="w-full h-full object-cover transition-transform duration-300 ease-linear hover:scale-95 rounded-2xl" />
                        </div>
                        <div className="flex flex-col gap-2 mt-3 relative z-[5]">
                            <h1 className='alterative font-[700] text-lg sm:text-xl'>{frontProject.title}</h1>
                            <div className="flex flex-wrap items-center gap-2">
                                {frontProject.tags.map((tag, idx) => (
                                    <div key={idx} className='bg-[#FF0004] text-white px-2 sm:px-3 py-1 rounded-md font-[600] alterative text-xs sm:text-sm'>{tag}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* BACK */}
                    <div
                        className="absolute inset-0 rounded-3xl p-3 bg-[#EEE1DA] overflow-hidden"
                        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
                    >
                        <div
                            ref={backCursorContainerRef}
                            className="w-8 h-8 rounded-bl-lg bg-[#EEE1DA] absolute top-2 right-3 flex items-center justify-center z-10 overflow-hidden"
                        >
                            <div ref={backCursor1Ref} className="absolute inset-0 flex items-center justify-center" style={{ opacity: 1 }}>
                                <PiCursorLight className='w-5 h-auto sm:w-6 text-[#333333]' />
                            </div>
                            <div ref={backCursor2Ref} className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
                                <PiCursorClickLight className='w-5 h-auto sm:w-6 text-[#333333]' />
                            </div>
                        </div>
                        <div
                            className="w-full cursor-pointer h-[82%] rounded-2xl overflow-hidden relative z-[5]"
                            onMouseEnter={() => animateCursor(backCursor1Ref, backCursor2Ref, 'enter')}
                            onMouseLeave={() => animateCursor(backCursor1Ref, backCursor2Ref, 'leave')}
                        >
                            <img src={backProject.image} alt={backProject.title}
                                className='w-full h-full object-cover transition-transform duration-300 ease-linear hover:scale-95 rounded-2xl' />
                        </div>
                        <div className="flex flex-col gap-2 mt-3 relative z-[5]">
                            <h1 className='alterative font-[700] text-lg sm:text-xl text-[#333333]'>{backProject.title}</h1>
                            <div className="flex flex-wrap items-center gap-2">
                                {backProject.tags.map((tag, idx) => (
                                    <div key={idx} className='bg-[#FF0004] text-white px-2 sm:px-3 py-1 rounded-md font-[600] alterative text-xs sm:text-sm'>{tag}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Project