import React, { useState } from "react";

export const Upload = ({ setFile }) => {
  const [fileName, setFileName] = useState("Please upload a copy of valid identification");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; 
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  return (
    <div className="border-4 border-green-700 bg-green-50 rounded-[40px] px-12 py-10 flex flex-col items-center justify-between min-w-[1316px] min-h-[250px]">
      <div className="flex justify-center items-center p-2 rounded-full bg-green-200">
        <img src="../src/assets/uploadICON.svg" alt="Upload Icon" className="w-12 h-12" />
      </div>
      <p className="mt-2 text-center">{fileName}</p> 
      <label htmlFor="file" className="mt-2">
        <input 
          type="file" 
          id="file" 
          name="file" 
          className="hidden" 
          onChange={handleFileChange} 
        />
        <span className="px-12 py-2 border-2 border-green-600 rounded-lg cursor-pointer hover:bg-green-100 transition">
          Upload
        </span>
      </label>
    </div>
  );
};
