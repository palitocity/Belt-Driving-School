import React, { useEffect, useState } from "react";
import {
  Clock,
  Car,
  CheckCircle,
  Shield,
  Users,
  Calendar,
  ArrowRight,
  Star,
} from "lucide-react";
import Homelayouts from "../layouts/Homelayouts";
import axios, { isAxiosError } from "axios";
import { toast } from "react-hot-toast";

// ✅ Define your Plan type
interface Plan {
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  level: string;
  features: string[];
  popular: boolean;
}

const DrivingTraining = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.beltdrivingschool.com/api/auth/plans"
      );
      setPlans(res.data as Plan[]);
      console.log(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        const apiError = error.response?.data?.error;
        const fallback = error.message || "An unexpected error occurred";

        const errorMsg =
          `${apiMessage || ""}${apiError ? " - " + apiError : ""}`.trim() ||
          fallback;

        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const benefits = [
    { icon: Users, text: "Expert Certified Instructors" },
    { icon: Car, text: "Modern Training Vehicles" },
    { icon: Shield, text: "100% Safety Guaranteed" },
    { icon: Calendar, text: "Flexible Scheduling" },
  ];

  return (
    <Homelayouts>
      <div className="bg-white">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-[#0A2E57] via-[#0d3a6e] to-[#0A2E57] pt-32 pb-24 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#E02828] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-40 w-96 h-96 bg-[#E02828] rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-block mb-4 px-6 py-2 bg-[#E02828] rounded-full">
              <span className="text-white font-semibold text-sm tracking-wide">
                PROFESSIONAL TRAINING
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Driving Training & <br />
              <span className="text-[#E02828]">Driver Licenses</span>
            </h1>
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              Get trained, certified, and licensed with Belt Driving School.
              Whether you&lsquo;re new to driving or aiming for your official
              driver&lsquo;s license, our programs ensure you&lsquo;re
              road-ready and confident.
            </p>

            {/* Benefits */}
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

        {/* TRAINING PACKAGES */}
        <section className="py-24 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <div className="inline-block mb-4 px-5 py-2 border-2 border-[#E02828] rounded-full">
              <span className="text-[#E02828] font-semibold text-sm tracking-wide">
                TRAINING PACKAGES
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2E57] mb-4">
              Choose Your Training Path
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Select the perfect training package that matches your skill level
              and goals
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading plans...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
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

                  <div className="relative h-48 bg-gradient-to-br from-[#0A2E57] to-[#0d3a6e] overflow-hidden">
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

                    <div className="mb-6 space-y-2">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="text-[#E02828]" size={18} />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

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
                          ₦{plan.price}
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
          )}
        </section>
      </div>
    </Homelayouts>
  );
};

export default DrivingTraining;
