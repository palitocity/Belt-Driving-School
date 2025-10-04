import React from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";

const Student = () => {
  return (
    <Adminlayouts>
      <Head>
        <title>Students</title>
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Students</h1>
        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Course</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">John Doe</td>
                <td className="p-3">john@example.com</td>
                <td className="p-3">Basic Driving</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Student;
