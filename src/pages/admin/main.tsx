import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
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

type Stats = {
  totalStudents?: number;
  totalInstructors?: number;
  paidOrders?: number;
  totalOrders?: number;
  // Add other properties as needed
};

const Main = () => {
  const [stats, setStats] = useState<Stats>({});

  const getStats = async () => {
    try {
      const response = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/admin/dashboard/stats",
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
    <Adminlayouts>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <div className="space-y-6">
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <Users className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Total Students</h3>
              <p className="text-xl font-bold">{stats.totalStudents || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <Award className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Instructors</h3>
              <p className="text-xl font-bold">{stats.totalInstructors || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <Car className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Total Order</h3>
              <p className="text-xl font-bold">{stats.totalOrders || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <CreditCard className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Paid Orders</h3>
              <p className="text-xl font-bold">₦{stats.paidOrders || 0}</p>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: SCHEDULE + REVENUE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule */}
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Upcoming Lessons
              </h2>
              <button className="text-sm text-[#0A2E57] hover:underline">
                View All
              </button>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>John Doe - Basic Driving</span>
                <span className="text-gray-400">10:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Jane Smith - Highway Training</span>
                <span className="text-gray-400">1:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Michael Lee - License Prep</span>
                <span className="text-gray-400">4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" /> Revenue Overview
            </h2>
            {/* Placeholder for chart */}
            <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
              📊 Revenue Chart Here
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: ACTIVITIES + NOTIFICATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Activities
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                ✅ New student <b>David</b> enrolled in Beginner Course.
              </li>
              <li>
                💳 Payment of ₦50,000 received from <b>Sarah</b>.
              </li>
              <li>
                🚘 Instructor <b>Mr. Ade</b> completed a training session.
              </li>
              <li>
                🎓 License processed for <b>John Doe</b>.
              </li>
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5" /> Notifications
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                ⚠ Student <b>Mike</b> missed yesterday’s class.
              </li>
              <li className="p-2 bg-red-50 border-l-4 border-red-400 rounded">
                ❌ Payment overdue from <b>Anna</b>.
              </li>
              <li className="p-2 bg-blue-50 border-l-4 border-blue-400 rounded">
                📅 License test scheduled for <b>Friday</b>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Main;
