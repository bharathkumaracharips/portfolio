"use client";

import React, { useState } from "react";
import { servicesData, ServiceItem } from "@/data/services";
import { ServicesHero } from "./ServicesHero";
import { ServiceModeToggle } from "./ServiceModeToggle";
import { ServiceCatalog } from "./ServiceCatalog";
import { ServiceInspector } from "./ServiceInspector";
import { CurriculumDirectory } from "./CurriculumDirectory";
import { ProjectIntakeModal } from "./ProjectIntakeModal";

export const ServicesSection: React.FC = () => {
  const [curriculumModalOpen, setCurriculumModalOpen] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [intakeModalOpen, setIntakeModalOpen] = useState<boolean>(false);
  const [intakeServiceId, setIntakeServiceId] = useState<string>("srv-protocol-engineering");
  const [intakeEngagementType, setIntakeEngagementType] = useState<"ARCHITECTURE" | "BUILD" | "OPTIMIZE">("BUILD");

  const activeService: ServiceItem =
    servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];

  const handleOpenIntake = (
    serviceId: string,
    engagementType: "ARCHITECTURE" | "BUILD" | "OPTIMIZE" = "BUILD"
  ) => {
    setIntakeServiceId(serviceId);
    setIntakeEngagementType(engagementType);
    setIntakeModalOpen(true);
  };

  const handleOpenCurriculum = (courseId?: string) => {
    setSelectedCourseId(courseId || null);
    setCurriculumModalOpen(true);
  };

  return (
    <section
      id="services"
      className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2] py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-14 flex flex-col justify-center border-t border-white/[0.05] scroll-mt-14"
    >
      {/* Background Ambient Field */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-cyan-950/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-12 right-12 w-[550px] h-[320px] bg-emerald-950/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1600px] mx-auto w-full flex flex-col gap-8 sm:gap-10">
        {/* Hero Section */}
        <ServicesHero />

        {/* Mode Toggle: Engineering Services vs Systems Curricula */}
        <ServiceModeToggle
          activeMode={curriculumModalOpen ? "CURRICULUM" : "SERVICES"}
          onModeChange={(mode) => {
            if (mode === "CURRICULUM") {
              handleOpenCurriculum();
            } else {
              setCurriculumModalOpen(false);
            }
          }}
        />

        {/* The 6-Card Services Marketplace Catalog - Always Mounted */}
        <ServiceCatalog
          onExploreService={(id) => setSelectedServiceId(id)}
          onStartProject={(id) => handleOpenIntake(id, "BUILD")}
          onSwitchToCurriculum={() => handleOpenCurriculum()}
        />

        {/* Full-Screen Detailed Service Inspector Box */}
        <ServiceInspector
          isOpen={selectedServiceId !== null}
          service={activeService}
          onClose={() => setSelectedServiceId(null)}
          onSelectService={(id) => setSelectedServiceId(id)}
          onSelectEngagementModel={(type) => handleOpenIntake(activeService.id, type)}
          onStartProject={() => handleOpenIntake(activeService.id, "BUILD")}
        />

        {/* Full-Screen Systems Curricula & Mentorship Overlay Box */}
        <CurriculumDirectory
          isOpen={curriculumModalOpen}
          onClose={() => setCurriculumModalOpen(false)}
          selectedCourseId={selectedCourseId}
          onSelectCourse={(id) => setSelectedCourseId(id)}
        />
      </div>

      {/* Dynamic Project Intake Form Modal */}
      <ProjectIntakeModal
        isOpen={intakeModalOpen}
        onClose={() => setIntakeModalOpen(false)}
        initialServiceId={intakeServiceId}
        initialEngagementType={intakeEngagementType}
      />
    </section>
  );
};
