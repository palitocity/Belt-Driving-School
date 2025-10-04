import React from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";

const trainingprograms = () => {
  return (
    <Adminlayouts>
      <Head>
        <title>Training Programs</title>
      </Head>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Training Programs</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold text-lg">Basic Driving</h2>
            <p className="text-gray-500 text-sm mb-3">Duration: 4 weeks</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Enroll Students
            </button>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold text-lg">
              Advanced Defensive Driving
            </h2>
            <p className="text-gray-500 text-sm mb-3">Duration: 6 weeks</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Enroll Students
            </button>
          </div>
        </div>
      </div>
    </Adminlayouts>
  );
};

export default trainingprograms;
