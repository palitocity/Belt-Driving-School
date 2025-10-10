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
  MessageSquare,
  Mail,
  Send,
  Eye,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";

type Stats = {
  totalUsers?: number;
  totalAdmins?: number;
  totalStudents?: number;
  totalInstructors?: number;
  totalOrders?: number;
  paidOrders?: number;
  totalContacts?: number;
  totalConsults?: number;
};

type Newsletter = {
  _id: string;
  subject: string;
  content: string;
  sentAt: string;
  recipientsCount: number;
};

const Main = () => {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({});
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loadingNewsletters, setLoadingNewsletters] = useState(false);

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

  const getRecentNewsletters = async () => {
    setLoadingNewsletters(true);
    try {
      const response = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/admin/newsletters?limit=5",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewsletters(response.data.slice(0, 5)); // Get only the 5 most recent
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoadingNewsletters(false);
    }
  };

  useEffect(() => {
    getStats();
    getRecentNewsletters();
  }, []);

  const handleCreateNewsletter = () => {
    router.push("/admin/newsletter/create"); // Adjust route as needed
  };

  const handleViewAllNewsletters = () => {
    router.push("/admin/newsletters"); // Adjust route as needed
  };

  return (
    <Adminlayouts>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <div className="space-y-6">
        {/* HEADER WITH NEWSLETTER BUTTON */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <button
            onClick={handleCreateNewsletter}
            className="flex items-center gap-2 px-4 py-2 bg-[#0A2E57] text-white rounded-lg hover:bg-[#083152] transition shadow-md"
          >
            <Send className="w-4 h-4" />
            Send Newsletter
          </button>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <Users className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Total Users</h3>
              <p className="text-xl font-bold">{stats.totalUsers || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <Award className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Instructors</h3>
              <p className="text-xl font-bold">{stats.totalInstructors || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <Users className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Students</h3>
              <p className="text-xl font-bold">{stats.totalStudents || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <Mail className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Newsletters Sent</h3>
              <p className="text-xl font-bold">{newsletters.length}</p>
            </div>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <Car className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Total Orders</h3>
              <p className="text-xl font-bold">{stats.totalOrders || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <CreditCard className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Paid Orders</h3>
              <p className="text-xl font-bold">₦{stats.paidOrders || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <MessageSquare className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Contact Messages</h3>
              <p className="text-xl font-bold">{stats.totalContacts || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition">
            <Bell className="w-10 h-10 text-[#0A2E57]" />
            <div>
              <h3 className="text-sm text-gray-500">Consultations</h3>
              <p className="text-xl font-bold">{stats.totalConsults || 0}</p>
            </div>
          </div>
        </div>

        {/* CHART + SCHEDULE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5" /> Upcoming Lessons
            </h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex justify-between p-2 hover:bg-gray-50 rounded transition">
                <span>John Doe - Basic Driving</span>
                <span className="text-gray-400">10:00 AM</span>
              </li>
              <li className="flex justify-between p-2 hover:bg-gray-50 rounded transition">
                <span>Jane Smith - Highway Training</span>
                <span className="text-gray-400">1:30 PM</span>
              </li>
              <li className="flex justify-between p-2 hover:bg-gray-50 rounded transition">
                <span>Michael Lee - License Prep</span>
                <span className="text-gray-400">4:00 PM</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5" /> Revenue Overview
            </h2>
            <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed rounded-lg">
              📊 Revenue Chart Here
            </div>
          </div>
        </div>

        {/* RECENT NEWSLETTERS SECTION */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="w-5 h-5" /> Recent Newsletters
            </h2>
            <button
              onClick={handleViewAllNewsletters}
              className="flex items-center gap-1 text-sm text-[#0A2E57] hover:underline"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {loadingNewsletters ? (
            <div className="text-center py-8 text-gray-500">
              <div className="inline-block w-6 h-6 border-2 border-[#0A2E57] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2">Loading newsletters...</p>
            </div>
          ) : newsletters.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No newsletters sent yet</p>
              <button
                onClick={handleCreateNewsletter}
                className="px-4 py-2 bg-[#0A2E57] text-white rounded-lg hover:bg-[#083152] transition"
              >
                Send Your First Newsletter
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {newsletters.map((newsletter) => (
                <div
                  key={newsletter._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                  onClick={() =>
                    router.push(`/admin/newsletters/${newsletter._id}`)
                  }
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {newsletter.subject}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Sent to {newsletter.recipientsCount} recipients •{" "}
                      {new Date(newsletter.sentAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/admin/newsletters/${newsletter._id}`);
                    }}
                    className="p-2 text-[#0A2E57] hover:bg-[#0A2E57] hover:text-white rounded-lg transition"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Main;
