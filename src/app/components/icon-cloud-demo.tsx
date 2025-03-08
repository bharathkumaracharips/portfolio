import { IconCloud } from "@/app/components/ui/icon-cloud"

const slugs = [
  "c",
  "c++",
  "solidity",
  "javascript",
  "css",
  "react",
  "typescript",
  "rust",
  "tailwindcss",
  "git",
  "linux",
  "mongodb",
  "polkadot",
  "metasploit",
  "burpsuite",
  "wireshark",
  "kalilinux", 
  "ubuntu",
]

export default function IconCloudDemo() {
  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)

  return (
    <div className="relative flex h-fit w-full max-w-[280px] sm:max-w-xs mt-16 sm:mt-24 md:mt-32 lg:mt-48 items-center justify-center bg-inherit overflow-hidden rounded-lg bg-black/[2.96] antialiased bg-grid-white/[1.02] border border-white">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#ffffff] opacity-20 pointer-events-none"></div>
      <IconCloud images={images} />
    </div>
  )
}
