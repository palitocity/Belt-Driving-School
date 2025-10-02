"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import car1 from "../../../assets/Insight-One-Car-Per-Student-Banner.png";
import car2 from "../../../assets/Insight-One-Car-Per-Student-Banner.png";
import car3 from "../../../assets/Insight-One-Car-Per-Student-Banner.png";

const Hero = () => {
  const slides = [
    {
      image: car1,
      badge: "Nigeria's Premier Driving School",
      title: "Master the Road with",
      highlight: "Confidence & Skill",
      description:
        "Professional driving instruction tailored to your pace. From beginner to advanced, we'll get you road-ready.",
      primaryBtn: "Start Your Journey",
      secondaryBtn: "View Our Courses",
    },
    {
      image: car2,
      badge: "One Car Per Student",
      title: "Learn to Drive with",
      highlight: "Expert Instructors",
      description:
        "Get personalized attention with our one-on-one training approach. Experience the difference quality instruction makes.",
      primaryBtn: "Enroll Today",
      secondaryBtn: "Learn More",
    },
    {
      image: car3,
      badge: "95% Pass Rate",
      title: "Get Your License",
      highlight: "The Right Way",
      description:
        "Comprehensive training programs designed to help you pass your driving test with confidence on the first try.",
      primaryBtn: "Book a Lesson",
      secondaryBtn: "See Our Results",
    },
  ];

  return (
    <section className="relative w-full md:h-[110vh] h-[160vh]  mt-[90px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletActiveClass: "!bg-[#E02828]",
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={`Belt Driving School - Slide ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E57]/95 via-[#0A2E57]/85 to-[#0A2E57]/70"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 px-6 md:px-12 max-w-5xl w-full text-center">
                {/* Badge */}
                <div className="flex justify-center mb-6 animate-fade-in">
                  <div className="bg-[#E02828] text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg">
                    {slide.badge}
                  </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight animate-slide-up">
                  {slide.title}
                  <span className="block text-[#E02828] mt-2">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up-delay">
                  {slide.description}
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in-delay">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium">
                    ✓ One Car Per Student
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium">
                    ✓ Licensed Instructors
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium">
                    ✓ Flexible Schedules
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium">
                    ✓ 95% Pass Rate
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
                  <button className="group relative bg-[#E02828] text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                    <span className="relative z-10">{slide.primaryBtn}</span>
                    <div className="absolute inset-0 bg-[#C02020] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>

                  <button className="bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-[#0A2E57] transition-all duration-300 w-full sm:w-auto">
                    {slide.secondaryBtn}
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-delay-3">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#E02828] mb-1">
                      15+
                    </div>
                    <div className="text-white/80 text-sm">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#E02828] mb-1">
                      10K+
                    </div>
                    <div className="text-white/80 text-sm">
                      Students Trained
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#E02828] mb-1">
                      50+
                    </div>
                    <div className="text-white/80 text-sm">
                      Expert Instructors
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#E02828] mb-1">
                      95%
                    </div>
                    <div className="text-white/80 text-sm">Pass Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styling */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 6px;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.8s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 1s both;
        }
      `}</style>
    </section>
  );
};

export default Hero;
