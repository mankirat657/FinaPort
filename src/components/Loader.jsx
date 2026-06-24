import React, { useEffect, useRef, useState } from 'react'
import { Proj3, Proj4, Proj5, Proj6, Proj7, Proj8 } from '../assets/assets'
import { CustomEase } from 'gsap/all'
import { SplitText } from 'gsap/SplitText'
import gsap from 'gsap'

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create("hop", "0.8, 0, 0.2, 1");
CustomEase.create("hop2", "0.9, 0, 0.1, 1");

const Loader = ({ setLoading }) => {
  const loaderRef = useRef(null);
  const animationRef = useRef(null);
  const [imagesReady, setImagesReady] = useState(false);
  // Store SplitText instances for cleanup
  const splitInstancesRef = useRef([]);

  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = [Proj3, Proj4, Proj5, Proj6, Proj7, Proj8];
      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = url;
          img.onload = () => {
            img.decode().then(() => {
              resolve(true);
            }).catch(() => {
              resolve(true);
            });
          };
          img.onerror = () => {
            resolve(true);
          };
        });
      });

      await Promise.all(imagePromises);
      setTimeout(() => {
        setImagesReady(true);
      }, 100);
    };

    loadImages();

    const timeout = setTimeout(() => {
      setImagesReady(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!imagesReady) return;

    const timer = setTimeout(() => {
      if (!loaderRef.current) return;

      const splitText = (selector, type, className, mask = true) => {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return null;
        const split = SplitText.create(selector, {
          type: type,
          [`${type}class`]: className,
          ...(mask && { mask: type })
        });
        // Store instance for cleanup
        if (split) {
          splitInstancesRef.current.push(split);
        }
        return split;
      };

      const preloaderHeaderSplit = splitText(".preloader-header h1", "chars", "char");
      const headerSplit = splitText(".header h1", "chars", "char", false);
      const footerSplit = splitText(".hero-footer p", "words", "word");

      const preloaderImgInitRotations = [0, 5, -8, 12, -15, 3, -5, 10, -12, 8, -3, 15];

      gsap.set(".preloader-img", {
        rotate: (i) => preloaderImgInitRotations[i],
      });

      const counterEl = document.querySelector(".preloader-counter p");
      if (counterEl) {
        counterEl.textContent = "000";
      }

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(".preloader-img", {
        scale: 1,
        clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
        duration: 1,
        ease: "hop",
        stagger: 0.2
      });

      tl.to(".preloader-header h1 .char", {
        y: "0%",
        duration: 1,
        ease: "hop2",
        stagger: { each: 0.125, from: "random" }
      }, "0.35");

      const counterTl = gsap.timeline();
      
      counterTl.to(".preloader-counter p", {
        y: "0%",
        duration: 1,
        ease: "hop2",
      });
      
      counterTl.call(() => {
        const counterEl = document.querySelector(".preloader-counter p");
        if (!counterEl) return;
        
        const counter = { value: 0 };
        gsap.to(counter, {
          value: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterEl) {
              counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
            }
          },
          onComplete: () => {
            if (counterEl) {
              counterEl.textContent = "100";
            }
          }
        });
      }, [], "+=0.3");

      tl.add(counterTl, "0.35");

      tl.to(".preloader-counter p", {
        y: "-100%",
        duration: 0.75,
        ease: "hop2"
      }, 3.25);

      tl.to(".preloader-header h1 .char", {
        y: "-100%",
        duration: 0.75,
        ease: "hop2",
        stagger: { each: 0.125, from: "random" }
      }, 3.25);

      tl.to(".preloader-images .preloader-img", {
        scale: 0,
        clipPath: "polygon(20% 20%,80% 20%,80% 80%,20% 80%)",
        duration: 1,
        ease: "hop2",
        stagger: -0.075
      }, 3.5);

      tl.to(".preloader", {
        clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
        duration: 1,
        ease: "hop2",
        onComplete: () => {
          if (setLoading) setLoading(false);
        }
      }, 4.35);

      tl.to(".header h1 .char", {
        y: "0%",
        duration: 1,
        ease: "hop",
        stagger: { each: 0.075, from: "random" }
      }, 4.65);

      tl.to("nav a .word", {
        y: "0%",
        duration: 1,
        ease: "hop",
        stagger: 0.075
      }, 4.75);

      tl.to(".hero-footer p .word", {
        y: "0%",
        duration: 1,
        ease: "hop",
        stagger: 0.075,
      }, 4.75);

      animationRef.current = tl;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
      // Clean up SplitText instances
      splitInstancesRef.current.forEach(split => {
        if (split && split.revert) {
          split.revert();
        }
      });
      splitInstancesRef.current = [];
    };
  }, [imagesReady, setLoading]);

  if (!imagesReady) {
    return (
      <div className="preloader-loading">
        <div className="preloader-header">
          <h1 className='alterative font-bold !text-9xl'>CREAT</h1>
          <div className="preloader-counter">
            <p>000</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={loaderRef}>
      <div className='preloader'>
        <div className="preloader-images">
          <div className="preloader-img"><img className='w-full h-full object-cover' src={Proj3} alt="project1" loading="eager" /></div>
          <div className="preloader-img"><img className='w-full h-full object-cover' src={Proj4} alt="project2" loading="eager" /></div>
          <div className="preloader-img"><img className='w-full h-full object-cover' src={Proj5} alt="project3" loading="eager" /></div>
          <div className="preloader-img"><img className='w-full h-full object-cover' src={Proj6} alt="project4" loading="eager" /></div>
          <div className="preloader-img"><img className='w-full h-full object-cover' src={Proj7} alt="project5" loading="eager" /></div>
          <div className="preloader-img"><img className='w-full h-full object-cover' src={Proj8} alt="project6" loading="eager" /></div>
        </div>
        <div className="preloader-header">
          <h1 className='alterative mytext font-bold !text-9xl'>CREAT</h1>
          <div className="preloader-counter">
            <p>000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader