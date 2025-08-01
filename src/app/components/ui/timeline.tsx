"use client"
import { useScroll, useTransform, motion, useInView } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0%", "85% 100%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 0.85], [0, height * 0.92])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="w-full font-sans px-4 md:px-10" ref={containerRef}>
      <motion.div
        ref={headerRef}
        className="max-w-7xl mx-auto h-fit md:px-8 lg:px-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl mb-4 text-black dark:text-white max-w-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -30 }}
          animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          My Journey
        </motion.h2>
        <motion.p
          className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-xl leading-relaxed"
          initial={{ opacity: 0, x: -30 }}
          animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          I&apos;ve been diligently working on developing my skills over the past four years. Here is a timeline of my journey throughout my B.Tech program.
        </motion.p>
      </motion.div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 mt-8 md:mt-12">
        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-7 md:left-8 top-0 w-[3px] bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 rounded-full"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-glow"
          />
        </div>
      </div>
    </div>
  )
}

const TimelineItem = ({ item, index }: { item: { title: string; content: React.ReactNode }, index: number }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={itemRef}
      className="flex justify-start pt-8 md:pt-24 lg:pt-32 md:gap-10"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center md:top-32 lg:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <motion.div
          className="h-10 md:h-12 absolute left-2 md:left-2 w-10 md:w-12 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-lg border-2 border-blue-200 dark:border-blue-800"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="h-4 md:h-5 w-4 md:w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-glow"
            animate={{
              boxShadow: [
                "0 0 10px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(147, 51, 234, 0.5)",
                "0 0 10px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.h3
          className="hidden md:block text-xl md:text-2xl lg:text-3xl md:pl-20 font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
        >
          {item.title}
        </motion.h3>
      </div>

      <motion.div
        className="relative pl-16 md:pl-20 pr-4 md:pr-8 w-full"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
      >
        <motion.h3
          className="md:hidden block text-xl mb-4 text-left font-bold text-neutral-600 dark:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
        >
          {item.title}
        </motion.h3>
        <motion.div
          className="text-sm md:text-base glass-effect dark:glass-effect p-6 rounded-xl border border-white/10 dark:border-white/5 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:border-white/20 dark:hover:border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.7 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          {item.content}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

