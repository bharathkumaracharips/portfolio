"use client"

import { cn } from "@/app/lib/utils"
import type React from "react"
import { createContext, useState, useContext, useRef, useEffect, useCallback, useMemo } from "react"

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined)

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)
  const animationFrameRef = useRef<number>()

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left - width / 2) / 30 // Reduced sensitivity for smoother effect
      const y = (e.clientY - top - height / 2) / 30
      containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsMouseEntered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const contextValue = useMemo(() => [isMouseEntered, setIsMouseEntered] as const, [isMouseEntered])

  return (
    <MouseEnterContext.Provider value={contextValue}>
      <div
        className={cn("py-8 sm:py-12 md:py-16 flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center relative transition-all duration-300 ease-out will-change-transform", className)}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] w-full h-full", className)}>
      {children}
    </div>
  )
}

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMouseEntered] = useMouseEnter()
  const animationFrameRef = useRef<number>()

  // Memoize transform values for better performance
  const transforms = useMemo(() => ({
    active: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
    inactive: `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
  }), [translateX, translateY, translateZ, rotateX, rotateY, rotateZ])

  // Optimized animation handler with RAF
  const handleAnimations = useCallback(() => {
    if (!ref.current) return
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (!ref.current) return
      ref.current.style.transform = isMouseEntered ? transforms.active : transforms.inactive
    })
  }, [isMouseEntered, transforms])

  useEffect(() => {
    handleAnimations()
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleAnimations])

  return (
    <Tag 
      ref={ref} 
      className={cn("w-fit transition-transform duration-300 ease-out will-change-transform", className)} 
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider")
  }
  return context
}
