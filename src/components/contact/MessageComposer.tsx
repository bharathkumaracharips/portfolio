"use client";

import React, { useState } from "react";
import { Send, AlertTriangle, ArrowRight } from "lucide-react";

export interface MessagePayloadData {
  fromEmail: string;
  subject: string;
  transactionType: string;
  payload: string;
}

interface MessageComposerProps {
  onStartComposing: () => void;
  onInitiateReview: (data: MessagePayloadData) => void;
  disabled?: boolean;
}

const transactionTypes = [
  "Protocol Engineering",
  "Smart Contract & DApp Engineering",
  "Blockchain Infrastructure & Backend",
  "Protocol Auditing & Gas Optimization",
  "Technical Education & Mentorship",
  "General Architecture & Consulting",
];

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onStartComposing,
  onInitiateReview,
  disabled = false,
}) => {
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [transactionType, setTransactionType] = useState(transactionTypes[0]);
  const [payload, setPayload] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFieldFocus = () => {
    onStartComposing();
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Protocol-Style Validation
    if (!fromEmail.trim() || !fromEmail.includes("@") || !fromEmail.includes(".")) {
      setErrorMsg("RETURN ENDPOINT REQUIRED (PLEASE ENTER A VALID EMAIL)");
      return;
    }

    if (!subject.trim()) {
      setErrorMsg("PAYLOAD SUBJECT IDENTIFIER REQUIRED");
      return;
    }

    if (!payload.trim() || payload.trim().length < 10) {
      setErrorMsg("MESSAGE PAYLOAD CANNOT BE EMPTY (MIN 10 CHARACTERS)");
      return;
    }

    setErrorMsg(null);
    onInitiateReview({
      fromEmail: fromEmail.trim(),
      subject: subject.trim(),
      transactionType,
      payload: payload.trim(),
    });
  };

  return (
    <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-2xl bg-[#08080c] border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#00F0FF] uppercase">
            PAYLOAD COMPOSER //
          </span>
          <span className="text-xs font-mono text-zinc-300 font-semibold">
            NEW MESSAGE
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span>INBOX ACTIVE</span>
        </div>
      </div>

      {/* Protocol Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* 2-Column Grid: FROM & SUBJECT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Field: FROM */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="from-email"
              className="text-[11px] font-mono text-zinc-400 tracking-wider flex items-center justify-between"
            >
              <span>FROM [RETURN ENDPOINT]</span>
              <span className="text-[10px] text-zinc-600">REQ</span>
            </label>
            <input
              id="from-email"
              type="email"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              onFocus={handleFieldFocus}
              disabled={disabled}
              placeholder="your-email@domain.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/10 focus:border-[#00F0FF] text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 font-mono outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            />
          </div>

          {/* Field: SUBJECT */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="subject"
              className="text-[11px] font-mono text-zinc-400 tracking-wider flex items-center justify-between"
            >
              <span>SUBJECT [OBJECTIVE]</span>
              <span className="text-[10px] text-zinc-600">REQ</span>
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onFocus={handleFieldFocus}
              disabled={disabled}
              placeholder="e.g. Sovereign Layer-1 Pallet Architecture"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/10 focus:border-[#00F0FF] text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 font-mono outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            />
          </div>
        </div>

        {/* Field: TRANSACTION TYPE */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="tx-type"
            className="text-[11px] font-mono text-zinc-400 tracking-wider flex items-center justify-between"
          >
            <span>TRANSACTION TYPE [CATEGORY]</span>
            <span className="text-[10px] text-[#00F0FF]">ROUTED</span>
          </label>
          <select
            id="tx-type"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            onFocus={handleFieldFocus}
            disabled={disabled}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0e14] border border-white/10 focus:border-[#00F0FF] text-xs sm:text-sm text-zinc-200 font-mono outline-none transition-all cursor-pointer"
          >
            {transactionTypes.map((t) => (
              <option key={t} value={t} className="bg-[#0e0e14] text-zinc-200">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Field: PAYLOAD */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="payload"
            className="text-[11px] font-mono text-zinc-400 tracking-wider flex items-center justify-between"
          >
            <span>PAYLOAD [SPECIFICATIONS & SCOPE]</span>
            <span className="text-[10px] text-zinc-600">BODY</span>
          </label>
          <textarea
            id="payload"
            rows={3}
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            onFocus={handleFieldFocus}
            disabled={disabled}
            placeholder="Describe what you are building, the constraints, timeline, or technical protocol challenge..."
            className="w-full p-3.5 rounded-lg bg-white/[0.02] border border-white/10 focus:border-[#00F0FF] text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 font-mono outline-none transition-all resize-none shadow-inner focus:shadow-[0_0_15px_rgba(0,240,255,0.15)] leading-relaxed"
          />
        </div>

        {/* Inline Protocol Rejection Alert */}
        {errorMsg && (
          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-red-950/30 border border-red-500/40 text-red-300 text-xs font-mono animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-red-400">PAYLOAD REJECTED:</span>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Technical Telemetry Metadata Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px] font-mono text-zinc-500">
          <div className="p-1.5 rounded bg-white/[0.02] border border-white/5 flex flex-col">
            <span className="text-zinc-600">MESSAGE ID</span>
            <span className="text-zinc-300">AUTO-GEN</span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.02] border border-white/5 flex flex-col">
            <span className="text-zinc-600">PAYLOAD</span>
            <span className={payload.length > 0 ? "text-[#00FF66]" : "text-zinc-400"}>
              {payload.length > 0 ? `${payload.length} BYTES` : "STANDBY"}
            </span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.02] border border-white/5 flex flex-col">
            <span className="text-zinc-600">ROUTE</span>
            <span className="text-zinc-300">DIRECT</span>
          </div>
          <div className="p-1.5 rounded bg-white/[0.02] border border-white/5 flex flex-col">
            <span className="text-zinc-600">NETWORK</span>
            <span className="text-[#00F0FF]">ONLINE</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={disabled}
          className="group relative flex items-center justify-center gap-2.5 w-full py-3.5 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs tracking-wider uppercase hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] disabled:opacity-50 disabled:pointer-events-none mt-1"
        >
          <Send className="w-3.5 h-3.5" />
          <span>SIGN &amp; BROADCAST</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </div>
  );
};
