import { useEffect, useRef } from "react";

const skills = [
  {
    id: "01",
    title: "Frontend",
    sub: "Development",
    tags: ["Javscript", "React", "TypeScript", "Tailwind CSS"],
    year: "2022-25",
  },
  {
    id: "02",
    title: "Motion &",
    sub: "Interaction",
    tags: ["GSAP", "Framer Motion"],
    year: "2022-25",
  },
  {
    id: "03",
    title: "UI / UX",
    sub: "Design",
    tags: ["Figma", "Photoshop", "Canva", "Research"],
    year: "2022-25",
  },
  {
    id: "04",
    title: "Backend",
    sub: "Engineering",
    tags: ["Node.js", "PostgreSQL", "REST", "GraphQL"],
    year: "2025-current",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const marqRef = useRef(null);

  useEffect(() => {
    const load = (src) =>
      new Promise((res) => {
        if (document.querySelector(`script[src="${src}"]`)) return res();
        const s = document.createElement("script");
        s.src = src;
        s.onload = res;
        document.head.appendChild(s);
      });

    (async () => {
      await load("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await load("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");

      const { gsap } = window;
      const { ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      // ── CINEMATIC MARQUEE ──
      const marq = marqRef.current;
      if (marq) {
        const inner = marq.querySelector(".marq-inner");
        gsap.to(inner, {
          xPercent: -50,
          ease: "none",
          duration: 22,
          repeat: -1,
        });

        // Glitch sparkle on marquee
        gsap.to(".marq-item", {
          color: "#ff6b6b",
          duration: 0.15,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
          stagger: { each: 0.4, repeat: -1 },
        });
      }

      // ── EPIC TITLE REVEAL ──
      const titleEl = titleRef.current;
      if (titleEl) {
        const chars = titleEl.querySelectorAll(".c");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: titleEl,
            start: "top 70%",
            end: "top 30%",
            scrub: 1.2,
          },
        });

        tl.fromTo(
          chars,
          { yPercent: 150, opacity: 0, rotateX: -90, scale: 0.3 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            stagger: 0.08,
            duration: 1.8,
            ease: "power4.out",
          }
        );

        // Floating animation
        gsap.to(chars, {
          y: -12,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.06, from: "random" },
        });
      }

      // ── META LINE WITH DRAMA ──
      gsap.fromTo(
        ".meta-row",
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".meta-row", start: "top 80%" },
        }
      );

      // ── DIVIDER WITH ENERGY ──
      gsap.fromTo(
        ".top-rule",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".top-rule", start: "top 80%" },
        }
      );

      // ── LEGENDARY SKILL ROWS ──
      const rows = document.querySelectorAll(".sk-row");

      rows.forEach((row, index) => {
        const num = row.querySelector(".sk-num");
        const titleBlock = row.querySelector(".sk-name-wrap");
        const tagsList = row.querySelectorAll(".sk-tag");
        const yr = row.querySelector(".sk-yr");
        const line = row.querySelector(".sk-line");
        const titleInner = row.querySelector(".sk-title-inner");

        // Epic timeline for each row
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 45%",
            scrub: 1.5,
          },
        });

        // Number with spin
        tl.fromTo(
          num,
          { x: -100, opacity: 0, rotate: -360, scale: 0 },
          { x: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.2, ease: "back.out(2.5)" }
        );

        // Title with 3D
        tl.fromTo(
          titleBlock,
          { x: -120, opacity: 0, skewX: 20, rotationY: -40 },
          { x: 0, opacity: 1, skewX: 0, rotationY: 0, duration: 1.4, ease: "power4.out" },
          "-=0.6"
        );

        // Tags explosion
        tl.fromTo(
          tagsList,
          { y: 60, opacity: 0, scale: 0, rotation: -30 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.12,
            duration: 1,
            ease: "back.out(2)",
          },
          "-=0.6"
        );

        // Year pulse
        tl.fromTo(
          yr,
          { opacity: 0, scale: 0.3, rotation: -20 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.6)" },
          "-=0.4"
        );

        // Accent line with glow
        tl.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.2, ease: "power3.inOut" },
          0
        );

        // ── NEXT-LEVEL HOVER EFFECTS ──
        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(titleInner, {
            x: 30,
            color: "#E8001D",
            duration: 0.6,
            ease: "power3.out",
          })
          .to(
            num,
            {
              color: "#E8001D",
              scale: 1.4,
              rotation: 15,
              duration: 0.6,
              ease: "back.out(2.5)",
            },
            0
          )
          .to(
            row,
            {
              backgroundColor: "rgba(232, 0, 29, 0.07)",
              borderRadius: "16px",
              paddingLeft: "24px",
              paddingRight: "24px",
              duration: 0.5,
              ease: "power2.out",
            },
            0
          )
          .to(
            tagsList,
            {
              x: 15,
              duration: 0.5,
              ease: "power2.out",
            },
            0
          )
          .to(
            line,
            {
              duration: 0.5,
            },
            0
          );

        row.addEventListener("mouseenter", () => hoverTl.play());
        row.addEventListener("mouseleave", () => hoverTl.reverse());

        // Tag hover with 3D
        tagsList.forEach((tag) => {
          tag.addEventListener("mouseenter", () => {
            gsap.to(tag, {
              scale: 1.3,
              backgroundColor: "#E8001D",
              color: "#fff",
              rotation: 5,
              duration: 0.4,
              ease: "back.out(2)",
            });
          });
          tag.addEventListener("mouseleave", () => {
            gsap.to(tag, {
              scale: 1,
              backgroundColor: "transparent",
              color: "#E8001D",
              boxShadow: "none",
              rotation: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        });
      });

      // ── CINEMATIC PARALLAX ──
      gsap.to(".hero-heading", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.5,
        },
      });

      // ── RED BLOCK DRAMATIC REVEAL ──
      const redBlock = document.querySelector(".red-block");
      if (redBlock) {
        gsap.fromTo(
          redBlock,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 2.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: ".red-block", start: "top 70%" },
          }
        );

        // Pulsing glow
        gsap.to(redBlock, {
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // ── BOTTOM BAR DRAMA ──
      gsap.fromTo(
        ".bottom-bar",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: ".bottom-bar", start: "top 85%" },
        }
      );

      // ── CTA BUTTON ENERGY ──
      const ctaBtn = document.querySelector(".bottom-cta");
      if (ctaBtn) {
        gsap.to(ctaBtn, {
          scale: 1.08,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        ctaBtn.addEventListener("mouseenter", () => {
          gsap.to(ctaBtn, {
            scale: 1.15,
            backgroundColor: "#E8001D",
            color: "#fff",
            duration: 0.5,
            ease: "back.out(2)",
          });
        });
        ctaBtn.addEventListener("mouseleave", () => {
          gsap.to(ctaBtn, {
            scale: 1.08,
            backgroundColor: "transparent",
            color: "#E8001D",
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }

      // ── COUNT-UP WITH STYLE ──
      const metaCount = document.querySelector(".meta-count");
      if (metaCount) {
        const countObj = { value: 0 };
        gsap.to(countObj, {
          value: 4,
          duration: 3,
          ease: "power3.out",
          scrollTrigger: { trigger: ".meta-row", start: "top 80%" },
          onUpdate: () => {
            if (metaCount) {
              metaCount.textContent = `${Math.round(countObj.value)} disciplines`;
            }
          },
        });
      }

      // ── AMBIENT PARTICLES ──
      const section = sectionRef.current;
      if (section) {
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement("div");
          particle.className = "particle";
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(232, 0, 29, ${Math.random() * 0.12 + 0.03});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 0;
          `;
          section.appendChild(particle);

          gsap.to(particle, {
            y: `-${Math.random() * 300 + 150}px`,
            x: `${(Math.random() - 0.5) * 150}px`,
            opacity: 0,
            duration: Math.random() * 25 + 15,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 12,
          });
        }
      }

      // ── SCROLL PROGRESS ──
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

    })();

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((t) => t.kill());
      }
    };
  }, []);

  return (
    <>
     

      <div className="scroll-progress " />

      <section className="sk-section bg-[#F5F4F0] min-h-screen relative overflow-hidden" ref={sectionRef}>
        <div className="marq-bar bg-[#E8001D] overflow-hidden whitespace-nowrap py-3 relative z-10 " ref={marqRef}>
          <div className="marq-inner inline-flex gap-0 will-change-transform">
            {[...Array(2)].map((_, r) =>
              ["Frontend Development", "Motion Design", "UI / UX", "Backend Engineering", "Design Systems", "Interaction Design"].map((t, i) => (
                <span className="marq-item text-white text-xs md:text-sm tracking-[0.3em] uppercase px-6 md:px-8" key={`${r}-${i}`}>
                  {t} <span className="text-white/40 px-2">✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        <div className="sk-inner max-w-[1320px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
          <div className="hero-heading flex items-start justify-between gap-6 mb-16 relative">
            <div className="relative">
              <h1 className="sk-big-title font-['Bebas_Neue'] text-[clamp(80px,16vw,200px)] leading-[0.88] text-[#333333] tracking-[-0.02em] m-0 overflow-hidden perspective-[1000px]" ref={titleRef}>
                <span className="row block overflow-hidden">
                  {"SKILLS".split("").map((ch, i) => (
                    <span className="c inline-block fontTri will-change-transform opacity" key={i}>{ch}</span>
                  ))}
                </span>
              </h1>
            </div>
            <span className="side-label writing-mode-vertical-rl  font-['DM_Serif_Display'] italic text-sm text-[#999] monsterat tracking-[0.12em] pt-3 self-end hidden md:block">
              Selected expertise / 2024
            </span>
            <div className="red-block absolute top-0 -right-2 w-1.5 h-full bg-[#E8001D] origin-top rounded-sm hidden md:block" />
          </div>

          <div className="meta-row flex items-center gap-8 mb-5 opacity-0">
            <span className="meta-count text-[11px] tracking-[0.22em] uppercase text-[#E8001D] font-medium min-w-[120px]">
              04 disciplines
            </span>
            <div className="meta-dash h-px w-12 bg-[#ccc]" />
            <span className="meta-desc text-xs tracking-[0.12em] uppercase text-[#aaa]">
              Continuously expanding
            </span>
          </div>

          <div className="top-rule h-[1.5px] bg-[#111] mb-0 origin-left opacity-0" />

          <ul className="sk-grid list-none p-0 m-0">
            {skills.map((s) => (
              <li className="sk-row grid grid-cols-[48px_1fr] md:grid-cols-[72px_1fr_auto] items-center gap-4 md:gap-8 py-6 md:py-7 border-b border-black/8 relative cursor-default hover:bg-[rgba(232,0,29,0.04)] rounded-xl px-3 md:px-6 -mx-3 md:-mx-6 transition-all" key={s.id}>
                <div className="sk-line absolute bottom-0 left-0 h-0.5 w-full bg-[#E8001D] origin-left scale-x-0 opacity-0 " />
                <span className="sk-num font-['Bebas_Neue'] text-3xl md:text-4xl text-[#bbb] leading-none transition-all duration-300">
                  {s.id}
                </span>
                <div className="sk-name-wrap flex flex-col gap-3">
                  <span className="sk-title-inner font-['Bebas_Neue'] text-[clamp(28px,4.5vw,56px)] leading-[0.95] fontTri text-[#111] tracking-[-0.01em] block will-change-transform">
                    {s.title} {s.sub}
                  </span>
                  <div className="sk-tags flex flex-wrap gap-2 will-change-transform">
                    {s.tags.map((t) => (
                      <span className="sk-tag text-[10px] tracking-[0.16em] uppercase text-[#E8001D] border border-[#E8001D] px-3 py-1 rounded-full font-medium" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="sk-yr font-['DM_Serif_Display'] italic text-sm text-[#aaa] whitespace-nowrap self-start pt-2 hidden md:block">
                  Since {s.year}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </section>
    </>
  );
}