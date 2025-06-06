// import { cn } from "@/app/lib/utils";
// import React, { useEffect, useState } from "react";

// // Define types for items
// type TextItem = {
//   type: "text";
//   quote: string;
//   name: string;
//   title: string;
// };

// type ComponentItem = {
//   type: "component";
//   component: React.ReactNode;
// };

// type Item = TextItem | ComponentItem;

// export const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }: {
//   items: Item[];
//   direction?: "left" | "right";
//   speed?: "fast" | "normal" | "slow";
//   pauseOnHover?: boolean;
//   className?: string;
// }) => {
//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const scrollerRef = React.useRef<HTMLUListElement>(null);
//   const [start, setStart] = useState(false);

//   useEffect(() => {
//     addAnimation();
//   }, []);

//   function addAnimation() {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);
//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         scrollerRef.current?.appendChild(duplicatedItem);
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   }

//   const getDirection = () => {
//     if (containerRef.current) {
//       containerRef.current.style.setProperty(
//         "--animation-direction",
//         direction === "left" ? "forwards" : "reverse"
//       );
//     }
//   };

//   const getSpeed = () => {
//     if (containerRef.current) {
//       const speedMap = {
//         fast: "20s",
//         normal: "40s",
//         slow: "80s",
//       };
//       containerRef.current.style.setProperty(
//         "--animation-duration",
//         speedMap[speed] || "40s"
//       );
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
//         className
//       )}
//     >
//       <ul
//         ref={scrollerRef}
//         className={cn(
//           "flex w-max gap-8 py-4 flex-nowrap",
//           start && "animate-scroll",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//         {items.map((item, idx) => (
//           <li key={idx} className="w-[30rem] flex-shrink-0">
//             {item.type === "text" ? (
//               <blockquote>
//                 <span className="text-sm text-gray-100">{item.quote}</span>
//                 <div className="mt-2">
//                   <span className="text-sm text-gray-400">{item.name}</span>
//                   <span className="text-sm text-gray-400">{item.title}</span>
//                 </div>
//               </blockquote>
//             ) : (
//               <div className="w-full">{item.component}</div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

//2nd


// import { cn } from "@/app/lib/utils";
// import React, { useEffect, useState, useCallback } from "react";

// // Define types for items
// type TextItem = {
//   type: "text";
//   quote: string;
//   name: string;
//   title: string;
// };

// type ComponentItem = {
//   type: "component";
//   component: React.ReactNode;
// };

// type Item = TextItem | ComponentItem;

// export const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }: {
//   items: Item[];
//   direction?: "left" | "right";
//   speed?: "fast" | "normal" | "slow";
//   pauseOnHover?: boolean;
//   className?: string;
// }) => {
//   const containerRef = React.useRef<HTMLDivElement>(null);
//   const scrollerRef = React.useRef<HTMLUListElement>(null);
//   const [start, setStart] = useState(false);

//   // Memoize addAnimation function to prevent unnecessary re-renders
//   const addAnimation = useCallback(() => {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);
//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         scrollerRef.current?.appendChild(duplicatedItem);
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   }, [direction, speed]);

//   useEffect(() => {
//     addAnimation();
//   }, [addAnimation]); // Include addAnimation in the dependency array

//   const getDirection = () => {
//     if (containerRef.current) {
//       containerRef.current.style.setProperty(
//         "--animation-direction",
//         direction === "left" ? "forwards" : "reverse"
//       );
//     }
//   };

//   const getSpeed = () => {
//     if (containerRef.current) {
//       const speedMap = {
//         fast: "20s",
//         normal: "40s",
//         slow: "80s",
//       };
//       containerRef.current.style.setProperty(
//         "--animation-duration",
//         speedMap[speed] || "40s"
//       );
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
//         className
//       )}
//     >
//       <ul
//         ref={scrollerRef}
//         className={cn(
//           "flex w-max gap-8 py-4 flex-nowrap",
//           start && "animate-scroll",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//         {items.map((item, idx) => (
//           <li key={idx} className="w-[30rem] flex-shrink-0">
//             {item.type === "text" ? (
//               <blockquote>
//                 <span className="text-sm text-gray-100">{item.quote}</span>
//                 <div className="mt-2">
//                   <span className="text-sm text-gray-400">{item.name}</span>
//                   <span className="text-sm text-gray-400">{item.title}</span>
//                 </div>
//               </blockquote>
//             ) : (
//               <div className="w-full">{item.component}</div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


//3rd


import { cn } from "@/app/lib/utils";
import React, { useEffect, useState, useCallback } from "react";

// Define types for items
type TextItem = {
  type: "text";
  quote: string;
  name: string;
  title: string;
};

type ComponentItem = {
  type: "component";
  component: React.ReactNode;
};

type Item = TextItem | ComponentItem;

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Item[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  // Memoized function to set animation direction
  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  }, [direction]);

  // Memoized function to set animation speed
  // const getSpeed = useCallback(() => {
  //   if (containerRef.current) {
  //     const speedMap = {
  //       fast: "20s",
  //       normal: "40s",
  //       slow: "80s",
  //     };
  //     containerRef.current.style.setProperty(
  //       "--animation-duration",
  //       speedMap[speed] || "40s"
  //     );
  //   }
  // }, [speed]);

  // Memoize addAnimation function to prevent unnecessary re-renders
  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // let contentWidth = 0;
      scrollerContent.forEach((item) => {
        // contentWidth += item.clientWidth + 32; // Add item width and gap (assuming gap-8 which is 32px)
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      const totalWidth = scrollerRef.current.scrollWidth;
      const duration = totalWidth / (speed === "fast" ? 100 : speed === "normal" ? 50 : 25); // Adjust factor based on speed for desired effect

      containerRef.current.style.setProperty(
        "--animation-duration",
        `${duration}s`
      );

      getDirection();
      // getSpeed(); // No longer need the fixed speed map
      setStart(true);
    }
  }, [getDirection, speed]); // Added speed to dependencies

  useEffect(() => {
    addAnimation();
  }, [addAnimation]); // Include addAnimation in the dependency array

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max gap-8 py-4 flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li key={idx} className="w-[30rem] flex-shrink-0">
            {item.type === "text" ? (
              <blockquote>
                <span className="text-sm text-gray-100">{item.quote}</span>
                <div className="mt-2">
                  <span className="text-sm text-gray-400">{item.name}</span>
                  <span className="text-sm text-gray-400">{item.title}</span>
                </div>
              </blockquote>
            ) : (
              <div className="w-full">{item.component}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};