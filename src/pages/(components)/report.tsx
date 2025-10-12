"use client";
import React, { useState } from "react";
import axios from "axios";
import { X, Upload, AlertTriangle } from "lucide-react";
import Image from "next/image";

const ReportAccident = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [evidenceImage, setEvidenceImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    description: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert image to base64 when selected
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    setUploading(true);

    reader.onloadend = () => {
      setEvidenceImage(reader.result as string);
      setUploading(false);
    };

    reader.onerror = () => {
      alert("Failed to read the image file.");
      setUploading(false);
    };

    reader.readAsDataURL(file); // convert to base64
  };

  // Submit the form (send image as base64)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!evidenceImage) {
      alert("Please upload an evidence image before submitting.");
      return;
    }

    setLoading(true);

    try {
      const reportData = {
        ...formData,
        evidenceImage, // already base64 string
      };

      await axios.post(
        "https://belt-driving-school-backend-3.onrender.com/api/report-accident",
        reportData
      );

      alert("Accident report submitted successfully!");
      setShowModal(false);
      setFormData({ fullName: "", location: "", description: "" });
      setEvidenceImage(null);
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit accident report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Notification-like Button */}
      <div
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition-all"
      >
        <AlertTriangle className="w-5 h-5" />
        <span className="font-medium">Report Accident</span>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Report an Accident
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Accident Location"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what happened..."
                className="border rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />

              {/* Upload field */}
              <label className="cursor-pointer border border-dashed border-gray-400 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                <Upload className="w-6 h-6 text-gray-500 mb-1" />
                <span className="text-sm text-gray-500">
                  {uploading
                    ? "Converting image..."
                    : evidenceImage
                    ? "Image Added ✅"
                    : "Upload Evidence"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>

              {evidenceImage && (
                <Image
                  src={evidenceImage}
                  alt="Uploaded Evidence"
                  width={200}
                  height={200}
                  className="object-cover rounded-lg mt-2 w-full h-40"
                />
              )}

              <button
                type="submit"
                disabled={loading || uploading}
                className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportAccident;
