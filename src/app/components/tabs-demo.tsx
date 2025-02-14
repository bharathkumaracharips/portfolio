"use client"

import { Tabs } from "@/app/components/ui/tabs"

export function TabsDemo() {
  const tabs = [
    {
      title: "Block Stamp",
      value: "Block Stamp",
      content: (
        <div className="w-full relative min-h-[18rem] sm:-mt-24 md:min-h-[40rem] rounded-2xl p-6 md:p-10 text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <p>Block Stamp</p>
          <video className="mt-4 w-full max-w-full rounded-lg z-10 object-contain pb-0 mb:pb-[-300px]" controls>
            <source src={"/project_videos/Block-Stamp.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    },
    {
      title: "Block Meet",
      value: "Block Meet",
      content: (
        <div className="w-full relative min-h-[18rem] md:min-h-[30rem] rounded-2xl p-6 md:p-10 text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <p>Block Meet</p>
          <video className="mt-4 w-full rounded-lg" controls>
            <source src={"/project_videos/Block-Meet.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ),
    },
    {
      title: "Project 3",
      value: "project 3",
      content: (
        <div className="w-full relative min-h-[18rem] md:min-h-[30rem] rounded-2xl p-6 md:p-10 text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex items-center justify-center">
          <h1>COMING SOON</h1>
        </div>
      ),
    },
    {
      title: "Project 4",
      value: "project 4",
      content: (
        <div className="w-full relative min-h-[18rem] md:min-h-[30rem] rounded-2xl p-6 md:p-10 text-lg md:text-3xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide flex items-center justify-center">
          <h1>COMING SOON</h1>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-[22rem] md:min-h-[42rem] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-20">
      <Tabs tabs={tabs} />
    </div>
  )
}