import React, { useEffect, useState } from "react";
import {
  X,
  Eye,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import axios from "axios";
import toast from "react-hot-toast";

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  // Get admin from localStorage

  const getAllBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.beltdrivingschool.com/api/consult `,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings(res.data.data);
      toast.success("Bookings loaded successfully ✅");
    } catch (error) {
      toast.error("Failed to fetch bookings ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const formatDateTime = (isoString: string) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await axios.put(
        `https://api.beltdrivingschool.com/api/bookings/${bookingId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Booking ${newStatus} successfully ✅`);
      getAllBookings(); // Refresh the list
      setSelectedBooking(null); // Close modal
    } catch (error) {
      toast.error("Failed to update booking ❌");
      console.error(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookings =
    statusFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  return (
    <Adminlayouts>
      <Head>
        <title>Bookings Management</title>
      </Head>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Bookings Management
            </h1>
            <p className="text-gray-600">
              View and manage all customer bookings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {bookings.filter((b) => b.status === "pending").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter((b) => b.status === "confirmed").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {bookings.filter((b) => b.status === "completed").length}
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-12 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600">
                {statusFilter === "all"
                  ? "There are no bookings yet."
                  : `No ${statusFilter} bookings found.`}
              </p>
            </div>
          ) : (
            /* Bookings Table */
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {booking.service}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDateTime(booking.date)}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {booking.fullName}
                        </p>
                        <p className="text-sm text-gray-500">{booking.id}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {booking.service}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateTime(booking.date)}</span>
                    </div>
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Booking Details
                </h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-semibold text-gray-900">
                      {selectedBooking.id}
                    </p>
                  </div>
                  {/* <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status.charAt(0).toUpperCase() +
                      selectedBooking.status.slice(1)}
                  </span> */}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Customer Name</p>
                      <p className="font-medium text-gray-900">
                        {selectedBooking.fullName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">
                        {selectedBooking.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        {selectedBooking.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium text-gray-900">
                        {selectedBooking.service}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium text-gray-900">
                        {formatDateTime(selectedBooking.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">
                        {selectedBooking.location}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Notes</p>
                    <p className="text-gray-900">{selectedBooking.notes}</p>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>
                      Booked on: {formatDateTime(selectedBooking.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() =>
                      updateBookingStatus(selectedBooking.id, "confirmed")
                    }
                    className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedBooking.status === "confirmed"}
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() =>
                      updateBookingStatus(selectedBooking.id, "cancelled")
                    }
                    className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedBooking.status === "cancelled"}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Adminlayouts>
  );
}
