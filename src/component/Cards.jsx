import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const projects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=2065&auto=format&fit=crop"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" // Changed this image URL
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
  }
]

const LusionStyleFeaturedWork = () => {
  const containerRef = useRef()
  const titleRef = useRef()
  const projectRefs = useRef([])

  useGSAP(() => {
    // Set up 3D perspective
    gsap.set(containerRef.current, { perspective: 1200 })

    // Animate title
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%"
      }
    })

    // Project animations
    projectRefs.current.forEach((project, i) => {
      if (!project) return

      const image = project.querySelector('.project-image img')
      const content = project.querySelector('.project-content')

      // Initial state
      gsap.set(project, {
        opacity: 0,
        y: 100,
        rotationY: i % 2 === 0 ? -15 : 15,
        transformPerspective: 1000,
        z: -100
      })

      // Ensure image is loaded
      if (image.complete) {
        initAnimations()
      } else {
        image.addEventListener('load', initAnimations)
      }

      function initAnimations() {
        // Scroll animation
        gsap.to(project, {
          opacity: 1,
          y: 0,
          rotationY: 0,
          z: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 85%",
            end: "top 50%",
            scrub: 1
          }
        })

        // Parallax effect
        gsap.to(image, {
          yPercent: -15,
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 2
          }
        })
      }

      // Mouse interaction
      project.addEventListener('mousemove', handleMouseMove)
      project.addEventListener('mouseleave', handleMouseLeave)

      function handleMouseMove(e) {
        const rect = project.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height

        gsap.to(project, {
          rotationY: 10 * (x - 0.5),
          rotationX: -10 * (y - 0.5),
          duration: 0.5
        })
      }

      function handleMouseLeave() {
        gsap.to(project, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        })
      }

      return () => {
        project.removeEventListener('mousemove', handleMouseMove)
        project.removeEventListener('mouseleave', handleMouseLeave)
        image.removeEventListener('load', initAnimations)
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative py-40 px-8 bg-black text-white overflow-hidden">
      <h2 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-40 text-center">
        Featured Work
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={el => projectRefs.current[i] = el}
            className="project-item relative h-[80vh] rounded-3xl overflow-hidden group"
          >
            <div className="project-image absolute inset-0 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy" // Add lazy loading
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
            
            <div className="project-content absolute bottom-0 left-0 right-0 p-12 z-10">
              <span className="inline-block px-4 py-2 bg-white text-black rounded-full text-sm mb-4">
                {project.category}
              </span>
              <h3 className="text-4xl font-bold mb-2">{project.title}</h3>
              <p className="text-xl">{project.description}</p>
            </div>
            
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md z-20" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default LusionStyleFeaturedWork