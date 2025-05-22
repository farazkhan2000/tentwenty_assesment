// "use client";

// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import Image from "next/image";
// import { Images } from "@/assets/images/assets";

// const slides = [
//   {
//     id: 1,
//     image: Images.HeroSliderImg1,
//     headline: "From Our Farms To Your Hands",
//   },
//   {
//     id: 2,
//     image: Images.HeroSliderImg2,
//     headline: "Harvested With Care, Delivered Fresh",
//   },
//   {
//     id: 3,
//     image: Images.HeroSliderImg1,
//     headline: "Sustainable Farming, Quality Guaranteed",
//   },
//   {
//     id: 4,
//     image: Images.HeroSliderImg2,
//     headline: "Nature's Best, Direct to You",
//   },
// ];

// export default function HeroSlider() {
//   const [current, setCurrent] = useState(0);
//   const textRef = useRef();
//   const progressTopRef = useRef();
//   const progressRightRef = useRef();
//   const progressBottomRef = useRef();
//   const progressLeftRef = useRef();
//   const timelineRef = useRef();

//   useEffect(() => {
//     gsap.set(textRef.current, { opacity: 0, y: 30 });

//     timelineRef.current = gsap.timeline({ repeat: -1 });

//     const setProgress = (ref, scaleX = true, origin) => {
//       gsap.set(ref, {
//         [scaleX ? "scaleX" : "scaleY"]: 0,
//         transformOrigin: origin,
//       });
//     };

//     setProgress(progressTopRef.current, true, "left center");
//     setProgress(progressRightRef.current, false, "top center");
//     setProgress(progressBottomRef.current, true, "right center"); // ← Right to left
//     setProgress(progressLeftRef.current, false, "bottom center");

//     timelineRef.current
//       .to(progressTopRef.current, { scaleX: 1, duration: 1.25, ease: "none" })
//       .to(progressRightRef.current, { scaleY: 1, duration: 1.25, ease: "none" })
//       .to(progressBottomRef.current, {
//         scaleX: 1,
//         duration: 1.25,
//         ease: "none",
//       })
//       .to(progressLeftRef.current, { scaleY: 1, duration: 1.25, ease: "none" })
//       .to(
//         textRef.current,
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power2.out",
//         },
//         0
//       )
//       .add(() => {
//         setCurrent((prev) => (prev + 1) % slides.length);
//       }, "+=1");
//   }, []);

//   useEffect(() => {
//     gsap.fromTo(
//       textRef.current,
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
//     );

//     const resetProgress = (ref, scaleX = true) =>
//       gsap.set(ref, { [scaleX ? "scaleX" : "scaleY"]: 0 });

//     resetProgress(progressTopRef.current, true);
//     resetProgress(progressRightRef.current, false);
//     resetProgress(progressBottomRef.current, true);
//     resetProgress(progressLeftRef.current, false);
//   }, [current]);

//   const handleNext = () => {
//     // Kill the current timeline animation
//     timelineRef.current?.kill();

//     // Immediately reset progress bars
//     gsap.set(progressTopRef.current, { scaleX: 0 });
//     gsap.set(progressRightRef.current, { scaleY: 0 });
//     gsap.set(progressBottomRef.current, { scaleX: 0 });
//     gsap.set(progressLeftRef.current, { scaleY: 0 });

//     // Update current slide
//     setCurrent((prev) => (prev + 1) % slides.length);

//     // Restart animation manually
//     const tl = gsap.timeline();
//     tl.to(progressTopRef.current, { scaleX: 1, duration: 1.25, ease: "none" })
//       .to(progressRightRef.current, { scaleY: 1, duration: 1.25, ease: "none" })
//       .to(progressBottomRef.current, {
//         scaleX: 1,
//         duration: 1.25,
//         ease: "none",
//       })
//       .to(progressLeftRef.current, { scaleY: 1, duration: 1.25, ease: "none" });

//     timelineRef.current = tl;
//   };

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
//         <Image
//           src={slides[current].image}
//           alt="Slide"
//           layout="fill"
//           objectFit="cover"
//           priority
//           className="transition-opacity duration-1000 opacity-0"
//           onLoadingComplete={(image) => image.classList.remove("opacity-0")}
//         />
//       </div>
//       <div className="absolute inset-0 bg-black/40 z-10" />

//       <div className="container mx-auto h-full">
//         <div className="absolute z-20 left-36 top-1/3 text-white max-w-xl">
//           <p className="mb-2 text-sm tracking-widest uppercase">
//             Welcome To TenTwenty Farms
//           </p>
//           <h1 ref={textRef} className="text-5xl font-bold leading-tight">
//             {slides[current].headline}
//           </h1>
//         </div>

//         {/* Thumbnail and Progress */}
//         <div className="absolute bottom-20 left-36 z-20 flex items-center gap-6">
//           <div
//             onClick={handleNext}
//             className="relative w-[132px] h-[132px] cursor-pointer group"
//           >
//             <div className="absolute inset-0 border border-white/40" />
//             <div
//               ref={progressTopRef}
//               className="absolute top-0 left-0 w-full h-[4px] bg-white origin-left"
//             />
//             <div
//               ref={progressRightRef}
//               className="absolute top-0 right-0 w-[4px] h-full bg-white origin-top"
//             />
//             <div
//               ref={progressBottomRef}
//               className="absolute bottom-0 left-0 w-full h-[4px] bg-white origin-right"
//             />
//             <div
//               ref={progressLeftRef}
//               className="absolute top-0 left-0 w-[4px] h-full bg-white origin-bottom"
//             />
//             <div className="absolute inset-0 m-5 overflow-hidden">
//               <Image
//                 src={slides[(current + 1) % slides.length].image}
//                 alt="Next"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <p className="absolute inset-0 flex items-center justify-center text-white">
//               Next
//             </p>
//           </div>

//           {/* Slide Counter */}
//           <div className="text-white flex items-center gap-3">
//             <span className="text-lg">
//               {String(current + 1).padStart(2, "0")}
//             </span>
//             <span className="w-20 h-px bg-white"></span>
//             <span className="text-lg">
//               {String(slides.length).padStart(2, "0")}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { Images } from "@/assets/images/assets";

const slides = [
  {
    id: 1,
    image: Images.HeroSliderImg1,
    headline: "From Our Farms To Your Hands",
  },
  {
    id: 2,
    image: Images.HeroSliderImg2,
    headline: "Harvested With Care, Delivered Fresh",
  },
  {
    id: 3,
    image: Images.HeroSliderImg1,
    headline: "Sustainable Farming, Quality Guaranteed",
  },
  {
    id: 4,
    image: Images.HeroSliderImg2,
    headline: "Nature's Best, Direct to You",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const textRef = useRef();
  const progressTopRef = useRef();
  const progressRightRef = useRef();
  const progressBottomRef = useRef();
  const progressLeftRef = useRef();
  const timelineRef = useRef();

  useEffect(() => {
    gsap.set(textRef.current, { opacity: 0, y: 30 });

    timelineRef.current = gsap.timeline({ repeat: -1 });

    const setProgress = (ref, scaleX = true, origin) => {
      gsap.set(ref, {
        [scaleX ? "scaleX" : "scaleY"]: 0,
        transformOrigin: origin,
      });
    };

    setProgress(progressTopRef.current, true, "left center");
    setProgress(progressRightRef.current, false, "top center");
    setProgress(progressBottomRef.current, true, "right center");
    setProgress(progressLeftRef.current, false, "bottom center");

    timelineRef.current
      .to(progressTopRef.current, { scaleX: 1, duration: 1.25, ease: "none" })
      .to(progressRightRef.current, { scaleY: 1, duration: 1.25, ease: "none" })
      .to(progressBottomRef.current, {
        scaleX: 1,
        duration: 1.25,
        ease: "none",
      })
      .to(progressLeftRef.current, { scaleY: 1, duration: 1.25, ease: "none" })
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
      .add(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, "+=1");
  }, []);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    const resetProgress = (ref, scaleX = true) =>
      gsap.set(ref, { [scaleX ? "scaleX" : "scaleY"]: 0 });

    resetProgress(progressTopRef.current, true);
    resetProgress(progressRightRef.current, false);
    resetProgress(progressBottomRef.current, true);
    resetProgress(progressLeftRef.current, false);
  }, [current]);

  const handleNext = () => {
    timelineRef.current?.kill();
    gsap.set(progressTopRef.current, { scaleX: 0 });
    gsap.set(progressRightRef.current, { scaleY: 0 });
    gsap.set(progressBottomRef.current, { scaleX: 0 });
    gsap.set(progressLeftRef.current, { scaleY: 0 });
    setCurrent((prev) => (prev + 1) % slides.length);

    const tl = gsap.timeline();
    tl.to(progressTopRef.current, { scaleX: 1, duration: 1.25, ease: "none" })
      .to(progressRightRef.current, { scaleY: 1, duration: 1.25, ease: "none" })
      .to(progressBottomRef.current, {
        scaleX: 1,
        duration: 1.25,
        ease: "none",
      })
      .to(progressLeftRef.current, { scaleY: 1, duration: 1.25, ease: "none" });

    timelineRef.current = tl;
  };

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <Image
          src={slides[current].image}
          alt="Slide"
          fill
          priority
          className="object-cover transition-opacity duration-1000 opacity-0"
          onLoadingComplete={(image) => image.classList.remove("opacity-0")}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content Container */}
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
        {/* Headline Text */}
        <div className="absolute z-20 left-4 lg:left-36 top-1/4 md:top-1/3 text-white max-w-xs sm:max-w-sm md:max-w-xl">
          <p className="mb-2 text-xs sm:text-sm tracking-widest uppercase">
            Welcome To TenTwenty Farms
          </p>
          <h1
            ref={textRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            {slides[current].headline}
          </h1>
        </div>

        {/* Thumbnail and Progress */}
        <div className="absolute bottom-20 md:bottom-20 left-4 sm:left-8 md:left-36 z-20 flex items-center gap-4 sm:gap-6">
          <div
            onClick={handleNext}
            className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 cursor-pointer group"
          >
            {/* Border and Progress Indicators */}
            <div className="absolute inset-0 border border-white/40 rounded-sm" />
            <div
              ref={progressTopRef}
              className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-white origin-left"
            />
            <div
              ref={progressRightRef}
              className="absolute top-0 right-0 w-0.5 sm:w-1 h-full bg-white origin-top"
            />
            <div
              ref={progressBottomRef}
              className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-white origin-right"
            />
            <div
              ref={progressLeftRef}
              className="absolute top-0 left-0 w-0.5 sm:w-1 h-full bg-white origin-bottom"
            />

            {/* Thumbnail Image with Dark Overlay */}
            <div className="absolute inset-0 m-3 sm:m-4 md:m-5 overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-black/30 z-10" />
              <Image
                src={slides[(current + 1) % slides.length].image}
                alt="Next"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 128px"
              />
            </div>

            {/* Next Text */}
            <p className="absolute inset-0 flex items-center justify-center text-white font-medium z-20">
              Next
            </p>
          </div>

          {/* Slide Counter */}
          <div className="text-white flex items-center gap-2 sm:gap-3">
            <span className="text-base sm:text-lg">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="w-12 sm:w-16 md:w-20 h-px bg-white"></span>
            <span className="text-base sm:text-lg">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
