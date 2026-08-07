"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface GalleryItem {
  id?: string;
  common: string;
  binomial: string;
  photo: {
    url: string; 
    text: string;
    pos?: string;
    by: string;
  };
}

export interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items?: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
  onItemClick?: (item: GalleryItem, index: number) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 280, autoRotateSpeed = 0.05, onItemClick, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed]);

    const displayItems = items && items.length > 0 ? items : [
      {
        common: "Elena & Davide",
        binomial: "Il nostro primo bacio",
        photo: { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", text: "Foto 1", by: "Sposi" }
      },
      {
        common: "Proposta di Nozze",
        binomial: "Parigi, 2025",
        photo: { url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", text: "Foto 2", by: "Sposi" }
      },
      {
        common: "Festa in Villa",
        binomial: "Momenti Insieme",
        photo: { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", text: "Foto 3", by: "Sposi" }
      }
    ];

    const anglePerItem = 360 / displayItems.length;
    
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-[440px] flex items-center justify-center overflow-hidden py-6 select-none", className)}
        style={{ perspective: '1200px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {displayItems.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.35, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.photo?.url || i} 
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (typeof onItemClick === "function") {
                    onItemClick(item, i);
                  }
                }}
                aria-label={`Visualizza e modifica ${item.common}`}
                className="absolute w-[200px] h-[260px] cursor-pointer group active:scale-95 transition-transform"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-100px',
                  marginTop: '-130px',
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden border-2 border-[#D4AF37] bg-slate-900/90 backdrop-blur-md group-hover:border-amber-300 transition-colors">
                  <img
                    src={item.photo?.url}
                    alt={item.photo?.text || item.common}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    style={{ objectPosition: item.photo?.pos || 'center' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white text-left">
                    <h2 className="text-sm font-serif font-bold text-[#D4AF37] leading-tight truncate">{item.common}</h2>
                    <em className="text-[10px] italic opacity-90 block truncate">{item.binomial}</em>
                    <span className="text-[9px] font-bold text-amber-300 block mt-1 uppercase tracking-wider">✦ Tocca per Filtri &amp; Dedica</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
export default CircularGallery;
