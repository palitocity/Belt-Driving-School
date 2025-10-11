"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Instructor {
  _id: string;
  name: string;
  fullName?: string;
  email: string;
  image?: string;
  role: string;
  bio?: string;
}

export default function TeamPage() {
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
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our professional team is dedicated to making every driving experience
          safe, enjoyable, and educational.
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
                <div className="w-32 h-32 mx-auto mb-10 relative">
                  <Image
                    src={member.image ?? "/default-avatar.png"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl mt-6 font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-500 mt-1">{member.role}</p>
                <p className="text-sm text-gray-400 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
