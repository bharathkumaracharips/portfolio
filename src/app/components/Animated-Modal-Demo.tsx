"use client"

import { useState } from "react";
import { LayersIcon } from "lucide-react";
import { IconFileCv, IconDownload, IconExternalLink } from '@tabler/icons-react';

export default function AnimatedModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  const handleHireNowClick = () => {
    setIsModalOpen(false);
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
  };

  const isMobileDevice = () => {
    if (typeof window !== 'undefined') {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return false;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Modal Trigger Button with Hover Effect */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative bg-white/10 backdrop-blur-sm dark:bg-black/10 text-black dark:text-white flex items-center justify-center group/modal-btn p-3 rounded-lg 
        border-2 border-transparent hover:border-blue-500/50 dark:hover:border-purple-500/50
        shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:shadow-[0_0_15px_rgba(168,85,247,0.1)] dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
        transition-all duration-300 overflow-hidden w-[160px]
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700"
      >
        <span className="relative z-10 group-hover/modal-btn:translate-x-[140%] text-center transition-all duration-500 font-medium">
          Resume Is Here 🙋‍♂️
        </span>
        <div className="absolute inset-0 flex items-center justify-center -translate-x-[140%] group-hover/modal-btn:translate-x-0 transition-all duration-500">
          <IconFileCv className="w-5 h-5" stroke={1.5} />
        </div>
      </button>

      {/* Modal Overlay with Blur Effect */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 sm:p-6 md:p-8">
          {/* Modal Container */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden relative animate-in fade-in zoom-in duration-300 mt-auto mb-20">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-neutral-800">
              <h4 className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-100 font-bold text-center">
                Had a{" "}
                <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 mx-1">
                  JOB OFFER
                </span>{" "}
                Click Me 💼
              </h4>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="w-full h-[50vh] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] relative">
                {isMobileDevice() ? (
                  // Mobile Fallback View
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-100 dark:border-neutral-700 p-6">
                    <IconFileCv className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                      For the best experience on mobile devices, please download the resume or view it in a new tab.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="/resume/ps_bharath_kumar_achari.pdf"
                        download
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <IconDownload className="w-4 h-4" />
                        <span>Download Resume</span>
                      </a>
                      <a
                        href="/resume/ps_bharath_kumar_achari.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
                      >
                        <IconExternalLink className="w-4 h-4" />
                        <span>Open in New Tab</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  // Desktop PDF Viewer
                  <>
                    {isPdfLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-neutral-800">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                      </div>
                    )}
                    <object
                      data="/resume/ps_bharath_kumar_achari.pdf"
                      type="application/pdf"
                      className="w-full h-full rounded-lg border border-gray-100 dark:border-neutral-800"
                      onLoad={handlePdfLoad}
                    >
                      <p className="text-center py-4">
                        Unable to display PDF.{" "}
                        <a href="/resume/ps_bharath_kumar_achari.pdf" download className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline">
                          Download instead
                        </a>
                      </p>
                    </object>
                  </>
                )}
              </div>

              {/* Skills Section */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                <SkillBadge icon="🧠" text="Problem-Solving" />
                <SkillBadge icon="💬" text="Communication" />
                <SkillBadge icon="💪" text="Leadership" />
                <SkillBadge icon="📚" text="Cross-Disciplinary" />
                <SkillBadge icon="⏰" text="Punctuality" />
                <SkillBadge icon="📖" text="Continuous Learning" />
                <SkillBadge icon="❤️" text="Customer Focus" />
                <SkillBadge icon="🎯" text="Goal-Oriented" />
              </div>
            </div>

            {/* Modal Footer - Adjusted for better mobile access */}
            <div className="sticky bottom-0 p-4 sm:p-6 border-t border-gray-100 dark:border-neutral-800 flex flex-wrap justify-end gap-3 bg-gray-50 dark:bg-neutral-950">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-none px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-800 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <a
                href="/resume/ps_bharath_kumar_achari.pdf"
                download
                className="flex-none px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors duration-200"
              >
                Download ⬇️
              </a>
              <a href="#Contact" className="flex-none">
                <button
                  onClick={handleHireNowClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                >
                  Hire Now 💼
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Skill Badge Component
function SkillBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 hover:border-gray-200 dark:hover:border-neutral-600 transition-colors duration-200">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{text}</span>
    </div>
  );
}

