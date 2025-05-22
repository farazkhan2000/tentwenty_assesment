"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";

gsap.registerPlugin(Draggable);

const slides = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2316571/pexels-photo-2316571.jpeg",
    client: "Client 1",
    location: "Dubai, UAE",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    client: "Client 2",
    location: "Berlin, Germany",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/1359368/pexels-photo-1359368.jpeg",
    client: "Client 3",
    location: "Tokyo, Japan",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/1876979/pexels-photo-1876979.jpeg",
    client: "Client 4",
    location: "Paris, France",
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/1876979/pexels-photo-1876979.jpeg",
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

  const getSlide = (offset) => {
    const index = (currentIndex + offset + slides.length) % slides.length;
    return slides[index];
  };

  // Animate slide positions with GSAP
  const animateSlides = () => {
    const tl = gsap.timeline();

    tl.to(leftRef.current, {
      left: "-20",
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
        left: "37%",
        scale: 1,
        rotate: 0,
        opacity: 1,
        zIndex: 3,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.to(
      rightRef.current,
      {
        left: "76%",
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
  }, [currentIndex]);

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

  return (
    <section className="py-24 text-center bg-white relative">
      <h2 className="text-3xl font-bold mb-4">Quality Products</h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-12 px-4">
        Discover our clients&#39; beautiful gardens and plantations around the
        world.
      </p>

      {/* Drag layer */}
      <div
        ref={dragLayerRef}
        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        style={{ height: "700px", touchAction: "pan-y", pointerEvents: "auto" }}
      ></div>

      {/* Static Carousel */}
      <div className="relative w-full h-[700px] overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          {/* Left */}
          <div
            ref={leftRef}
            className="absolute top-16 transition-all duration-500"
            style={{ width: 480, height: 600 }}
          >
            <Image
              src={getSlide(-1).image}
              alt={getSlide(-1).client}
              width={100}
              height={100}
              className="w-full h-full object-cover shadow-xl pointer-events-none"
            />
          </div>

          {/* Center */}
          <div
            ref={centerRef}
            className="absolute top-0 transition-all duration-500"
            style={{ width: 480, height: 600 }}
          >
            <Image
              src={getSlide(0).image}
              alt={getSlide(0).client}
              width={100}
              height={100}
              className="w-full h-full object-cover shadow-xl pointer-events-none"
            />
          </div>

          {/* Right */}
          <div
            ref={rightRef}
            className="absolute top-16 transition-all duration-500"
            style={{ width: 480, height: 600 }}
          >
            <Image
              src={getSlide(1).image}
              alt={getSlide(1).client}
              width={100}
              height={100}
              className="w-full h-full object-cover shadow-xl pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="mt-0 transition-opacity duration-300">
        <h3 className="text-xl font-semibold">{slides[currentIndex].client}</h3>
        <p className="text-gray-500">{slides[currentIndex].location}</p>
      </div>
    </section>
  );
}
