import React from "react";

export default function LandingPage() {
  const sections = ["Institutions", "Programs", "Courses", "Knowledge Units"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

      {/* HERO */}
      <div className="text-center px-6 py-20 bg-white border-b">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Transfer Credit Match
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore how institutions, programs, courses, and knowledge units connect
          to support transfer credit mapping — all in one place.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Get Started
          </button>

          <button className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* FEATURE SECTIONS */}
      <div className="px-6 py-16">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-12">
          Core Components
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div
              key={section}
              className="bg-white border rounded-xl shadow-sm p-6 flex flex-col gap-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {section}
              </h3>

              <p className="text-sm text-gray-500">
                Manage and organize {section.toLowerCase()} within the transfer credit system.
              </p>

              {/* Preview box */}
              <div className="border border-dashed border-gray-200 rounded-lg p-4 bg-gray-50 text-sm text-gray-500">
                {section === "Institutions" && "Example: Roosevelt University"}
                {section === "Programs" && "Example: Cybersecurity"}
                {section === "Courses" && "Example: CST 261 - Assembly Programming"}
                {section === "Knowledge Units" && "Example: Binary Calculations"}
              </div>

              <button className="mt-auto self-start px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800">
                View {section}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE HIGHLIGHTS */}
      <div className="bg-white border-t px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-10">
            Why Use This System?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-5 border rounded-lg">
              <h4 className="font-semibold mb-2">Structured Data</h4>
              <p className="text-sm text-gray-600">
                Organize institutions, programs, courses, and knowledge units in a clear hierarchy.
              </p>
            </div>

            <div className="p-5 border rounded-lg">
              <h4 className="font-semibold mb-2">Transfer Mapping</h4>
              <p className="text-sm text-gray-600">
                Understand how academic credits relate across different institutions.
              </p>
            </div>

            <div className="p-5 border rounded-lg">
              <h4 className="font-semibold mb-2">Simple Interface</h4>
              <p className="text-sm text-gray-600">
                Clean and easy-to-use layout designed for clarity and usability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-6 text-sm text-gray-500 border-t">
        © 2026 Transfer Credit Match
      </div>
    </div>
  );
}

