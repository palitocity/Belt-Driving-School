import React from "react";
import { Check } from "lucide-react"; // optional: for check icons

interface Props {
  title: any; 
  price: any;
  description: string;
  features: [];
}

const PlanCard = ({ title, price, description, features }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Top Section with Gradient */}
      <div className="bg-gradient-to-br from-pink-50 to-white px-6 pt-6 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-2">Starts at</p>
        <div className="flex items-baseline mt-1">
          <h1 className="text-3xl font-bold text-gray-900">{price}</h1>
          <span className="text-sm text-gray-500 ml-2">per month/user</span>
        </div>
        <p className="text-sm text-gray-600 mt-3">{description}</p>

        <button className="w-full mt-5 bg-white border border-gray-300 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-50 transition">
          Get started
        </button>
      </div>


      <hr className="border-gray-200 my-4" />


      <div className="px-6 pb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Free, forever
        </h3>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-700">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanCard;
