import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { 
  FaHeart, FaExpand, 
  FaInstagram, FaBehance, FaDribbble 
} from 'react-icons/fa'
import { images } from '../assets/assets'
const ArtShowCaseGallery = () => {
  const sectionRef = useRef(null)
  const column1Ref = useRef(null)
  const column2Ref = useRef(null)
  const column3Ref = useRef(null)
  const titleRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  const artworks = [
    {
      id: 1,
      title: "Wind Breaker",
      artist: "Mankirat Singh",
      year: "2025",
      category: "Anime",
      image: images[0],
      likes: 6,
      views: "6"
    },
    {
      id: 2,
      title: "Naruto",
      artist: "Mankirat Singh",
      year: "2024",
      category: "Anime",
      image: images[1],
      likes: 10,
      views: "10"
    },
    {
      id: 3,
      title: "Vegeta",
      artist: "Mankirat Singh",
      year: "2023",
      category: "Animes",
      image: images[2],
      likes: 8,
      views: "8"
    },
    {
      id: 4,
      title: "Girl in summer dress",
      artist: "Mankirat Singh",
      year: "2022",
      category: "Digital",
      image: images[3],
      likes: 8,
      views: "8"
    },
    {
      id: 5,
      title: "Goku vs Vegeta",
      artist: "Mankirat Singh",
      year: "2025",
      category: "Anime",
      image: images[4],
      likes: 8,
      views: "8"
    },
    {
      id: 6,
      title: "Calm hashira",
      artist: "Mankirat Singh",
      year: "2025",
      category: "Anime",
      image: images[9],
      likes: 8,
      views: "8"
    },
    {
      id: 7,
      title: "Naruto Characters Selfie",
      artist: "Mankirat Singh",
      year: "2025",
      category: "Anime",
      image: images[6],
      likes: 5,
      views: "5"
    },
    {
      id: 8,
      title: "Rengoku vs upper moon",
      artist: "Mankirat Singh",
      year: "2025",
      category: "Anime",
      image: images[7],
      likes: 6,
      views: "6"
    },
    {
      id: 9,
      title: "kakashi's Age",
      artist: "Mankirat Singh",
      year: "2025",
      category: "Anime",
      image: images[8],
      likes: 6,
      views: "6"
    }
  ]

  const getColumnItems = (startIndex) => {
    const items = []
    for (let cycle = 0; cycle < 3; cycle++) {
      for (let i = 0; i < 6; i++) {
        const idx = (startIndex + i) % artworks.length
        items.push({
          ...artworks[idx],
          uniqueId: `${artworks[idx].id}-${cycle}-${i}`
        })
      }
    }
    return items
  }

  const column1Items = getColumnItems(0)
  const column2Items = getColumnItems(3)
  const column3Items = getColumnItems(6)

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (!isReady) return

    const timer = setTimeout(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out"
        })
      }

      const col1 = column1Ref.current
      const col2 = column2Ref.current
      const col3 = column3Ref.current

      if (!col1 || !col2 || !col3) return

      gsap.killTweensOf([col1, col2, col3])

      gsap.fromTo(
        col1,
        { yPercent: 0 },
        {
          yPercent: -33.3333,
          duration: 28,
          ease: "none",
          repeat: -1
        }
      )

      // Column 2: top -> bottom (content moves downward).
      // Start already shifted up one set, then animate back to 0, repeating.
      gsap.fromTo(
        col2,
        { yPercent: -33.3333 },
        {
          yPercent: 0,
          duration: 28,
          ease: "none",
          repeat: -1
        }
      )

      // Column 3: bottom -> top, slightly faster for visual rhythm
      gsap.fromTo(
        col3,
        { yPercent: 0 },
        {
          yPercent: -33.3333,
          duration: 22,
          ease: "none",
          repeat: -1
        }
      )

      const tweens = gsap.getTweensOf([col1, col2, col3])

      const pauseOnHover = (element) => {
        const onEnter = () => {
          gsap.getTweensOf(element).forEach(t => t.pause())
        }
        const onLeave = () => {
          gsap.getTweensOf(element).forEach(t => t.resume())
        }
        element.addEventListener('mouseenter', onEnter)
        element.addEventListener('mouseleave', onLeave)
        return () => {
          element.removeEventListener('mouseenter', onEnter)
          element.removeEventListener('mouseleave', onLeave)
        }
      }

      const cleanup1 = pauseOnHover(col1)
      const cleanup2 = pauseOnHover(col2)
      const cleanup3 = pauseOnHover(col3)

      return () => {
        tweens.forEach(t => t.kill())
        cleanup1()
        cleanup2()
        cleanup3()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isReady])

  // Render card
  const renderCard = (artwork, index, columnIndex) => {
    const isFeatured = index === 0 && columnIndex === 1
    return (
      <div
        key={artwork.uniqueId || artwork.id}
        className={`group relative rounded-2xl overflow-hidden bg-[#1A1A1A] cursor-pointer w-full ${
          isFeatured ? 'aspect-[3/4]' : 'aspect-[4/5]'
        } mb-6 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 flex-shrink-0`}
      >
        <img 
          src={artwork.image} 
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Red Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 left-4 px-4 py-1.5 bg-red-600 text-white text-[10px] tracking-widest font-medium rounded-full z-10">
            FEATURED
          </div>
        )}
        
        {/* Card Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-red-500 text-[10px] tracking-[0.3em] font-medium uppercase">{artwork.category}</span>
            <span className="w-4 h-px bg-red-500/30"></span>
            <span className="text-white/40 text-[10px] font-light">{artwork.year}</span>
          </div>
          <h4 className="text-white text-lg font-['Space_Grotesk',sans-serif] font-light tracking-wide">{artwork.title}</h4>
          <p className="text-white/50 text-sm font-light">by {artwork.artist}</p>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <FaHeart className="w-3 h-3 text-red-500" />
              <span className="text-white/40 text-xs font-light">{artwork.likes}</span>
            </div>
            <span className="text-white/30 text-xs font-light">{artwork.views}</span>
          </div>
        </div>

        {/* Expand Icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-red-600/20 transition-colors duration-300">
            <FaExpand className="w-3.5 h-3.5 text-white/80 group-hover:text-red-500 transition-colors" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="min-h-screen ">
      <div className="sticky top-0 z-20  backdrop-blur-xl border-b border-red-100/30">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6">
          <div className="flex items-center justify-between">
            <div ref={titleRef}>
              <h1 className="text-3xl lg:text-5xl fontTri text-[#333333]">
                <span className="text-red-600  font-bold">✦</span> RED <span className="text-red-600 font-bold">·</span> WHITE
              </h1>
             
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right montsterat">
                <p className="text-xs text-gray-400 tracking-widest">CURATED BY</p>
                <p className="text-sm font-medium text-red-600">MANKIRAT SINGH</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2.5 rounded-full border border-red-200 hover:bg-red-50 transition-all duration-300 group">
                  <FaInstagram className="text-gray-400 group-hover:text-red-600 transition-colors text-sm" />
                </button>
                <button className="p-2.5 rounded-full border border-red-200 hover:bg-red-50 transition-all duration-300 group">
                  <FaBehance className="text-gray-400 group-hover:text-red-600 transition-colors text-sm" />
                </button>
                <button className="p-2.5 rounded-full border border-red-200 hover:bg-red-50 transition-all duration-300 group">
                  <FaDribbble className="text-gray-400 group-hover:text-red-600 transition-colors text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="relative overflow-hidden" style={{ height: '750px' }}>
            <div ref={column1Ref} className="flex flex-col will-change-transform">
              {column1Items.map((artwork, index) => renderCard(artwork, index, 1))}
            </div>
          </div>

          <div className="relative overflow-hidden" style={{ height: '750px' }}>
            <div ref={column2Ref} className="flex flex-col will-change-transform">
              {column2Items.map((artwork, index) => renderCard(artwork, index, 2))}
            </div>
          </div>

          <div className="relative overflow-hidden" style={{ height: '750px' }}>
            <div ref={column3Ref} className="flex flex-col will-change-transform">
              {column3Items.map((artwork, index) => renderCard(artwork, index, 3))}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default ArtShowCaseGallery