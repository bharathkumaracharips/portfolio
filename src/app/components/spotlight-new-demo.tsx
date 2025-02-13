"use client";
import React from "react";
import { Spotlight } from "@/app/components/ui/spotlight-new";
import { LinkPreviewDemo } from "./link-preview-demo";
import IconCloudDemo from "./icon-cloud-demo";
export function SpotlightNewDemo() {
  return (
    <div className="h-fit w-fit rounded-md flex md:items-center md:justify-center bg-inherit antialiased bg-grid-white/[1.02] relative overflow-hidden">
       <div className="absolute top-0 left-0 text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent p-4">
      Skills
      </div>
      <Spotlight />
      {/* Positioning the heading at the top-left with gradient border */}
      <IconCloudDemo />
      <div className="p-4 max-w-7xl h-fit mx-auto relative z-10 w-full pt-20 md:pt-0">
        <LinkPreviewDemo />
      </div>
    </div>
  );
} 


