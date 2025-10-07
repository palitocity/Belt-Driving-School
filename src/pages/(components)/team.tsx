"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Instructor {
  _id: string;
  fullName: string;
  email: string;
  profileImage?: string;
  instructorDetails?: {
    specialization?: string;
    experienceYears?: number;
  };
}

export default function TeamPage() {
  const [team, setTeam] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          "https://belt-driving-school.vercel.app/api/authteam/all"
        );
        setTeam(res.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Meet Our Instructors
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our professional instructors are dedicated to making every driving
          experience safe, enjoyable, and educational.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading team...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
              >
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src={
                      member.profileImage ||
                      "https://cdn-icons-png.flaticon.com/512/219/219986.png"
                    }
                    alt={member.fullName}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.fullName}
                </h3>
                <p className="text-gray-500 mt-1">
                  {member.instructorDetails?.specialization || "Driving Expert"}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {member.instructorDetails?.experienceYears
                    ? `${member.instructorDetails.experienceYears} years of experience`
                    : "Experience not listed"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
