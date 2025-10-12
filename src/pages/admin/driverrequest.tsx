import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import {
  Car,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

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

const DriverRequest = () => {
  const [requests, setRequests] = useState<DriverRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<DriverRequest | null>(
    null
  );

  const getRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/admin/dashboard/drivers-list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching driver requests:", error);
      toast.error("Failed to load driver requests");
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    try {
      await axios.delete(
        `https://belt-driving-school-backend-3.onrender.com/api/hire/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Request deleted successfully");
      getRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(
        `https://belt-driving-school-backend-3.onrender.com/api/hire/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Status updated to ${status}`);
      getRequests();
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const filteredRequests = requests.filter(
    (request) =>
      (request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.phone.includes(searchTerm)) &&
      (filterStatus === "all" || request.status === filterStatus)
  );

  console.log(requests);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;

  return (
    <Adminlayouts>
      <Head>
        <title>Driver Requests | Admin</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#0A2E57] to-[#083152] rounded-xl">
              <Car className="w-7 h-7 text-white" />
            </div>
            Driver Hire Requests
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and review driver hire requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  Total Requests
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {requests.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  Pending
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {pendingCount}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="w-7 h-7 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  Approved
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {approvedCount}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  Rejected
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {rejectedCount}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <XCircle className="w-7 h-7 text-red-600" />
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
                placeholder="Search by name, email, or phone..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-[#0A2E57] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="p-6 bg-gray-100 rounded-full mb-4">
                <Car className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No requests found
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search or filters"
                  : "No driver hire requests yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Client Info
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Driver Details
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Contract
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-gray-800">
                              {request.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span>{request.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{request.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">
                              Type:
                            </span>{" "}
                            <span className="text-gray-600 capitalize">
                              {request.driverType}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="line-clamp-1">
                              {request.address}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">
                              {request.contractType}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span>{request.duration} months</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteRequest(request._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Request Details */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                Request Details
              </h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Name
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedRequest.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Email
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedRequest.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Phone
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedRequest.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Driver Type
                  </label>
                  <p className="text-gray-800 font-medium capitalize">
                    {selectedRequest.driverType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Contract Type
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedRequest.contractType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Duration
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedRequest.duration} months
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-600">
                    Address
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedRequest.address}
                  </p>
                </div>
                {selectedRequest.note && (
                  <div className="col-span-2">
                    <label className="text-sm font-semibold text-gray-600">
                      Additional Notes
                    </label>
                    <p className="text-gray-800 font-medium">
                      {selectedRequest.note}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => updateStatus(selectedRequest._id, "approved")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(selectedRequest._id, "rejected")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Adminlayouts>
  );
};

export default DriverRequest;
