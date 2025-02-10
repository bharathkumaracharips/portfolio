import { FloatingDock } from "@/app/components/ui/floating-dock"
import {
  IconHome,
  IconCertificate,
  IconBriefcase,
  IconClockHour5,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBulb,
} from "@tabler/icons-react"

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full" />,
      href: "#Home",
    },
    {
      title: "Skills",
      icon: <IconBulb className="h-full w-full" />,
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
      href: "https://www.linkedin.com/in/ps-bharath-kumar/",
      target: "_blank",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: "https://github.com/bharathkumaracharips",
      target: "_blank",
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