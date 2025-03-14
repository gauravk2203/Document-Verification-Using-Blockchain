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
      buttonColor: "bg-blue-700",
      buttonIcon: "../src/assets/upload_file.svg",
      path: "/Verify", // Destination route
    },
    {
      id: 2,
      image: "../src/assets/University Campus.svg",
      title: "Seamless and secure student credential management - Made effortless!",
      buttonText: "Get started",
      buttonColor: "bg-pink-500",
      buttonIcon: "../src/assets/material-symbols_arrow-back.svg",
      path: "/institute-dashboard",
    },
    {
      id: 3,
      image: "../src/assets/Student Center.svg",
      title: "Secure Your Transcript with Unmatched Protection – Safe, Simple, and Reliable!",
      buttonText: "Secure now",
      buttonColor: "bg-yellow-500",
      buttonIcon: "../src/assets/mingcute_safe-lock-line.svg",
      path: "/student-dashboard",
    },
  ];

  return (
    <div className="bg-[url('../src/assets/landingPage_background.svg')] h-full bg-no-repeat bg-cover">
      <div className="container flex justify-between p-3 items-center">
        <div>
          <img src="../src/assets/logo.svg" alt="/" />
        </div>
        <div>
          <button className="bg-green-500 px-4 py-2 rounded-full text-white flex justify-between items-center">
            Get Started
            <img src="../src/assets/upload_file.svg" alt="upload" className="h-4 w-4 ml-4" />
          </button>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-center px-8 py-10">
        <div className="w-5/6 flex flex-col text-white">
          <span className="text-7xl text-center font-medium">
            The
            <span className="bg-gradient-to-r from-[#DDF82D] to-[#29DC6B] text-transparent px-2 py-1 bg-clip-text">
              New Era
            </span>
            of
          </span>
          <span className="text-7xl text-center font-medium">
            Document Management
          </span>
        </div>
        <div className="w-3/6 flex flex-col text-white">
          <p className="text-center text-white py-4 text-lg">
            Etheregg is an Ethereum-based document verification and storage
            platform on a distributed ledger for students, universities, & people
            who doubt your credentials.
          </p>
        </div>
      </div>

      <section className="w-5/6 flex justify-evenly px-8 py-3 items-center m-auto">
      {features.map((feature) => (
        <article
          key={feature.id}
          className="w-[350px] h-78 mx-auto rounded-2xl shadow-lg p-6 flex flex-col bg-white/2 backdrop-blur-lg border border-white/20 justify-center"
        >
          <div>
            <img src={feature.image} alt="feature icon" className="h-12 w-12" />
          </div>
          <div className="py-10">
            <p className="text-xl font-medium text-white">{feature.title}</p>
          </div>
          <div>
            <button
              className={`${feature.buttonColor} px-4 py-2 rounded-full text-white flex justify-between items-center w-fit border-white border cursor-pointer`}
              onClick={() => navigate(feature.path)} // Navigate on click
            >
              {feature.buttonText}
              <img src={feature.buttonIcon} alt="feature icon" className="h-4 w-4 ml-4" />
            </button>
          </div>
        </article>
      ))}
    </section>
    </div>
  );
};


{/* <article className="w-[350px] h-fit mx-auto rounded-2xl shadow-lg p-6 flex flex-col bg-white/2 backdrop-blur-lg border border-white/20">
    <div>
    <img src="../src/assets/Checked Identification Documents.svg" alt="documentVerification icon" className=" h-12 w-12" />
    </div>
    <div className="py-10">
      <p className="text-xl font-medium text-white">
        Instant Document Verification – Secure, Fast, and Hassle-Free!
      </p>
    </div>
    <div>
      <Link className="bg-blue-700 px-4 py-2 rounded-full text-white flex justify-between items-center w-fit border-white border">
        Upload now
        <img src="../src/assets/upload_file.svg" alt="upload" className=" h-4 w-4 ml-4" />
      </Link>
    </div>
  </article>


  <article className="w-[350px] h-fit mx-auto rounded-2xl shadow-lg p-6 flex flex-col bg-white/2 backdrop-blur-lg border border-white/20">
    <div>
     <img src="../src/assets/University Campus.svg" alt="Universityicon" className=" h-12 w-12" />
    </div>
    <div className="py-6">
      <p className="text-xl font-medium text-white">
        Seamless and secure student credential management-Made effortless!
      </p>
    </div>
    <div>
      <Link className="bg-pink-500 px-4 py-2 rounded-full text-white flex justify-between items-center w-fit border-white border">
        Get started
         <img src="../src/assets/material-symbols_arrow-back.svg" alt="upload" className=" h-4 w-4 ml-4" />
      </Link>
    </div>
  </article>


  <article className="w-[350px] h-fit mx-auto rounded-2xl shadow-lg p-6 flex flex-col bg-white/2 backdrop-blur-lg border border-white/20">
    <div>
     <img src="../src/assets/Student Center.svg" alt="studentcentericon" className=" h-12 w-12" />
    </div>
    <div className="py-6">
      <p className="text-xl font-medium text-white">
        Secure Your Transcript with Unmatched Protection – Safe, Simple, and Reliable!
      </p>
    </div>
    <div>
      <Link className="bg-yellow-500 px-4 py-2 rounded-full text-white flex justify-between items-center w-fit border-white border">
        Secure now
         <img src="../src/assets/mingcute_safe-lock-line.svg" alt="upload" className=" h-4 w-4 ml-4" />
      </Link>
    </div>
  </article> */}