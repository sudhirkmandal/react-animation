import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1741603558151-e1f3822051bc?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1734929669390-2e8f671eb892?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1734929669390-2e8f671eb892?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1742505709405-5e311b9c0031?q=80&w=2070&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1680721310241-82fb5a5748cd?q=80&w=2070&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1680721310286-1aa12c5f757b?q=80&w=2070&auto=format&fit=crop",
];

const Cards = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.set(cardRefs.current, { opacity: 0, transformOrigin: "center" });

    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 150,
          rotateY: index % 2 === 0 ? -30 : 30, 
          skewX: index % 2 === 0 ? -10 : 10,
          opacity: 0,
        },
        {
          y: 0,
          rotateY: 0,
          skewX: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // Pehle 90% tha, ab thoda delay kar diya
            end: "top 40%",  // Animation zyada smooth dikhne ke liye
            scrub: 2, // Pehle 1 tha, ab slow aur natural banane ke liye 2 kiya
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center py-40 overflow-hidden">
      <div className="grid grid-cols-2 gap-16 w-[90%] perspective-[1200px]">
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="h-[30vw] bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <img src={src} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
