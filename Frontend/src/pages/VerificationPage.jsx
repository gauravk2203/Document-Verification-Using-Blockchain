import React, { useState } from "react";
import axios from "axios";

export const  Verifier = () => {
  const [fileName, setFileName] = useState(null);
  const [hash, setHash] = useState(null);
  const [file, setFile] = useState(null);
  const [studentUniqueId, setStudentUniqueId] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !studentUniqueId) {
      alert("Please select a file and enter a Student Unique ID.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("studentUniqueId", studentUniqueId);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/document/verify",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message);
      setHash(response.data.documentHash);
    } catch (error) {
      console.error("Error uploading document:", error.message);
      alert("Error uploading document. Please try again.");
    }

    console.log(hash);
  };

  return (
    <section className="w-full h-screen bg-[#0E221B] text-white flex justify-center">
      <div className="w-4/5 h-[650px] bg-[#283A34] grid grid-rows-[80px_1px_1fr] rounded-xl mt-auto mb-2 p-6">
        <div className="relative w-fit mx-3 border-b-2 border-white pb-1">
          <h1 className="text-2xl">Upload Document</h1>
        </div>
        <hr className="opacity-30" />

        <div className="w-4/5 mx-auto flex flex-col items-center justify-center bg-[#152A23] border-2 border-dashed border-white/30 text-center rounded-2xl p-6">
          <input
            type="text"
            placeholder="Enter Student Unique ID"
            value={studentUniqueId}
            onChange={(e) => setStudentUniqueId(e.target.value)}
            className="w-full p-2 mb-4 rounded-md bg-gray-800 text-white border border-gray-500 placeholder-gray-400"
          />

          <div className="flex flex-col items-center space-y-4">
            <div className="p-2 bg-white rounded-full">
              <img
                src="../../src/assets/uploadICON.svg"
                alt="Upload Icon"
                className="w-20 h-20"
              />
            </div>
            <p>Please upload a copy of valid identification</p>

            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer font-semibold hover:bg-green-600 transition"
            >
              {fileName ? fileName : "Upload"}
            </label>
          </div>

          <button
            className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={handleUpload}
          >
            Verify Document
          </button>
        </div>
      </div>
    </section>
  );
}

