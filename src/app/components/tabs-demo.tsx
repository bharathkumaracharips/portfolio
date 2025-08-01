"use client"

import { Tabs } from "@/app/components/ui/tabs"
import { useState, useRef, useEffect } from 'react';

export function TabsDemo() {
  const [showAbstract, setShowAbstract] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (currentTime >= 3 && !showAbstract) {
      setShowAbstract(true);
    }
  }, [currentTime, showAbstract]);

  const tabs = [
    {
      title: "Block Stamp",
      value: "Block Stamp",
      content: (
        <div className="flex flex-col md:flex-row w-full relative min-h-[24rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-2 sm:p-6 md:p-10 text-sm sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <div className="flex-1 flex flex-col items-center justify-center pr-0 md:pr-5 mb-5 md:mb-0">
            <p className="mb-2 sm:mb-4 text-center">Block Stamp</p>
            <div className="relative w-full flex items-center justify-center flex-grow">
              <video
                ref={videoRef}
                className="w-full h-full rounded-lg object-contain"
                controls
                controlsList="nodownload"
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={"/project_videos/Block-Stamp.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {showAbstract && (
            <div className="flex-1 flex flex-col items-center justify-center pl-0 md:pl-5">
              <p className="text-center">Block Stamp Abstract</p>
              <p className="text-sm sm:text-base font-normal mt-2">This is a placeholder for the Block Stamp project abstract. It will appear after watching the video for 3 seconds.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Block Meet",
      value: "Block Meet",
      content: (
        <div className="flex flex-col md:flex-row w-full relative min-h-[24rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-2 sm:p-6 md:p-10 text-sm sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <div className="flex-1 flex flex-col items-center justify-center pr-0 md:pr-5 mb-5 md:mb-0">
            <p className="mb-2 sm:mb-4 text-center">Block Meet</p>
            <div className="relative w-full flex items-center justify-center flex-grow">
              <video
                ref={videoRef}
                className="w-full h-full rounded-lg object-contain"
                controls
                controlsList="nodownload"
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={"/project_videos/Block-Meet.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {showAbstract && (
            <div className="flex-1 flex flex-col items-center justify-center pl-0 md:pl-5">
              <p className="text-center">Block Meet Abstract</p>
              <p className="text-sm sm:text-base font-normal mt-2">This is a placeholder for the Block Meet project abstract. It will appear after watching the video for 3 seconds.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "SaveServes",
      value: "SaveServes",
      content: (
        <div className="flex flex-col md:flex-row w-full relative min-h-[24rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-2 sm:p-6 md:p-10 text-sm sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <div className="flex-1 flex flex-col items-center justify-center pr-0 md:pr-5 mb-5 md:mb-0">
            <p className="mb-2 sm:mb-4 text-center">SaveServes</p>
            <div className="relative w-full flex items-center justify-center flex-grow">
              <video
                ref={videoRef}
                className="w-full h-full rounded-lg object-contain"
                controls
                controlsList="nodownload"
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={"/project_videos/SaveServes.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {showAbstract && (
            <div className="flex-1 flex flex-col items-center justify-center pl-0 md:pl-5">
              <p className="text-center">SaveServes Abstract</p>
              <p className="text-sm sm:text-base font-normal mt-2">This is a placeholder for the SaveServes project abstract. It will appear after watching the video for 3 seconds.</p>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Project 4",
      value: "project 4",
      content: (
        <div className="w-full relative min-h-[24rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-2 sm:p-6 md:p-10 text-sm sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex flex-col items-center">
          <p className="mb-2 sm:mb-4 text-center">Project 4</p>
          <div className="flex items-center justify-center h-full">
            <h1>COMING SOON</h1>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-[22rem] sm:min-h-[32rem] md:min-h-[42rem] relative flex flex-col max-w-5xl mx-auto w-full items-center justify-start mt-20 sm:mt-32 md:mt-40">
      <Tabs tabs={tabs} />
    </div>
  )
}