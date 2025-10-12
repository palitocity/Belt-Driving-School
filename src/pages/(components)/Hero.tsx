"use client";
import { FaArrowRight } from "react-icons/fa";
import image1 from "../../../assets/image1.jpg";
import image2 from "../../../assets/image2.jpg";
import image3 from "../../../assets/image3.jpg";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroData = [
  {
    text: "Driving Excellence, Inspiring Safety.",
    image: image1,
  },
  {
    text: "Enroll Beginner Driving Lessons",
    image: image2,
  },
  {
    text: "Enroll Defensive Driving Courses",
    image: image3,
  },
  {
    text: "Enroll Refresher Programs",
    image: image3,
  },
  {
    text: "Enroll Corporate & Fleet Training",
    image: image3,
  },
];

const HeroSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev < heroData.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[120vh] w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${heroData[slideIndex].image.src})`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-950/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-12 md:px-24 max-w-3xl ">
        <AnimatePresence mode="wait">
          <motion.h1
            key={heroData[slideIndex].text}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-left"
          >
            {heroData[slideIndex].text}
          </motion.h1>
        </AnimatePresence>

        <motion.div
          key={slideIndex + "-cta"}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex justify-start"
        >
          <a
            href="#plans"
            className="bg-white text-gray-900 font-semibold rounded-full flex items-center gap-4 px-6 py-3 hover:bg-[#0f4077] hover:text-white transition duration-300 shadow-lg"
          >
            Learn More
            <span className="bg-[#0f4077] text-white p-3 rounded-full">
              <FaArrowRight />
            </span>
          </a>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-start gap-3 mt-12">
          {heroData.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                i === slideIndex
                  ? "bg-[#0f4077] border-[#0f4077] scale-110"
                  : "border-white hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
