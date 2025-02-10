"use client";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/app/components/ui/glowing-effect";
import { LinkPreview } from "@/app/components/ui/link-preview";
export function LinkPreviewDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://www.cprogramming.com/" className="font-bold">C</LinkPreview>}
        description="Programming language for system development."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://framer.com/motion" className="font-bold">C++</LinkPreview>}
        description="Popular language for competitive programming and game development."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://soliditylang.org/" className="font-bold">Solidity</LinkPreview>}
        description="Smart contract programming language for Ethereum."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://www.rust-lang.org/" className="font-bold">Rust</LinkPreview>}
        description="Memory-safe, high-performance programming language."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title={<LinkPreview url="https://polkadot.network/" className="font-bold">Polkadot</LinkPreview>}
        description="Blockchain interoperability platform."
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

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
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

