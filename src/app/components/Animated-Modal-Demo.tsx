"use client"

import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/app/components/ui/Animated-Modal";
import Image from "next/image";
import resume from "@/app/components/media/resume.png";
import { LayersIcon } from "lucide-react";

export default function AnimatedModalDemo() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Modal>
        <ModalTrigger className="relative bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn p-2 rounded-md border border-gray-300 overflow-hidden">
          <span className="relative z-10 group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Resume Is Here 🙋‍♂️
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            📜
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Want To Offer A 
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                JOB
              </span>{" "}
              Click Me 💼
            </h4>
            <div className="flex justify-center items-center">
              <div className="rounded-xl mt-4 p-2 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden relative">
                <div className="rounded-lg h-40 w-40 md:h-60 md:w-60 overflow-hidden flex items-center justify-center relative z-10">
                  <Image
                    src={resume}
                    alt="resume"
                    width={700}
                    height={700}
                    className="rounded-lg w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
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
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Hire Now 💼
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
