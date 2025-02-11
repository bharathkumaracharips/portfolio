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
    <div className="relative flex w-full max-w-xs items-center justify-center bg-[#0c0c0c] overflow-hidden rounded-lg bg-black/[2.96] antialiased bg-grid-white/[1.02] border border-white">
      <IconCloud images={images} />
    </div>
  )
}

