import React from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      id: 1,
      image: "../src/assets/Checked Identification Documents.svg",
      title: "Instant Document Verification – Secure, Fast, and Hassle-Free!",
      buttonText: "Upload now",
      buttonColor: "bg-cyan-500",
      buttonIcon: "../src/assets/upload_file.svg",
      path: "/Verify",
    },
    {
      id: 2,
      image: "../src/assets/University Campus.svg",
      title: "Seamless and secure student credential management - Made effortless!",
      buttonText: "Get started",
      buttonColor: "bg-indigo-500",
      buttonIcon: "../src/assets/material-symbols_arrow-back.svg",
      path: "/InstituteRegister",
    },
    {
      id: 3,
      image: "../src/assets/Student Center.svg",
      title: "Secure Your Transcript with Unmatched Protection – Safe, Simple, and Reliable!",
      buttonText: "Secure now",
      buttonColor: "bg-green-500",
      buttonIcon: "../src/assets/mingcute_safe-lock-line.svg",
      path: "/student-dashboard",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen bg-cover text-white">
      <div className="container flex justify-between p-2 items-center">
        <div>
          <img src="../src/assets/logo.svg" alt="Logo" className="h-12" />
        </div>
        <div>
          <button className="bg-green-600 px-4 py-2 rounded-full text-white flex justify-between items-center shadow-lg hover:bg-green-500">
            Get Started
            <img src="../src/assets/upload_file.svg" alt="upload" className="h-5 w-5 ml-3" />
          </button>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-center px-8 py-12">
        <div className="w-5/6 text-center">
          <h1 className="text-6xl font-bold text-gray-100">
            The
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text px-2 py-1">
              New Era
            </span>
            of
          </h1>
          <h1 className="text-6xl font-bold text-gray-100">Document Management</h1>
        </div>
        <p className="w-3/6 text-center text-gray-300 py-6 text-lg">
          Etheregg is an Ethereum-based document verification and storage platform on a distributed ledger for students, universities, & people who doubt your credentials.
        </p>
      </div>

      <section className="w-5/6 grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-10 mx-auto">
        {features.map((feature) => (
          <article
            key={feature.id}
            className="w-[350px] mx-auto rounded-2xl shadow-xl p-6 flex flex-col bg-gray-800 backdrop-blur-lg border border-gray-700 relative before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-cyan-500 before:animate-pulse"
          >
            <div className="flex justify-center">
              <img src={feature.image} alt="feature icon" className="h-16 w-16" />
            </div>
            <div className="py-6">
              <p className="text-lg font-semibold text-gray-200 text-center">{feature.title}</p>
            </div>
            <div className="flex justify-center">
              <button
                className={`${feature.buttonColor} px-5 py-2 rounded-full text-white flex items-center space-x-2 shadow-md hover:shadow-lg hover:scale-105 transition`}
                onClick={() => navigate(feature.path)}
              >
                <span>{feature.buttonText}</span>
                <img src={feature.buttonIcon} alt="feature icon" className="h-5 w-5" />
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
