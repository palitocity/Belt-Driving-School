import React from "react";
import Adminlayouts from "../layouts/Adminlayouts";
import Head from "next/head";

const Instructors = () => {
  return (
    <Adminlayouts>
      <Head>
        <title>Instructors</title>
      </Head>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Instructors</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-3" />
              <h2 className="font-semibold">Instructor {id}</h2>
              <p className="text-gray-500 text-sm">Experience: 5 years</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </Adminlayouts>
  );
};

export default Instructors;
