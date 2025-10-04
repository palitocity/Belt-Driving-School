import React from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";

const driverlicense = () => {
  return (
    <Adminlayouts>
      <Head>
        <title>Driver License</title>
      </Head>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Driver License Applications</h1>
        <div className="bg-white rounded-xl shadow p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Student</th>
                <th className="p-3">License Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Sarah Smith</td>
                <td className="p-3">Class B</td>
                <td className="p-3 text-yellow-600">Pending</td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">
                    Approve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Adminlayouts>
  );
};

export default driverlicense;
