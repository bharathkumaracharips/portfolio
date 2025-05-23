"use client"

import { Tabs } from "@/app/components/ui/tabs"

export function TabsDemo() {
  const tabs = [
    {
      title: "Block Stamp",
      value: "Block Stamp",
      content: (
        <div className="w-full relative min-h-[24rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-2 sm:p-6 md:p-10 text-sm sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex flex-col items-center">
          <p className="mb-2 sm:mb-4 text-center">Block Stamp</p>
          <div className="flex-1 relative w-full flex items-center justify-center pt-2 sm:pt-0">
            <div className="w-full h-full absolute inset-0 flex items-center justify-center">
              <video 
                className="w-full h-full rounded-lg object-contain" 
                controls
                controlsList="nodownload"
                preload="metadata"
              >
                <source src={"/project_videos/Block-Stamp.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Block Meet",
      value: "Block Meet",
      content: (
        <div className="w-full relative min-h-[24rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-2 sm:p-6 md:p-10 text-sm sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex flex-col items-center">
          <p className="mb-2 sm:mb-4 text-center">Block Meet</p>
          <div className="flex-1 relative w-full flex items-center justify-center pt-2 sm:pt-0">
            <div className="w-full h-full absolute inset-0 flex items-center justify-center">
              <video 
                className="w-full h-full rounded-lg object-contain" 
                controls
                controlsList="nodownload"
                preload="metadata"
              >
                <source src={"/project_videos/Block-Meet.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "SaveServes",
      value: "SaveServes",
      content: (
        <div className="w-full relative min-h-[24rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-2 sm:p-6 md:p-10 text-sm sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex flex-col items-center">
          <p className="mb-2 sm:mb-4 text-center">SaveServes</p>
          <div className="flex-1 relative w-full flex items-center justify-center pt-2 sm:pt-0">
            <div className="w-full h-full absolute inset-0 flex items-center justify-center">
              <video 
                className="w-full h-full rounded-lg object-contain" 
                controls
                controlsList="nodownload"
                preload="metadata"
              >
                <source src={"/project_videos/SaveServes.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
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