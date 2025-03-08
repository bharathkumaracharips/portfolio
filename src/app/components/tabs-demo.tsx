"use client"

import { Tabs } from "@/app/components/ui/tabs"

export function TabsDemo() {
  const tabs = [
    {
      title: "Block Stamp",
      value: "Block Stamp",
      content: (
        <div className="w-full relative min-h-[18rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-4 sm:p-6 md:p-10 text-base sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex flex-col">
          <p className="mb-4">Block Stamp</p>
          <div className="flex-1 relative w-full pb-12">
            <div className="absolute inset-0">
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
        <div className="w-full relative min-h-[18rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-4 sm:p-6 md:p-10 text-base sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex flex-col">
          <p className="mb-4">Block Meet</p>
          <div className="flex-1 relative w-full pb-12">
            <div className="absolute inset-0">
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
      title: "Project 3",
      value: "project 3",
      content: (
        <div className="w-full relative min-h-[18rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-4 sm:p-6 md:p-10 text-base sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex items-center justify-center">
          <h1>COMING SOON</h1>
        </div>
      ),
    },
    {
      title: "Project 4",
      value: "project 4",
      content: (
        <div className="w-full relative min-h-[18rem] sm:min-h-[25rem] md:min-h-[35rem] lg:min-h-[40rem] rounded-2xl p-4 sm:p-6 md:p-10 text-base sm:text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex items-center justify-center">
          <h1>COMING SOON</h1>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-[22rem] sm:min-h-[32rem] md:min-h-[42rem] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-4 sm:my-8 md:my-12">
      <Tabs tabs={tabs} />
    </div>
  )
}