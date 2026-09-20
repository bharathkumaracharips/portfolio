"use client";

import React, { useState } from "react";
import { StartProjectHero } from "./StartProjectHero";
import { ProjectInquiryForm } from "./ProjectInquiryForm";
import { EngineeringPipeline, PipelineCategory } from "./EngineeringPipeline";
import { OtherWaysToConnect } from "./OtherWaysToConnect";

export const StartProjectSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PipelineCategory>("PROTOCOL");
  const [hasInputContent, setHasInputContent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section
      id="contact"
      className="relative w-full bg-[#08080c] text-white py-16 sm:py-20 lg:py-28 px-6 sm:px-10 lg:px-14 border-t border-white/[0.06] scroll-mt-14"
      aria-label="Start a Project - Direct Inquiry and Engineering Architecture"
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-10 sm:gap-12">
        {/* 1. Hero Header */}
        <StartProjectHero />

        {/* 2. Main Two-Column Layout: Form + Interactive Engineering Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Form */}
          <div className="lg:col-span-6 flex flex-col">
            <ProjectInquiryForm
              onCategoryChange={setActiveCategory}
              onInputChange={setHasInputContent}
              onSubmittingChange={setIsSubmitting}
            />
          </div>

          {/* Right Column: Engineering Pipeline Diagram */}
          <div className="lg:col-span-6 flex flex-col">
            <EngineeringPipeline
              activeCategory={activeCategory}
              hasInputContent={hasInputContent}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        {/* 3. Understated Direct Platform Links */}
        <OtherWaysToConnect />
      </div>
    </section>
  );
};
