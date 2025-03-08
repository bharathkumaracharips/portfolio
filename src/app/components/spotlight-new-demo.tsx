"use client";
import React from "react";
import { Spotlight } from "@/app/components/ui/spotlight-new";
import { LinkPreviewDemo } from "./link-preview-demo";
import IconCloudDemo from "./icon-cloud-demo";

export function SpotlightNewDemo() {
  return (
    <section id="Skills" className="min-h-[600px] w-full rounded-md bg-inherit antialiased bg-grid-white/[1.02] relative overflow-hidden">
      {/* Header Section */}
      <div className="sticky top-0 z-[60] w-full bg-white/10 backdrop-blur-sm border-b border-gray-200/10 dark:border-gray-800/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Skills
          </h2>
          {/* Mobile Navigation */}
          <nav className="md:hidden">
            <ul className="flex space-x-4 text-sm">
              <li>
                <a href="#IconCloud" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#Preview" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Details
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative w-full px-4 sm:px-6 py-8">
        <Spotlight 
          translateY={0}
          width={1200}
          height={400}
          smallWidth={200}
          duration={10}
          xOffset={100}
        />
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Icon Cloud Section */}
            <div id="IconCloud" className="col-span-1 md:col-span-1 lg:col-span-1 scroll-mt-20">
              <div className="sticky top-20">
                <IconCloudDemo />
              </div>
            </div>
            
            {/* Link Preview Section */}
            <div id="Preview" className="col-span-1 md:col-span-1 lg:col-span-2 scroll-mt-20">
              <LinkPreviewDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 


