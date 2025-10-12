import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import { Mail, Send, Search, Filter, Users, TrendingUp } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Subscriber = {
  _id: string;
  email: string;
  createdAt: string;
};

const Newsletter = () => {
  const router = useRouter();
  const [newsletters, setNewsletters] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getNewsletters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/newsletter",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewsletters(response.data);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      toast.error("Failed to load newsletters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewsletters();
  }, []);

  const filteredSubscribers = newsletters.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Adminlayouts>
      <Head>
        <title>Newsletter Management | Admin</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#0A2E57] to-[#083152] rounded-xl">
                <Mail className="w-7 h-7 text-white" />
              </div>
              Newsletter Management
            </h1>
            <p className="text-gray-600 mt-2">
              Create and manage email newsletters
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/newsletter")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A2E57] to-[#083152] text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Send className="w-5 h-5" />
            Create Newsletter
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-semibold mb-1">
                  Total Sent
                </p>
                <p className="text-3xl font-bold text-blue-900">
                  {newsletters.length}
                </p>
              </div>
              <div className="p-4 bg-blue-500 rounded-xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-semibold mb-1">
                  Total Recipients
                </p>
                <p className="text-3xl font-bold text-green-900"></p>
              </div>
              <div className="p-4 bg-green-500 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-semibold mb-1">
                  Avg. Recipients
                </p>
                <p className="text-3xl font-bold text-purple-900">
                  {newsletters.length > 0}
                </p>
              </div>
              <div className="p-4 bg-purple-500 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search newsletters by subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0A2E57] focus:ring-2 focus:ring-[#0A2E57]/20 focus:outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0A2E57] focus:ring-2 focus:ring-[#0A2E57]/20 focus:outline-none transition-all appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="sent">Sent</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Newsletters List */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-[#0A2E57] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading newsletters...</p>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="p-6 bg-gray-100 rounded-full mb-4">
                <Mail className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No newsletters found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm
                  ? "Try adjusting your search"
                  : "Start by creating your first newsletter"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push("/admin/newsletter/create")}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0A2E57] text-white rounded-xl hover:bg-[#083152] transition"
                >
                  <Send className="w-5 h-5" />
                  Create Newsletter
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Recipients
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Sent Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubscribers.map((subscriber) => (
                    <tr
                      key={subscriber._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(subscriber.createdAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Newsletter;
