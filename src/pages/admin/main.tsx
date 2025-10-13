import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import {
  Users,
  Car,
  CreditCard,
  Award,
  Bell,
  Mail,
  Eye,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
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

type DriverRequest = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contractType: string;
  driverType: string;
  duration: string;
  note?: string;
  status?: string;
  createdAt: string;
};

const Main = () => {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({});
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [driverRequests, setDriverRequests] = useState<DriverRequest[]>([]);
  const [loadingNewsletters, setLoadingNewsletters] = useState(false);
  const [loadingDriverRequests, setLoadingDriverRequests] = useState(false);

  const getStats = async () => {
    try {
      const response = await axios.get(
        "http://api.beltdrivingschool.com/api/admin/dashboard/stats",
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
        "http://api.beltdrivingschool.com/api/newsletter",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewsletters(response.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoadingNewsletters(false);
    }
  };

  const getDriverRequests = async () => {
    setLoadingDriverRequests(true);
    try {
      const response = await axios.get(
        "http://api.beltdrivingschool.com/api/admin/dashboard/drivers-list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDriverRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching driver requests:", error);
    } finally {
      setLoadingDriverRequests(false);
    }
  };

  useEffect(() => {
    getStats();
    getRecentNewsletters();
    getDriverRequests();
  }, []);

  // const handleCreateNewsletter = () => {
  //   router.push("/admin/newsletter");
  // };

  const handleViewAllNewsletters = () => {
    router.push("/admin/newsletters");
  };

  const handleViewAllDriverRequests = () => {
    router.push("/admin/driverrequest");
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const pendingRequests = driverRequests.filter(
    (r) => r.status === "pending" || !r.status
  ).length;

  return (
    <Adminlayouts>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <div className="space-y-6">
        {/* HEADER WITH NEWSLETTER BUTTON */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here&lsquo;s what&lsquo;s happening today.
            </p>
          </div>
          {/* <button
            onClick={handleCreateNewsletter}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A2E57] to-[#083152] text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
            Send Newsletter
          </button> */}
        </div>

        {/* KPI CARDS - FIRST ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 border border-blue-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-blue-600 font-semibold mb-1">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-blue-900">
                  {stats.totalUsers || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md p-6 border border-purple-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-purple-600 font-semibold mb-1">
                  Instructors
                </h3>
                <p className="text-3xl font-bold text-purple-900">
                  {stats.totalInstructors || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 border border-green-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-green-600 font-semibold mb-1">
                  Students
                </h3>
                <p className="text-3xl font-bold text-green-900">
                  {stats.totalStudents || 0}
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl shadow-md p-6 border border-indigo-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-indigo-600 font-semibold mb-1">
                  Newsletters Sent
                </h3>
                <p className="text-3xl font-bold text-indigo-900">
                  {newsletters.length}
                </p>
              </div>
              <div className="p-3 bg-indigo-500 rounded-xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* KPI CARDS - SECOND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-md p-6 border border-orange-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-orange-600 font-semibold mb-1">
                  Total Orders
                </h3>
                <p className="text-3xl font-bold text-orange-900">
                  {stats.totalOrders || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-500 rounded-xl">
                <Car className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-md p-6 border border-emerald-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-emerald-600 font-semibold mb-1">
                  Paid Orders
                </h3>
                <p className="text-3xl font-bold text-emerald-900">
                  ₦{stats.paidOrders || 0}
                </p>
              </div>
              <div className="p-3 bg-emerald-500 rounded-xl">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl shadow-md p-6 border border-cyan-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-cyan-600 font-semibold mb-1">
                  Contact Messages
                </h3>
                <p className="text-3xl font-bold text-cyan-900">
                  {stats.totalContacts || 0}
                </p>
              </div>
              <div className="p-3 bg-cyan-500 rounded-xl">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl shadow-md p-6 border border-rose-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-rose-600 font-semibold mb-1">
                  Consultations
                </h3>
                <p className="text-3xl font-bold text-rose-900">
                  {stats.totalConsults || 0}
                </p>
              </div>
              <div className="p-3 bg-rose-500 rounded-xl">
                <Bell className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* DRIVER REQUESTS AND NEWSLETTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DRIVER REQUESTS SECTION */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#0A2E57] to-[#083152] p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Driver Hire Requests
                  </h2>
                  {pendingRequests > 0 && (
                    <p className="text-sm text-blue-200">
                      {pendingRequests} pending review
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleViewAllDriverRequests}
                className="flex items-center gap-1 text-sm text-white hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {loadingDriverRequests ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="inline-block w-6 h-6 border-2 border-[#0A2E57] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-sm">Loading requests...</p>
                </div>
              ) : driverRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    No driver requests yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {driverRequests.map((request) => (
                    <div
                      key={request._id}
                      className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-[#0A2E57]/30 hover:bg-gray-50 transition-all cursor-pointer"
                      onClick={() => router.push(`/admin/driverrequests`)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800">
                            {request.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status || "pending"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {request.driverType} • {request.contractType} •{" "}
                          {request.duration} months
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {request.status === "pending" || !request.status ? (
                          <Clock className="w-5 h-5 text-yellow-500" />
                        ) : request.status === "approved" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* NEWSLETTERS SECTION */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#0A2E57] to-[#083152] p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Recent Newsletters
                </h2>
              </div>
              <button
                onClick={handleViewAllNewsletters}
                className="flex items-center gap-1 text-sm text-white hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              {loadingNewsletters ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="inline-block w-6 h-6 border-2 border-[#0A2E57] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-sm">Loading newsletters...</p>
                </div>
              ) : newsletters.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4 text-sm">
                    No newsletters sent yet
                  </p>
                  {/* <button
                    onClick={handleCreateNewsletter}
                    className="px-4 py-2 bg-[#0A2E57] text-white rounded-lg hover:bg-[#083152] transition text-sm"
                  >
                    Send Your First Newsletter
                  </button> */}
                </div>
              ) : (
                <div className="space-y-3">
                  {newsletters.map((newsletter) => (
                    <div
                      key={newsletter._id}
                      className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-xl hover:border-[#0A2E57]/30 hover:bg-gray-50 transition-all cursor-pointer"
                      onClick={() =>
                        router.push(`/admin/newsletters/${newsletter._id}`)
                      }
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {newsletter.subject}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {newsletter.recipientsCount} recipients •{" "}
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
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Main;
