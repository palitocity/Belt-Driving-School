import React, { useEffect, useState } from "react";

import Head from "next/head";
import {
  Users,
  Car,
  CreditCard,
  Award,
  Calendar,
  Bell,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import InstructorLayouts from "../layouts/Instructorlayout";

type Stats = {
  totalStudents?: number;
  totalInstructors?: number;
  paidOrders?: number;
  totalOrders?: number;
  totalEarnings?: number;
  recentStudents?: {
    fullName: string;
    email: string;
    courseLevel: string;
    progress: number;
  }[];
};

const Main = () => {
  const [stats, setStats] = useState<Stats>({});

  const getStats = async () => {
    try {
      const response = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/instructor/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStats(response.data);
      console.log("Dashboard stats:", response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <InstructorLayouts>
      <Head>
        <title>Instructor Dashboard</title>
      </Head>

      <div className="space-y-6">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Students</p>
                <h3 className="text-2xl font-semibold">
                  {stats.totalStudents || 0}
                </h3>
              </div>
              <Users className="text-blue-500 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Courses Assigned</p>
                <h3 className="text-2xl font-semibold">
                  {stats.totalOrders || 0}
                </h3>
              </div>
              <Car className="text-green-500 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Paid Orders</p>
                <h3 className="text-2xl font-semibold">
                  {stats.paidOrders || 0}
                </h3>
              </div>
              <CreditCard className="text-purple-500 w-8 h-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Earnings</p>
                <h3 className="text-2xl font-semibold">
                  ₦{stats.totalEarnings || 0}
                </h3>
              </div>
              <TrendingUp className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* RECENT STUDENTS */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            Recent Students
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="text-left text-gray-600 dark:text-gray-300 text-sm">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Course Level</th>
                  <th className="p-3">Progress</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentStudents && stats.recentStudents.length > 0 ? (
                  stats.recentStudents.map((student, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="p-3">{student.fullName}</td>
                      <td className="p-3">{student.email}</td>
                      <td className="p-3">{student.courseLevel}</td>
                      <td className="p-3">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {student.progress}%
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 p-4">
                      No students assigned yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ACTIVITY / NOTIFICATIONS */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-500" />
            Recent Activities
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>New student enrolled in your Beginner course.</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>John Doe completed 80% of his Intermediate training.</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>
                Your class attendance rate increased by 15% this week.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </InstructorLayouts>
  );
};

export default Main;
