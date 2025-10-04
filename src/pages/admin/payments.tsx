import React from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";
import { MoreVertical } from "lucide-react";

const Payments = () => {
  const payments = [
    {
      student: "Michael Lee",
      program: "Basic Driving",
      amount: "$200",
      date: "2025-10-01",
      status: "Paid",
    },
    {
      student: "Sarah Smith",
      program: "Advanced Driving",
      amount: "$350",
      date: "2025-09-25",
      status: "Pending",
    },
    {
      student: "John Doe",
      program: "Defensive Driving",
      amount: "$250",
      date: "2025-09-20",
      status: "Paid",
    },
    {
      student: "Emily Johnson",
      program: "Basic Driving",
      amount: "$200",
      date: "2025-09-15",
      status: "Overdue",
    },
    {
      student: "David Wilson",
      program: "Night Driving",
      amount: "$180",
      date: "2025-09-10",
      status: "Paid",
    },
    {
      student: "Sophia Brown",
      program: "Advanced Driving",
      amount: "$350",
      date: "2025-09-05",
      status: "Paid",
    },
    {
      student: "James Taylor",
      program: "Motorcycle Training",
      amount: "$220",
      date: "2025-08-30",
      status: "Pending",
    },
  ];

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
                <th className="p-3">Student</th>
                <th className="p-3">Program</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{payment.student}</td>
                  <td className="p-3">{payment.program}</td>
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
