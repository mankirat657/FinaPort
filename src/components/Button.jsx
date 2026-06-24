import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const Button = ({ 
  classnames = "", 
  Icon, 
  iconColor = "currentColor",
  children = "Button",
  onClick,
  disabled = false,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const textContainerRef = useRef(null);
  const originalTextRef = useRef(null);
  const copyTextRef = useRef(null);
  const iconRef = useRef(null);
  
  useEffect(() => {
    if (copyTextRef.current) {
      gsap.set(copyTextRef.current, { y: '100%', opacity: 0 });
    }
    
    if (iconRef.current) {
      gsap.set(iconRef.current, { y: 0 });
    }
  }, []);

  const handleMouseEnter = () => {
    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.out" }
    });

    tl.to(originalTextRef.current, {
      y: '-100%',
      opacity: 0,
      duration: 0.3
    }, 0);

    tl.to(copyTextRef.current, {
      y: '0%',
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, 0.1);

    if (Icon && iconRef.current) {
      tl.to(iconRef.current, {
        rotate: 360,
        scale: 1.1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, 0);
    }
  };

  const handleMouseLeave = () => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.inOut" }
    });
    tl.to(originalTextRef.current, {
      y: '0%',
      opacity: 1,
      duration: 0.3
    }, 0);
    tl.to(copyTextRef.current, {
      y: '100%',
      opacity: 0,
      duration: 0.3
    }, 0);
    if (Icon && iconRef.current) {
      tl.to(iconRef.current, {
        rotate: 0,
        scale: 1,
        duration: 0.3
      }, 0);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden inline-flex items-center gap-2    transition-colors duration-300 ${classnames}`}
      {...props}
    >
      <div 
        ref={textContainerRef}
        className="relative inline-flex items-center gap-2 overflow-hidden"
      >
        <span 
          ref={originalTextRef}
          className="inline-flex items-center gap-2"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {children}
        </span>

        <span 
          ref={copyTextRef}
          className="absolute inline-flex items-center gap-2"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            y: '100%',
            opacity: 0
          }}
        >
          {children}
        </span>
      </div>

      {Icon && (
        <span 
          ref={iconRef}
          className="inline-flex items-center"
          style={{ color: iconColor }}
        >
          <Icon size={15} />
        </span>
      )}
    </button>
  );
};

export default Button;