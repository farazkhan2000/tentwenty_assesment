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
    } else if (windowWidth > 640 && windowWidth < 1024) {
      // Tablet
      return {
        imageWidth: 280,
        imageHeight: 360,
        centerLeft: "32%",
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
        centerLeft: "38%",
        centerTransform: "none",
        leftLeft: "12%",
        rightLeft: "88%",
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
      rotate: -8,
      opacity: 0.7,
      zIndex: 60,
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
        zIndex: 80,
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
        rotate: 8,
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
              className="w-full h-full object-cover shadow-md pointer-events-none"
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
              className="w-full h-full object-cover shadow-md pointer-events-none"
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
              className="w-full h-full object-cover shadow-md pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="transition-opacity duration-300 px-4">
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
