// "use client";

// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";
// import Image from "next/image";

// gsap.registerPlugin(Draggable);

// const slides = [
//   {
//     id: 1,
//     image: "https://images.pexels.com/photos/2316571/pexels-photo-2316571.jpeg",
//     client: "Client 1",
//     location: "Dubai, UAE",
//   },
//   {
//     id: 2,
//     image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
//     client: "Client 2",
//     location: "Berlin, Germany",
//   },
//   {
//     id: 3,
//     image: "https://images.pexels.com/photos/1359368/pexels-photo-1359368.jpeg",
//     client: "Client 3",
//     location: "Tokyo, Japan",
//   },
//   {
//     id: 4,
//     image: "https://images.pexels.com/photos/1876979/pexels-photo-1876979.jpeg",
//     client: "Client 4",
//     location: "Paris, France",
//   },
//   {
//     id: 5,
//     image: "https://images.pexels.com/photos/1876979/pexels-photo-1876979.jpeg",
//     client: "Client 5",
//     location: "Toronto, Canada",
//   },
// ];

// export default function CircularSlider() {
//   const dragLayerRef = useRef(null);
//   const leftRef = useRef(null);
//   const centerRef = useRef(null);
//   const rightRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const getSlide = (offset) => {
//     const index = (currentIndex + offset + slides.length) % slides.length;
//     return slides[index];
//   };

//   // Animate slide positions with GSAP
//   const animateSlides = () => {
//     const tl = gsap.timeline();

//     tl.to(leftRef.current, {
//       left: "-20",
//       scale: 0.9,
//       rotate: -6,
//       opacity: 0.7,
//       zIndex: 200,
//       duration: 0.6,
//       ease: "power3.inOut",
//     });

//     tl.to(
//       centerRef.current,
//       {
//         left: "37%",
//         scale: 1,
//         rotate: 0,
//         opacity: 1,
//         zIndex: 3,
//         duration: 0.6,
//         ease: "power3.inOut",
//       },
//       "<"
//     );

//     tl.to(
//       rightRef.current,
//       {
//         left: "76%",
//         scale: 0.9,
//         rotate: 6,
//         opacity: 0.7,
//         zIndex: 1,
//         duration: 0.6,
//         ease: "power3.inOut",
//       },
//       "<"
//     );
//   };

//   useLayoutEffect(() => {
//     animateSlides();
//   }, [currentIndex]);

//   useEffect(() => {
//     let startX = 0;

//     const draggable = Draggable.create(dragLayerRef.current, {
//       type: "x",
//       inertia: true,
//       onDragStart() {
//         startX = this.x;
//       },
//       onDragEnd() {
//         const delta = this.x - startX;

//         if (delta < -50) {
//           setCurrentIndex((prev) => (prev + 1) % slides.length);
//         } else if (delta > 50) {
//           setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
//         }

//         gsap.to(this.target, {
//           x: 0,
//           duration: 0.4,
//           ease: "power2.out",
//         });
//       },
//     });

//     return () => {
//       draggable[0]?.kill();
//     };
//   }, []);

//   return (
//     <section className="py-24 text-center bg-white relative">
//       <h2 className="text-3xl font-bold mb-4">Quality Products</h2>
//       <p className="max-w-2xl mx-auto text-gray-600 mb-12 px-4">
//         Discover our clients&#39; beautiful gardens and plantations around the
//         world.
//       </p>

//       {/* Drag layer */}
//       <div
//         ref={dragLayerRef}
//         className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
//         style={{ height: "700px", touchAction: "pan-y", pointerEvents: "auto" }}
//       ></div>

//       {/* Static Carousel */}
//       <div className="relative w-full h-[700px] overflow-hidden pointer-events-none">
//         <div className="relative w-full h-full">
//           {/* Left */}
//           <div
//             ref={leftRef}
//             className="absolute top-16 transition-all duration-500"
//             style={{ width: 480, height: 600 }}
//           >
//             <Image
//               src={getSlide(-1).image}
//               alt={getSlide(-1).client}
//               width={100}
//               height={100}
//               className="w-full h-full object-cover shadow-xl pointer-events-none"
//             />
//           </div>

//           {/* Center */}
//           <div
//             ref={centerRef}
//             className="absolute top-0 transition-all duration-500"
//             style={{ width: 480, height: 600 }}
//           >
//             <Image
//               src={getSlide(0).image}
//               alt={getSlide(0).client}
//               width={100}
//               height={100}
//               className="w-full h-full object-cover shadow-xl pointer-events-none"
//             />
//           </div>

//           {/* Right */}
//           <div
//             ref={rightRef}
//             className="absolute top-16 transition-all duration-500"
//             style={{ width: 480, height: 600 }}
//           >
//             <Image
//               src={getSlide(1).image}
//               alt={getSlide(1).client}
//               width={100}
//               height={100}
//               className="w-full h-full object-cover shadow-xl pointer-events-none"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Client Info */}
//       <div className="mt-0 transition-opacity duration-300">
//         <h3 className="text-xl font-semibold">{slides[currentIndex].client}</h3>
//         <p className="text-gray-500">{slides[currentIndex].location}</p>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import { Images } from "@/assets/images/assets";

gsap.registerPlugin(Draggable);

const slides = [
  {
    id: 1,
    image: Images.HeroSliderImg4,
    client: "Client 1",
    location: "Dubai, UAE",
  },
  {
    id: 2,
    image: Images.HeroSliderImg2,
    client: "Client 2",
    location: "Berlin, Germany",
  },
  {
    id: 3,
    image: Images.HeroSliderImg3,
    client: "Client 3",
    location: "Tokyo, Japan",
  },
  {
    id: 4,
    image: Images.HeroSliderImg4,
    client: "Client 4",
    location: "Paris, France",
  },
  {
    id: 5,
    image: Images.HeroSliderImg3,
    client: "Client 5",
    location: "Toronto, Canada",
  },
];

export default function CircularSlider() {
  const dragLayerRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      animateSlides();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlide = (offset) => {
    const index = (currentIndex + offset + slides.length) % slides.length;
    return slides[index];
  };

  // Calculate responsive values
  const getResponsiveValues = () => {
    if (windowWidth < 640) {
      // Mobile
      return {
        imageWidth: 180,
        imageHeight: 280,
        centerLeft: "30%",
        centerTransform: "translateX(-50%)",
        leftLeft: "20%",
        rightLeft: "80%",
        dragLayerHeight: 340,
      };
    } else if (windowWidth < 768) {
      // Tablet
      return {
        imageWidth: 350,
        imageHeight: 450,
        centerLeft: "50%",
        centerTransform: "translateX(-50%)",
        leftLeft: "15%",
        rightLeft: "85%",
        dragLayerHeight: 550,
      };
    } else {
      // Desktop
      return {
        imageWidth: 480,
        imageHeight: 600,
        centerLeft: "37%",
        centerTransform: "none",
        leftLeft: "-20%",
        rightLeft: "76%",
        dragLayerHeight: 700,
      };
    }
  };

  // Animate slide positions with GSAP
  const animateSlides = () => {
    const { centerLeft, leftLeft, rightLeft, centerTransform } =
      getResponsiveValues();
    const tl = gsap.timeline();

    tl.to(leftRef.current, {
      left: leftLeft,
      scale: 0.9,
      rotate: -6,
      opacity: 0.7,
      zIndex: 200,
      duration: 0.6,
      ease: "power3.inOut",
    });

    tl.to(
      centerRef.current,
      {
        left: centerLeft,
        x: centerTransform === "none" ? 0 : centerTransform,
        scale: 1,
        rotate: 0,
        opacity: 1,
        zIndex: 220,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.to(
      rightRef.current,
      {
        left: rightLeft,
        scale: 0.9,
        rotate: 6,
        opacity: 0.7,
        zIndex: 1,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "<"
    );
  };

  useLayoutEffect(() => {
    animateSlides();
  }, [currentIndex, windowWidth]);

  useEffect(() => {
    let startX = 0;

    const draggable = Draggable.create(dragLayerRef.current, {
      type: "x",
      inertia: true,
      onDragStart() {
        startX = this.x;
      },
      onDragEnd() {
        const delta = this.x - startX;

        if (delta < -50) {
          setCurrentIndex((prev) => (prev + 1) % slides.length);
        } else if (delta > 50) {
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        }

        gsap.to(this.target, {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });

    return () => {
      draggable[0]?.kill();
    };
  }, []);

  const { imageWidth, imageHeight, dragLayerHeight } = getResponsiveValues();

  return (
    <section className="py-12 md:py-24 text-center bg-white relative overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 px-4">
        Quality Products
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-8 md:mb-12 px-4 text-sm md:text-base">
        Discover our clients&#39; beautiful gardens and plantations around the
        world.
      </p>

      {/* Drag layer */}
      <div
        ref={dragLayerRef}
        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing mx-auto"
        style={{
          height: `${dragLayerHeight}px`,
          maxWidth: "100vw",
          touchAction: "pan-y",
          pointerEvents: "auto",
        }}
      ></div>

      {/* Static Carousel */}
      <div
        className="relative w-full mx-auto overflow-hidden pointer-events-none"
        style={{ height: `${dragLayerHeight}px`, maxWidth: "100vw" }}
      >
        <div className="relative w-full h-full">
          {/* Left */}
          <div
            ref={leftRef}
            className="absolute right top-8 md:top-16 transition-all duration-500"
            style={{
              width: imageWidth,
              height: imageHeight,
              transform: "translateX(-50%)",
            }}
          >
            <Image
              src={getSlide(-1).image}
              alt={getSlide(-1).client}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-full object-cover shadow-xl pointer-events-none"
            />
          </div>

          {/* Center */}
          <div
            ref={centerRef}
            className="absolute transition-all duration-500"
            style={{
              width: imageWidth,
              height: imageHeight,
              top: 0,
            }}
          >
            <Image
              src={getSlide(0).image}
              alt={getSlide(0).client}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-full object-cover shadow-xl pointer-events-none"
            />
          </div>

          {/* Right */}
          <div
            ref={rightRef}
            className="absolute top-8 md:top-16 transition-all duration-500"
            style={{
              width: imageWidth,
              height: imageHeight,
              transform: "translateX(-50%)",
            }}
          >
            <Image
              src={getSlide(1).image}
              alt={getSlide(1).client}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-full object-cover shadow-xl pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="mt-0 md:mt-8 transition-opacity duration-300 px-4">
        <h3 className="text-lg md:text-xl font-semibold">
          {slides[currentIndex].client}
        </h3>
        <p className="text-gray-500 text-sm md:text-base">
          {slides[currentIndex].location}
        </p>
      </div>
    </section>
  );
}
