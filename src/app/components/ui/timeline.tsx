"use client"
import { useScroll, useTransform, motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

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
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 0.8])

  return (
    <div className="w-full font-sans px-4 md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto h-fit md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 text-black dark:text-white max-w-4xl font-bold">My Journey</h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-xl">
          I&apos;ve been diligently working on developing my skills over the past four years. Here is a timeline of my journey throughout my B.Tech program.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 mt-8 md:mt-12">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-8 md:pt-24 lg:pt-32 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center md:top-32 lg:top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 md:h-10 absolute left-3 md:left-3 w-8 md:w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-3 md:h-4 w-3 md:w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
              </div>
              <h3 className="hidden md:block text-xl md:text-3xl lg:text-4xl md:pl-20 font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 md:pl-20 pr-4 md:pr-8 w-full">
              <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              <div className="text-sm md:text-base">{item.content}</div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-7 md:left-8 top-0 w-[2px] bg-neutral-200 dark:bg-neutral-700"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-blue-500/80 via-purple-500/60 to-purple-500/40"
          />
        </div>
      </div>
    </div>
  )
}

