"use client";

import React from "react";
import { MessagePayloadData } from "./MessageComposer";
import { CheckCircle2, ShieldCheck, X, ArrowRight } from "lucide-react";

interface TransactionReviewProps {
  payloadData: MessagePayloadData;
  onCancel: () => void;
  onConfirmSign: () => void;
}

export const TransactionReview: React.FC<TransactionReviewProps> = ({
  payloadData,
  onCancel,
  onConfirmSign,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0a0a0f] border border-white/15 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold font-mono tracking-tight text-white">
              CREATE MESSAGE TRANSACTION
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Transaction Summary Table */}
        <div className="flex flex-col divide-y divide-white/5 text-xs font-mono">
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-zinc-500">TRANSACTION TYPE</span>
            <span className="text-zinc-200 font-semibold">MESSAGE / INQUIRY</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-zinc-500">CATEGORY</span>
            <span className="text-[#00F0FF]">{payloadData.transactionType}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-zinc-500">FROM [RETURN ENDPOINT]</span>
            <span className="text-zinc-200 truncate max-w-[200px]">
              {payloadData.fromEmail}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-zinc-500">TO [RECEIVER]</span>
            <span className="text-zinc-200">BHARATH / CONTACT ENDPOINT</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-zinc-500">PAYLOAD SIZE</span>
            <span className="text-zinc-300">
              1 MESSAGE ({payloadData.payload.length} BYTES)
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-zinc-500">NETWORK FEE</span>
            <span className="text-[#00FF66]">0.00</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-zinc-500">PROCESSING FEE</span>
            <span className="text-[#00FF66]">NONE</span>
          </div>

          <div className="py-3 flex items-center justify-between font-bold text-sm bg-white/[0.02] px-2 rounded mt-2">
            <span className="text-white">TOTAL CHARGE</span>
            <span className="text-[#00FF66]">NO PAYMENT REQUIRED</span>
          </div>
        </div>

        {/* Transparent Notice Banner */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
            No blockchain transaction is required. This interface uses a transaction-inspired flow for direct message submission.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-5 py-3 rounded-lg text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirmSign}
            className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs font-mono tracking-wider uppercase hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <span>SIGN &amp; TRANSMIT</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
