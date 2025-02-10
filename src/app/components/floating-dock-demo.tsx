import { FloatingDock } from "@/app/components/ui/floating-dock"
import {
  IconHome,
  IconCertificate,
  IconBriefcase,
  IconArticle,
  IconClockHour5,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react"

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full" />,
      href: "#",
    },
    {
      title: "Skills",
      icon: <IconCertificate className="h-full w-full" />,
      href: "#Skills",
    },
    {
      title: "Projects",
      icon: <IconBriefcase className="h-full w-full" />,
      href: "#Projects",
    },
    {
      title: "Timeline",
      icon: <IconClockHour5 className="h-full w-full" />,
      href: "#Timeline",
    },
    {
      title: "Certificates",
      icon: <IconCertificate className="h-full w-full" />,
      href: "#Certificates",
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full" />,
      href: "#Contact",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full" />,
      href: "#",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: "#",
    },
  ]

  return (
    <div className="relative min-h-screen">
      <FloatingDock 
        items={links} 
        desktopClassName="fixed bottom-0 left-1/2 -translate-x-1/2 z-250"
        mobileClassName="fixed bottom-0 left-1/2 -translate-x-1/2 z-250"
      />
    </div>
  )
}