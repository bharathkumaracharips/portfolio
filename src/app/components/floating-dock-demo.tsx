import { FloatingDock } from "@/app/components/ui/floating-dock"
import {
  IconHome,
  IconCertificate,
  IconBriefcase,
  IconArticle,
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
      title: "Certificates",
      icon: <IconCertificate className="h-full w-full" />,
      href: "#",
    },
    {
      title: "Projects",
      icon: <IconBriefcase className="h-full w-full" />,
      href: "#",
    },
    {
      title: "Blogs",
      icon: <IconArticle className="h-full w-full" />,
      href: "#",
    },
    {
      title: "Contact",
      icon: <IconMail className="h-full w-full" />,
      href: "#",
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