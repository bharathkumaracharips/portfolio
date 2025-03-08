
"use client"

import { useState } from "react";
import { LayersIcon } from "lucide-react";
import { IconFileCv } from '@tabler/icons-react';

export default function AnimatedModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleHireNowClick = () => {
    setIsModalOpen(false); // Close the modal
    // Navigation to the contact form will happen via the link
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Modal Trigger */}
      <button
        onClick={() => setIsModalOpen(true)} // Open the modal
        className="relative bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn p-2 rounded-md border border-gray-300 overflow-hidden"
      >
        <span className="relative z-10 group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          Resume Is Here 🙋‍♂️
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          <IconFileCv stroke={1} color="black" />
        </div>
      </button>
      {/* "bg-white dark:bg-neutral-900 */}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-[1000] mb-[100px] w-full h-screen">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg max-w-3xl  w-full h-screen fixed">
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Had a 
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                JOB OFFER
              </span>{" "}
              Click Me 💼
            </h4>
            <div className="flex justify-center items-center">
              <div className="w-full h-[600px] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
                <object
                  data="/resume/ps_bharath_kumar_achari.pdf"
                  type="application/pdf"
                  className="w-full h-full rounded-lg"
                >
                  <p>It appears your browser doesn&apos;st support PDFs.
                    <a href="/pdf.pdf" download className="text-blue-500 hover:underline">Download the PDF</a> instead.
                  </p>
                </object>
              </div>
            </div>
            <div className="pt-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-center w-full mx-auto">
              <div className="flex items-center justify-center">
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">🧠Problem-Solving</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">💬Communication</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">💪Leadership</span>
              </div>
              <div className="flex items-center justify-center">
                <LayersIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">Cross-Disciplinary Skills</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">⏰Punctuality</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">📚📖Continuous Learning Mindset</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">❤️Customer Focus</span>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
              >
                Cancel
              </button>
              <a
                href="/resume/ps_bharath_kumar_achari.pdf"
                download
                className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28 text-center"
              >
                Download ⬇️
              </a>
              <a href="#Contact">
                <button
                  onClick={handleHireNowClick} // Close modal and navigate
                  className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
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

