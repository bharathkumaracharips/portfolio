"use client";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/app/components/ui/glowing-effect";
import { LinkPreview } from "@/app/components/ui/link-preview";

export function LinkPreviewDemo() {
  return (
    <ul className="grid w-fit h-fit grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 custom:grid-cols-3 xl:grid-cols-4 xl:grid-rows-3">
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://www.cprogramming.com/" className="font-bold">C</LinkPreview>}
        description="Programming language for system development."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://isocpp.org/" className="font-bold">C++</LinkPreview>}
        description="Popular language for competitive programming and game development."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://soliditylang.org/" className="font-bold">Solidity</LinkPreview>}
        description="Smart contract programming language for Ethereum."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://www.rust-lang.org/" className="font-bold">Rust</LinkPreview>}
        description="Memory-safe, high-performance programming language."
      />
       <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://polkadot.network/" className="font-bold">Polkadot</LinkPreview>}
        description="Blockchain interoperability platform."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://github.com/" className="font-bold">Git/Github</LinkPreview>}
        description="A platform for version control and collaboration on software development projects."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://www.ieee.org/" className="font-bold">Data Structures and Algorithms</LinkPreview>}
        description="Fundamentals of organizing and processing data efficiently, key to computer science."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://bitcoin.org/en/" className="font-bold">Block Chain Technology</LinkPreview>}
        description="A decentralized digital ledger system revolutionizing industries with secure and transparent transactions."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://cve.mitre.org/" className="font-bold">Ethical Hacking</LinkPreview>}
        description="The practice of testing and securing systems by identifying vulnerabilities in an ethical manner."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://www.icann.org/" className="font-bold">Networking</LinkPreview>}
        description="Connecting computers and devices to share resources and communicate within local or global networks."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://www.w3.org/" className="font-bold">Web Development</LinkPreview>}
        description="Creating, designing, and maintaining websites and web applications using various programming technologies."
      />
      <GridItem
        area="sm:[grid-area:auto] md:[grid-area:auto] custom:[grid-area:auto] xl:[grid-area:1/1/2/2]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://www.mysql.com/" className="font-bold">DBMS</LinkPreview>}
        description="A system for managing databases, storing, retrieving, and manipulating data effectively."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

const GridItem = ({  icon, title, description }: GridItemProps) => {
  return (
    <li className={`list-none h-full md:h-auto`}>
      <div className="relative h-full rounded-1.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.0}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-2.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-2 border-gray-600 p-1">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-black dark:text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};