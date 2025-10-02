import React from "react";
import { AcademicCapIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const Certificates = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Our Certification
        </h2>
        <p className="text-gray-600 mb-10">
          At Belt Driving School, every successful student receives a
          certificate of completion, proving competence and readiness for the
          road. In addition, we guide you through processing your driver's
          license to make sure you're fully road-legal.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center gap-4 p-6 border rounded-xl shadow-sm">
            <AcademicCapIcon className="h-10 w-10 text-blue-700" />
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">
                Certificate of Completion
              </h4>
              <p className="text-sm text-gray-600">
                Awarded to students who successfully finish their training.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 p-6 border rounded-xl shadow-sm">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
            <div className="text-left">
              <h4 className="font-semibold text-gray-800">
                Driver's License Support
              </h4>
              <p className="text-sm text-gray-600">
                We assist in processing your driver's license quickly and
                hassle-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
