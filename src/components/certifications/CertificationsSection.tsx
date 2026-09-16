"use client";

import React, { useState } from "react";
import { certificationsData, Certification } from "@/data/certifications";
import { CertificationsHero } from "./CertificationsHero";
import { CertificationFilters } from "./CertificationFilters";
import { RadialScrollGallery } from "@/components/ui/portfolio-and-image-gallery";
import { CertificationDetailView } from "./CertificationDetailView";
import { CertificationDocumentViewer } from "./CertificationDocumentViewer";

export const CertificationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeViewerCert, setActiveViewerCert] = useState<Certification | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);

  // Filter certifications based on selected category
  const filteredCerts =
    selectedCategory === "ALL"
      ? certificationsData
      : certificationsData.filter((c) => c.category === selectedCategory);

  const handleSelectCert = (cert: Certification) => {
    setSelectedCert(cert);
  };

  const handleReturnToArchive = () => {
    setSelectedCert(null);
  };

  const handleOpenDocumentViewer = (cert: Certification) => {
    setActiveViewerCert(cert);
    setIsViewerOpen(true);
  };

  return (
    <section
      id="certifications"
      className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 flex flex-col justify-center border-t border-white/[0.05] scroll-mt-14"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-cyan-950/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-16 right-10 w-[550px] h-[300px] bg-emerald-950/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1600px] mx-auto w-full flex flex-col gap-6 sm:gap-8">
        {/* 1. Hero */}
        <CertificationsHero />

        {/* 2. Category Filters */}
        <CertificationFilters
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedCert(null);
          }}
        />

        {/* 3. Main Radial Archive OR Detail View */}
        <div className="w-full">
          {selectedCert ? (
            <CertificationDetailView
              cert={selectedCert}
              onReturnToArchive={handleReturnToArchive}
              onOpenDocumentViewer={handleOpenDocumentViewer}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-2">
                <span>RADIAL ATTESTATION CAROUSEL</span>
                <span className="text-[#00F0FF]">CLICK TO RETRIEVE SPECIFICATION</span>
              </div>
              <RadialScrollGallery
                items={filteredCerts}
                selectedId={null}
                onSelect={handleSelectCert}
              />
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Document Viewer Lightbox */}
      <CertificationDocumentViewer
        cert={activeViewerCert}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </section>
  );
};
