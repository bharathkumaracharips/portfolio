"use client";

import React from "react";
import { ExperienceChapterItem } from "@/data/experience";
import { CaeruleanL1Artifact } from "./artifacts/CaeruleanL1Artifact";
import { CaeruleanConsensusArtifact } from "./artifacts/CaeruleanConsensusArtifact";
import { OneDevTeachingArtifact } from "./artifacts/OneDevTeachingArtifact";
import { DroneProtocolArtifact } from "./artifacts/DroneProtocolArtifact";
import { HealthcareWatchArtifact } from "./artifacts/HealthcareWatchArtifact";

interface ExperienceArtifactProps {
  artifactId: ExperienceChapterItem["artifactId"];
}

export const ExperienceArtifact: React.FC<ExperienceArtifactProps> = ({
  artifactId,
}) => {
  switch (artifactId) {
    case "caerulean-l1":
      return <CaeruleanL1Artifact />;
    case "caerulean-consensus":
      return <CaeruleanConsensusArtifact />;
    case "onedev-teaching":
      return <OneDevTeachingArtifact />;
    case "drone-protocol":
      return <DroneProtocolArtifact />;
    case "healthcare-watch":
      return <HealthcareWatchArtifact />;
    default:
      return null;
  }
};
