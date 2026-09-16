"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, ShieldCheck } from "lucide-react";

interface TransactionStatusProps {
  isSigning: boolean;
  isConfirmed: boolean;
  isFailed: boolean;
  messageId: string;
  onReset: () => void;
  onRetry: () => void;
}

const steps = [
  { num: "01", label: "PAYLOAD CREATED" },
  { num: "02", label: "PAYLOAD VALIDATED" },
  { num: "03", label: "MESSAGE SIGNED" },
  { num: "04", label: "MESSAGE BROADCAST" },
  { num: "05", label: "DELIVERY QUEUED" },
];

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  isSigning,
  isConfirmed,
  isFailed,
  messageId,
  onReset,
  onRetry,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isSigning && !isConfirmed && !isFailed) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          return prev;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSigning, isConfirmed, isFailed]);

  // If Confirmed State
  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center text-center gap-6 p-8 sm:p-10 rounded-2xl bg-[#08080c] border border-[#00FF66]/30 shadow-[0_0_50px_rgba(0,255,102,0.1)] animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-[#00FF66]/10 border border-[#00FF66] flex items-center justify-center text-[#00FF66]">
          <CheckCircle2 className="w-8 h-8 animate-in zoom-in-50 duration-300" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-[#00FF66] tracking-widest uppercase">
            PROTOCOL STATUS: CONFIRMED
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-white">
            TRANSACTION CONFIRMED
          </h3>
          <p className="text-sm text-zinc-300 font-light max-w-md leading-relaxed mt-1">
            Your message has entered the communication queue. I&apos;ll review the payload and respond directly to your return endpoint.
          </p>
        </div>

        {/* Message ID & Confirmation Box */}
        <div className="w-full max-w-sm p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-2 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">MESSAGE ID:</span>
            <span className="text-[#00F0FF] font-bold">{messageId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">QUEUE STATUS:</span>
            <span className="text-[#00FF66]">DELIVERY CONFIRMED</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">ENDPOINT:</span>
            <span className="text-zinc-300">BHARATH / INBOX</span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 hover:text-white font-mono text-xs tracking-wider uppercase border border-white/10 hover:border-white/20 transition-all mt-2"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>RETURN TO NETWORK</span>
        </button>
      </div>
    );
  }

  // If Failed State
  if (isFailed) {
    return (
      <div className="flex flex-col items-center text-center gap-6 p-8 sm:p-10 rounded-2xl bg-[#08080c] border border-red-500/30 shadow-[0_0_50px_rgba(255,51,102,0.1)] animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center text-red-500">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-red-400 tracking-widest uppercase">
            PROTOCOL STATUS: FAILED
          </span>
          <h3 className="text-2xl font-bold font-sans text-white">
            TRANSACTION FAILED
          </h3>
          <p className="text-sm text-zinc-400 font-light max-w-md">
            Payload delivery could not be queued at this time. Please retry the transmission or send an email directly.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={onRetry}
            className="px-5 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-mono text-xs uppercase transition-colors"
          >
            RETRY TRANSACTION
          </button>
          <button
            onClick={onReset}
            className="px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-mono text-xs uppercase transition-colors"
          >
            EDIT PAYLOAD
          </button>
        </div>
      </div>
    );
  }

  // Signing & Broadcasting Sequence
  return (
    <div className="flex flex-col gap-6 p-8 sm:p-10 rounded-2xl bg-[#08080c] border border-[#00F0FF]/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
          <span className="text-xs font-mono text-[#00F0FF] font-bold uppercase tracking-wider">
            TRANSMISSION IN PROGRESS
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          STAGE {currentStep + 1} OF {steps.length}
        </span>
      </div>

      {/* Sequential Step Pipeline */}
      <div className="flex flex-col gap-3">
        {steps.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <div
              key={step.num}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 font-mono text-xs ${
                isCurrent
                  ? "bg-[#00F0FF]/10 border-[#00F0FF] text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  : isDone
                  ? "bg-white/[0.02] border-white/5 text-zinc-400"
                  : "bg-transparent border-white/5 text-zinc-600 opacity-40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-bold">STEP {step.num}</span>
                <span className="text-zinc-600">//</span>
                <span className={isCurrent ? "font-bold text-white" : ""}>
                  {step.label}
                </span>
              </div>

              {isDone ? (
                <span className="text-[#00FF66] text-[10px]">✓ COMPLETE</span>
              ) : isCurrent ? (
                <span className="text-[#00F0FF] text-[10px] animate-pulse">
                  ● PROCESSING...
                </span>
              ) : (
                <span className="text-zinc-600 text-[10px]">WAITING</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-xs font-mono text-zinc-500">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00F0FF]" />
        <span>BROADCASTING PAYLOAD THROUGH PROTOCOL GATEWAY</span>
      </div>
    </div>
  );
};
