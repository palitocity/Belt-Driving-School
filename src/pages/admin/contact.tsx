/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { X, Eye, Mail, CheckCircle } from "lucide-react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";

interface ContactMessage {
  _id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [admin, setadmin] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setadmin(parsedUser);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  // ✅ Only fetch messages when admin.id exists
  useEffect(() => {
    if (admin?.id) {
      getAllMessages();
    }
  }, [admin]);

  const getAllMessages = async () => {
    if (!admin?.id) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://belt-driving-school-backend-3.onrender.com/api/contact-us/${admin.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessages(res.data);
    } catch (error) {
      toast.error("Failed to fetch messages ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Adminlayouts>
      <Head>
        <title>Contact Us Messages || Belt Driving School</title>
      </Head>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600 mb-6">
            View all messages submitted from the Contact Us page.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <p className="text-gray-600 text-sm">Total Messages</p>
              <p className="text-2xl font-bold">{messages.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <p className="text-gray-600 text-sm">Unread</p>
              <p className="text-2xl font-bold text-yellow-600">
                {messages.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <p className="text-gray-600 text-sm">Replied</p>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
          </div>

          {/* Messages Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No messages found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr
                        key={msg._id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          {msg.fullName}
                        </td>
                        <td className="px-6 py-4 text-gray-700">{msg.email}</td>
                        <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                          {msg.message}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {new Date(msg.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedMessage(msg)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Message Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Message Details
              </h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {selectedMessage.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">
                    {selectedMessage.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Message</p>
                  <div className="bg-gray-50 rounded-lg p-4 text-gray-800">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Reply
                </button>
                <button className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Mark as Replied
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Adminlayouts>
  );
}
