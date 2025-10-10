import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Head from "next/head";
import { MoreVertical, Search, Filter, Download, Eye, X } from "lucide-react";

interface Payment {
  _id: string;
  planName: string;
  price: number;
  currency: string;
  status: string;
  fullName: string;
  email: string;
  createdAt: string;
}

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const getAllPayments = async () => {
    try {
      const response = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/admin/dashboard/transactions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPayments(response.data);
      setFilteredPayments(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to load payments");
      } else {
        toast.error("Failed to load payments");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.planName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.status === statusFilter);
    }

    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, payments]);

  const handleExportCSV = () => {
    const csvContent = [
      [
        "Full Name",
        "Email",
        "Plan Name",
        "Amount",
        "Currency",
        "Date",
        "Status",
      ],
      ...filteredPayments.map((p) => [
        p.fullName,
        p.email,
        p.planName,
        p.price,
        p.currency,
        new Date(p.createdAt).toLocaleDateString(),
        p.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Payments exported successfully");
  };

  const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.price, 0);
  const paidPayments = filteredPayments.filter(
    (p) => p.status === "paid"
  ).length;

  return (
    <Adminlayouts>
      <Head>
        <title>Payments || Belt Driving School</title>
      </Head>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
          <button
            onClick={handleExportCSV}
            disabled={filteredPayments.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Payments</p>
            <p className="text-2xl font-bold text-gray-800">
              {filteredPayments.length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Paid Payments</p>
            <p className="text-2xl font-bold text-green-600">{paidPayments}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-800">
              {filteredPayments.length > 0
                ? filteredPayments[0].currency
                : "NGN"}{" "}
              {totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or plan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Loading payments...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "No payments match your filters."
                : "No payments found."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-sm font-semibold text-gray-700">
                      Full Name
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-700">
                      Plan Name
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-700 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {payment.fullName}
                      </td>
                      <td className="p-4 text-gray-600">{payment.email}</td>
                      <td className="p-4 text-gray-600">{payment.planName}</td>
                      <td className="p-4 font-semibold text-gray-800">
                        {payment.currency} {payment.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {payment.status === "paid" ? (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setDropdownOpen(
                                dropdownOpen === payment._id
                                  ? null
                                  : payment._id
                              )
                            }
                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                          {dropdownOpen === payment._id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                              <button
                                onClick={() => {
                                  setSelectedPayment(payment);
                                  setShowDetails(true);
                                  setDropdownOpen(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-t-lg"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payment Details Modal */}
        {showDetails && selectedPayment && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  Payment Details
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-mono text-sm text-gray-800 break-all">
                    {selectedPayment._id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">
                    {selectedPayment.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">
                    {selectedPayment.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plan Name</p>
                  <p className="font-medium text-gray-800">
                    {selectedPayment.planName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {selectedPayment.currency}{" "}
                    {selectedPayment.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-800">
                    {new Date(selectedPayment.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">
                    {selectedPayment.status === "paid" ? (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Adminlayouts>
  );
};

export default Payments;
