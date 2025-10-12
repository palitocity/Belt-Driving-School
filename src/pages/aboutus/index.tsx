import React, { useEffect, useState } from "react";
import {
  Award,
  Users,
  Shield,
  Target,
  BookOpen,
  Car,
  Clock,
  UserCheck,
  CheckCircle,
  TrendingUp,
  Heart,
} from "lucide-react";
import Homelayouts from "../layouts/Homelayouts";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

interface Instructor {
  _id: string;
  name: string;
  fullName?: string;
  email: string;
  image?: string;
  role: string;
  bio?: string;
}

const AboutUs = () => {
  const partners = [
    {
      name: "AutoMaster Academy",
      logo: "",
      description: "A trusted partner in advanced vehicle training programs.",
    },
    {
      name: "DrivePro Institute",
      logo: "",
      description: "Experts in safe driving and road awareness campaigns.",
    },
    {
      name: "CityAuto Garage",
      logo: "",
      description:
        "Providing our students with hands-on car maintenance sessions.",
    },
  ];

  const offers = [
    {
      icon: BookOpen,
      title: "Beginner Driving Lessons",
      desc: "Tailored for new drivers who want to build strong driving foundations.",
    },
    {
      icon: TrendingUp,
      title: "Refresher Courses",
      desc: "Perfect for licensed drivers who want to regain confidence or improve specific driving skills.",
    },
    {
      icon: Shield,
      title: "Defensive Driving Training",
      desc: "Learn how to anticipate hazards, avoid accidents, and drive responsibly under any condition.",
    },
    {
      icon: CheckCircle,
      title: "Road Test Preparation",
      desc: "Focused sessions to help you master test routes, maneuvers, and road rules for exam success.",
    },
    {
      icon: UserCheck,
      title: "Private & Customized Lessons",
      desc: "Flexible one-on-one sessions designed around your skill level and schedule.",
    },
    {
      icon: Target,
      title: "Theory & Traffic Education",
      desc: "Classroom and online sessions covering traffic laws, road signs, and safety awareness.",
    },
  ];

  const reasons = [
    {
      icon: Award,
      title: "Experienced & Certified Instructors",
      desc: "Our instructors are professionally trained, patient, and certified to deliver high-quality driving lessons that match your learning pace.",
    },
    {
      icon: Car,
      title: "Modern, Well-Maintained Vehicles",
      desc: "We use up-to-date vehicles equipped with dual controls and safety features to ensure a smooth and secure learning environment.",
    },
    {
      icon: Clock,
      title: "Flexible Lesson Schedules",
      desc: "We offer flexible lesson times — mornings, evenings, and weekends — to fit your busy lifestyle.",
    },
    {
      icon: Target,
      title: "Comprehensive Training Programs",
      desc: "From beginner to advanced levels, our courses build confidence through both basic and defensive driving techniques.",
    },
    {
      icon: Heart,
      title: "Personalized Learning Experience",
      desc: "Each lesson is tailored to your needs and comfort level to help you progress faster and drive better.",
    },
    {
      icon: Shield,
      title: "Focus on Road Safety",
      desc: "We emphasize safe driving habits and awareness — helping you stay safe long after earning your license.",
    },
  ];

  const router = useRouter();

  const [team, setTeam] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          "https://belt-driving-school-backend-3.onrender.com/api/auth/team/all"
        );

        // Sort team so CEO appears first
        const sortedTeam = res.data.sort((a: Instructor, b: Instructor) => {
          if (a.role.toLowerCase() === "ceo") return -1;
          if (b.role.toLowerCase() === "ceo") return 1;
          return 0;
        });

        setTeam(sortedTeam);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <Homelayouts>
      <div className="bg-white">
        {/* Hero Section with Diagonal Design */}
        <section className="relative bg-[#0A2E57] pt-32 pb-24 px-6 lg:px-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E02828] opacity-10 transform skew-x-12 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E02828] opacity-5 rounded-full -translate-x-1/2 translate-y-1/2"></div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-block mb-4 px-6 py-2 bg-[#E02828] rounded-full">
              <span className="text-white font-semibold text-sm tracking-wide">
                WHO WE ARE
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About <span className="text-[#E02828]">Belt Driving School</span>
            </h1>
            <p className="text-gray-300 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              At Belt Driving School, we believe that safe driving starts with
              proper training, patience, and confidence behind the wheel. Our
              goal is to turn every student into a responsible, skilled, and
              confident driver.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E02828] mb-2">
                  2000+
                </div>
                <div className="text-gray-300 text-sm">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E02828] mb-2">
                  98%
                </div>
                <div className="text-gray-300 text-sm">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#E02828] mb-2">
                  15+
                </div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-24 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-5 py-2 border-2 border-[#E02828] rounded-full">
                <span className="text-[#E02828] font-semibold text-sm tracking-wide">
                  OUR SERVICES
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2E57] mb-4">
                What We Offer
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive training programs designed to meet every
                driver&lsquo;s needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#E02828]"
                  >
                    <div className="w-14 h-14 bg-[#0A2E57] group-hover:bg-[#E02828] rounded-xl flex items-center justify-center mb-5 transition-all duration-300">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A2E57] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 px-6 lg:px-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-5 py-2 border-2 border-[#0A2E57] rounded-full">
                <span className="text-[#0A2E57] font-semibold text-sm tracking-wide">
                  WHY CHOOSE US
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2E57] mb-4">
                Your Success is Our Priority
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover what makes Belt Driving School the trusted choice for
                thousands of students
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E02828] opacity-0 group-hover:opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-300"></div>

                    <div className="w-12 h-12 bg-[#E02828] bg-opacity-10 rounded-lg flex items-center justify-center mb-5">
                      <Icon className="text-[#E02828]" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0A2E57] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-24 px-6 lg:px-20 bg-[#0A2E57]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-5 py-2 bg-[#E02828] rounded-full">
                <span className="text-white font-semibold text-sm tracking-wide">
                  OUR TEAM
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Meet Our Expert Instructors
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Dedicated professionals committed to your driving success
              </p>
            </div>
            {loading ? (
              <p className="text-gray-500">Loading team...</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((member, i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-72 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      {/* Profile Image */}
                      <div className="w-32 h-32 relative mb-6">
                        <Image
                          src={member.image ?? ""}
                          alt={member.name || "Instructor"}
                          width={128}
                          height={128}
                          className="rounded-full object-cover border-4 border-white shadow-md w-full h-full"
                          unoptimized
                        />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#0A2E57]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Top Right Icon */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-[#E02828] rounded-full flex items-center justify-center shadow-md">
                        <Users className="text-white" size={20} />
                      </div>
                    </div>

                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-[#0A2E57] mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#E02828] font-semibold text-sm mb-4">
                        {member.role}
                      </p>
                      <div className="flex justify-center gap-4">
                        <button className="px-4 py-2 bg-[#0A2E57] text-white rounded-lg text-sm font-medium hover:bg-[#E02828] transition-colors duration-300">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Partners */}
        <section className="py-24 px-6 lg:px-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-5 py-2 border-2 border-[#E02828] rounded-full">
                <span className="text-[#E02828] font-semibold text-sm tracking-wide">
                  PARTNERSHIPS
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A2E57] mb-4">
                Our Trusted Partners
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Collaborating with industry leaders to provide you with the best
                training experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#0A2E57]"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#0A2E57] to-[#E02828] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-white">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A2E57] mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              ))}
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
              Ready to Start Your Driving Journey?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied students who chose Belt Driving School
              for their driver education
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => router.push("/auth/register")}
                className="px-8 py-4 bg-[#E02828] text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Enroll Now
              </button>
              <button
                onClick={() => router.push("/contact")}
                className="px-8 py-4 bg-white text-[#0A2E57] rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </Homelayouts>
  );
};

export default AboutUs;
