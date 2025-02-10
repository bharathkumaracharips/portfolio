"use client";
import React from "react";
import { Spotlight } from "@/app/components/ui/spotlight-new";
import { LinkPreviewDemo } from "./link-preview-demo";
import IconCloudDemo from "./icon-cloud-demo";
export function SpotlightNewDemo() {
  return (
    <div className="h-[90rem] w-xxl rounded-md flex md:items-center md:justify-center bg-black/[2.96] antialiased bg-grid-white/[1.02] relative overflow-hidden">
      <Spotlight />
      <IconCloudDemo/>
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <LinkPreviewDemo/>
      </div>
    </div>
  );
}
