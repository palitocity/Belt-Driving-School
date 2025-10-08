import React from "react";
import {
  Clock,
  Car,
  CheckCircle,
  FileText,
  Award,
  Shield,
  Users,
  Calendar,
  Target,
  ArrowRight,
  Star,
} from "lucide-react";
import Homelayouts from "../layouts/Homelayouts";

const DrivingTraining = () => {
  const trainings = [
    {
      title: "Beginner Training",
      description:
        "Perfect for new learners. Master the basics of driving, traffic signs, and car control with patient instructors.",
      duration: "4 Weeks",
      price: "₦120,000",
      image: "",
      level: "Basic",
      features: [
        "Traffic Rules",
        "Car Control",
        "Road Signs",
        "Basic Maneuvers",
      ],
      popular: false,
    },
    {
      title: "Intermediate Training",
      description:
        "For those who know the basics but want to improve road confidence and maneuvering in city traffic.",
      duration: "6 Weeks",
      price: "₦180,000",
      image: "",
      level: "Intermediate",
      features: [
        "City Driving",
        "Highway Skills",
        "Parking Mastery",
        "Night Driving",
      ],
      popular: true,
    },
    {
      title: "Advanced Defensive Driving",
      description:
        "Learn professional-level driving, accident prevention, and safety awareness for high-performance handling.",
      duration: "8 Weeks",
      price: "₦250,000",
      image: "",
      level: "Advanced",
      features: [
        "Hazard Awareness",
        "Emergency Control",
        "Advanced Safety",
        "Professional Skills",
      ],
      popular: false,
    },
  ];

  const licenseSteps = [
    {
      number: "01",
      title: "Learner's Permit",
      desc: "We assist you in applying for a learner's permit through FRSC with all the needed documentation.",
      icon: FileText,
    },
    {
      number: "02",
      title: "Training & Test",
      desc: "Complete your driving course and undergo the standard road and theory tests with our guidance.",
      icon: Target,
    },
    {
      number: "03",
      title: "Driver's License Application",
      desc: "We guide you step-by-step in submitting your application for a full driver's license through the official channels.",
      icon: Award,
    },
  ];

  const benefits = [
    { icon: Users, text: "Expert Certified Instructors" },
    { icon: Car, text: "Modern Training Vehicles" },
    { icon: Shield, text: "100% Safety Guaranteed" },
    { icon: Calendar, text: "Flexible Scheduling" },
  ];

  return (
    <Homelayouts>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0A2E57] via-[#0d3a6e] to-[#0A2E57] pt-32 pb-24 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#E02828] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-40 w-96 h-96 bg-[#E02828] rounded-full blur-3xl"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-6 py-2 bg-[#E02828] rounded-full">
                <span className="text-white font-semibold text-sm tracking-wide">
                  PROFESSIONAL TRAINING
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Driving Training &<br />
                <span className="text-[#E02828]">Driver Licenses</span>
              </h1>
              <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                Get trained, certified, and licensed with Belt Driving School.
                Whether you&lsquo;re new to driving or aiming for your official
                driver&lsquo;s license, our programs ensure you&lsquo;re
                road-ready and confident.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={i}
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-center border border-white border-opacity-20"
                  >
                    <Icon className="text-[#E02828] mx-auto mb-2" size={32} />
                    <p className="text-white text-sm font-medium">
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Training Packages */}
        <section className="py-24 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-5 py-2 border-2 border-[#E02828] rounded-full">
                <span className="text-[#E02828] font-semibold text-sm tracking-wide">
                  TRAINING PACKAGES
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2E57] mb-4">
                Choose Your Training Path
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Select the perfect training package that matches your skill
                level and goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainings.map((plan, i) => (
                <div
                  key={i}
                  className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    plan.popular
                      ? "ring-4 ring-[#E02828] ring-opacity-50 transform lg:-translate-y-4"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-[#E02828] text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star size={12} fill="white" />
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  {/* Image Section with Overlay */}
                  <div className="relative h-48 bg-gradient-to-br from-[#0A2E57] to-[#0d3a6e] overflow-hidden">
                    <div className="absolute inset-0 bg-[#E02828] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Car className="text-white opacity-20" size={80} />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-semibold">
                        {plan.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0A2E57] mb-3">
                      {plan.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6 space-y-2">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle
                            className="text-[#E02828] flex-shrink-0"
                            size={18}
                          />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Duration and Price */}
                    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Clock className="text-[#0A2E57]" size={20} />
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-sm font-semibold text-[#0A2E57]">
                            {plan.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-xl font-bold text-[#E02828]">
                          {plan.price}
                        </p>
                      </div>
                    </div>

                    <button
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-[#E02828] text-white hover:bg-red-700 shadow-lg"
                          : "bg-[#0A2E57] text-white hover:bg-[#071d3e]"
                      }`}
                    >
                      Enroll Now
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* License Steps */}
        <section className="py-24 px-6 lg:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-5 py-2 border-2 border-[#0A2E57] rounded-full">
                <span className="text-[#0A2E57] font-semibold text-sm tracking-wide">
                  LICENSE PROCESS
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2E57] mb-4">
                How to Get Your Driver&lsquo;s License
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Follow our simple three-step process to obtain your official
                driver&lsquo;s license
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connection Lines */}
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#0A2E57] via-[#E02828] to-[#0A2E57] opacity-20"></div>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {licenseSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="relative">
                      <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#E02828] hover:shadow-xl transition-all duration-300 h-full">
                        {/* Step Number Badge */}
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#0A2E57] to-[#E02828] rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl font-bold">
                            {step.number}
                          </span>
                        </div>

                        {/* Icon */}
                        <div className="w-16 h-16 bg-[#E02828] bg-opacity-10 rounded-xl flex items-center justify-center mb-6 mt-4">
                          <Icon className="text-[#E02828]" size={32} />
                        </div>

                        <h3 className="text-xl font-bold text-[#0A2E57] mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-center mt-16">
              <button className="group bg-[#0A2E57] text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-[#E02828] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3">
                Start License Application
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-24 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4 px-5 py-2 bg-[#E02828] rounded-full">
                  <span className="text-white font-semibold text-sm tracking-wide">
                    WHY US
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-[#0A2E57] mb-6">
                  Why Train With Belt Driving School?
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  We combine professional expertise with personalized attention
                  to ensure every student becomes a confident, safe, and skilled
                  driver.
                </p>

                <div className="space-y-4">
                  {[
                    "98% first-time pass rate",
                    "Certified and experienced instructors",
                    "Modern, well-maintained training vehicles",
                    "Flexible scheduling for your convenience",
                    "Comprehensive theory and practical training",
                    "Full support for license application",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#E02828] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-[#0A2E57] to-[#0d3a6e] rounded-3xl p-12 shadow-2xl">
                  <div className="text-center text-white space-y-8">
                    <div>
                      <div className="text-6xl font-bold text-[#E02828] mb-2">
                        2000+
                      </div>
                      <div className="text-gray-300">Students Trained</div>
                    </div>
                    <div className="h-px bg-white opacity-20"></div>
                    <div>
                      <div className="text-6xl font-bold text-[#E02828] mb-2">
                        98%
                      </div>
                      <div className="text-gray-300">Pass Rate</div>
                    </div>
                    <div className="h-px bg-white opacity-20"></div>
                    <div>
                      <div className="text-6xl font-bold text-[#E02828] mb-2">
                        15+
                      </div>
                      <div className="text-gray-300">Years Experience</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#E02828] rounded-2xl opacity-20 -z-10"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#0A2E57] rounded-2xl opacity-20 -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-6 lg:px-20 bg-gradient-to-r from-[#0A2E57] to-[#0d3a6e] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E02828] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E02828] rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Behind the Wheel?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of successful drivers who trained with Belt Driving
              School. Enroll today and start your journey to becoming a
              licensed, confident driver.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group px-8 py-4 bg-[#E02828] text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2">
                Enroll Now
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button className="px-8 py-4 bg-white text-[#0A2E57] rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Download Brochure
              </button>
            </div>
          </div>
        </section>
      </div>
    </Homelayouts>
  );
};

export default DrivingTraining;
