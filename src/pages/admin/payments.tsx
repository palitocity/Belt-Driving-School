import React, { useEffect, useState } from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import axios from "axios";
import toast from "react-hot-toast";
import Head from "next/head";
import { MoreVertical } from "lucide-react";
interface Payment {
  firstName?: string;
  planName?: string;
  amount?: number | string;
  date?: string;
  status?: string;
}

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const [loading, setLoading] = useState(true);
  console.log(loading);

  const getAllPayments = async () => {
    try {
      const response = await axios.get(
        "https://belt-driving-school-backend-3.onrender.com/api/admin/dashboard/payments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPayments(response.data);
      console.log("Payments data:", response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  return (
    <Adminlayouts>
      <Head>
        <title>Payments</title>
      </Head>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Payments</h1>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">firstName</th>
                <th className="p-3">planName</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{payment.firstName}</td>
                  <td className="p-3">{payment.planName}</td>
                  <td className="p-3">{payment.amount}</td>
                  <td className="p-3">{payment.date}</td>
                  <td className="p-3">
                    {payment.status === "Paid" && (
                      <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>
                    )}
                    {payment.status === "Pending" && (
                      <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                    {payment.status === "Overdue" && (
                      <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                        Overdue
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right relative">
                    <button className="p-2 rounded hover:bg-gray-100">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-5 mt-2 w-36 bg-white border rounded-lg shadow-lg text-sm hidden group-hover:block">
                      <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">
                        View
                      </button>
                      <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left">
                        Edit
                      </button>
                      <button className="block w-full px-4 py-2 hover:bg-gray-100 text-left text-red-600">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Payments;
