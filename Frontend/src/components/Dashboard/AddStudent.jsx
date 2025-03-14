import React from "react";

export const AddStudent = ({ onClick }) => {
  return (
    <div
      className="max-w-[300px] h-[70px] flex items-center justify-between p-5 bg-green-600 rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      <div className="w-fit p-2 rounded-full bg-blue-100 text-center">
        <img src="../../src/assets/uploadICON.svg" alt="Upload Icon" className="w-8 h-8" />
      </div>
      <div className="w-3/4 h-full flex flex-col justify-center items-start">
        <h2 className="text-white text-lg font-medium">Add New Student</h2>
        <p className="text-white text-sm font-light">ABC ID is must required</p>
      </div>
    </div>
  );
};
