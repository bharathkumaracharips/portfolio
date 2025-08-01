import { cn } from "@/app/lib/utils"
import { IconMenu2 } from "@tabler/icons-react"
import { AnimatePresence, type MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef, useState } from "react"

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string, target: string }[]
  desktopClassName?: string
  mobileClassName?: string
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  )
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string, target: string }[]
  className?: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div 
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col gap-2"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.15 }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.href}
                  target={item.target}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg text-white hover:bg-black/90 transition-colors"
                >
                  <div className="h-4 w-4 text-gray-300">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setOpen(!open)}
        className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-sm border border-gray-800 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
      >
        <IconMenu2 className="h-5 w-5" />
      </button>
    </div>
  )
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string,target: string }[]
  className?: string
}) => {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  
  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-2 items-center px-4 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-full",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </div>
  )
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  target
}: {
  mouseX: MotionValue
  title: string
  icon: React.ReactNode
  href: string,
  target:string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 56, 40])
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 56, 40])

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 })
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 })

  const [hovered, setHovered] = useState(false)

  return (
    <Link href={href} target={target}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center relative transition-colors duration-200"
      >
        <div className="h-5 w-5 text-gray-300 hover:text-white transition-colors">
          {icon}
        </div>
        
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 4, x: "-50%" }}
              className="absolute left-1/2 -top-8 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  )
}

