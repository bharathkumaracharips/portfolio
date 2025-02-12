"use client"

import { Tabs } from "@/app/components/ui/tabs"
export function TabsDemo() {
  const tabs = [
    {
      title: "Block Stamp",
      value: "Block Stamp",
      content: (
        <div className="w-full mb-[300px] overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <p>Block Stamp</p>
          <video className="mt-4  w-full rounded-lg" controls>
            <source src={"/project_videos/Block-Stamp.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <br /><br />
        </div>
      ),
    },
    {
      title: "Block Meet",
      value: "Block Meet",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <p>Block Meet</p>
          <video className="mt-4  w-full rounded-lg" controls>
            <source src={"/project_videos/Block-Meet.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <br /><br />
        </div>
      ),
    },
    {
      title: "project 3",
      value: "project 3",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <p>project 3</p>
          <h1>COMING SOON</h1>
        </div>
      ),
    },
    {
      title: "project 4",
      value: "project 4",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-black to-violet-900 tracking-wide">
          <p>project 4</p>
          <h1>COMING SOON</h1>
        </div>
      ),
    },
  ]

  return (
    <div className="h-[20rem]  md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  )
} 
          
