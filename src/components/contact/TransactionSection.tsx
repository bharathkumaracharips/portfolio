"use client";

import React, { useState } from "react";
import { TransactionHero } from "./TransactionHero";
import { MessageComposer, MessagePayloadData } from "./MessageComposer";
import { TransactionReview } from "./TransactionReview";
import { TransactionStatus } from "./TransactionStatus";
import { ContactNetwork } from "./ContactNetwork";
import {
  CommunicationNodeCanvas,
  NodeProtocolState,
} from "@/components/canvas/CommunicationNodeCanvas";
import { heroData } from "@/data/hero";

export const TransactionSection: React.FC = () => {
  const [protocolState, setProtocolState] = useState<NodeProtocolState>("IDLE");
  const [pendingPayload, setPendingPayload] = useState<MessagePayloadData | null>(
    null
  );
  const [messageId, setMessageId] = useState<string>("");

  // Step 1: User focuses or starts typing
  const handleStartComposing = () => {
    if (protocolState === "IDLE") {
      setProtocolState("COMPOSING");
    }
  };

  // Step 2: Form validated, open transaction review confirmation
  const handleInitiateReview = (data: MessagePayloadData) => {
    setPendingPayload(data);
    setProtocolState("REVIEWING");
  };

  // Step 3: User cancels review
  const handleCancelReview = () => {
    setProtocolState("COMPOSING");
  };

  // Step 4: User clicks SIGN & TRANSMIT
  const handleConfirmSign = () => {
    setProtocolState("SIGNING");

    // Generate unique application Message ID
    const randomHex = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
        .toUpperCase();
    const newMsgId = `MSG-${randomHex()}-${randomHex()}`;
    setMessageId(newMsgId);

    // Simulate protocol broadcast & state transition
    setTimeout(() => {
      setProtocolState("BROADCASTING");
    }, 1200);

    setTimeout(() => {
      setProtocolState("CONFIRMED");

      // Trigger real mailto draft in background if user desires direct email copy
      if (pendingPayload) {
        const mailtoUri = `mailto:${heroData.socials.email}?subject=${encodeURIComponent(
          `[${newMsgId}] ${pendingPayload.transactionType}: ${pendingPayload.subject}`
        )}&body=${encodeURIComponent(
          `From: ${pendingPayload.fromEmail}\nCategory: ${pendingPayload.transactionType}\nMessage ID: ${newMsgId}\n\n${pendingPayload.payload}`
        )}`;
        const link = document.createElement("a");
        link.href = mailtoUri;
        link.target = "_blank";
        link.click();
      }
    }, 2800);
  };

  // Step 5: Reset back to IDLE
  const handleReset = () => {
    setPendingPayload(null);
    setProtocolState("IDLE");
    setMessageId("");
  };

  const isFormActive =
    protocolState === "IDLE" ||
    protocolState === "COMPOSING" ||
    protocolState === "REVIEWING";

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F2] py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 flex flex-col justify-center border-t border-white/[0.05] scroll-mt-14"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-cyan-950/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-emerald-950/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-[1600px] mx-auto w-full flex flex-col gap-6 sm:gap-8">
        {/* Page Hero */}
        <TransactionHero />

        {/* Main Split Grid (Message Composer / Status on Left + 3D Communication Node on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Composer OR Active Status Sequence (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {isFormActive ? (
              <MessageComposer
                onStartComposing={handleStartComposing}
                onInitiateReview={handleInitiateReview}
                disabled={protocolState === "REVIEWING"}
              />
            ) : (
              <TransactionStatus
                isSigning={
                  protocolState === "SIGNING" || protocolState === "BROADCASTING"
                }
                isConfirmed={protocolState === "CONFIRMED"}
                isFailed={protocolState === "FAILED"}
                messageId={messageId}
                onReset={handleReset}
                onRetry={handleConfirmSign}
              />
            )}
          </div>

          {/* Right Column: 3D Computational Communication Node (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <CommunicationNodeCanvas protocolState={protocolState} />
          </div>
        </div>

        {/* Transaction Review Confirmation Modal Overlay */}
        {protocolState === "REVIEWING" && pendingPayload && (
          <TransactionReview
            payloadData={pendingPayload}
            onCancel={handleCancelReview}
            onConfirmSign={handleConfirmSign}
          />
        )}

        {/* Minimal Direct Communication Network Footer */}
        <ContactNetwork />
      </div>
    </section>
  );
};
