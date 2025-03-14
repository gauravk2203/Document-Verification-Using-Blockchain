import React, { useState } from "react";

export const DocInput = ({ setInputData, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setInputData(event.target.value); // Update the parent state
  };

  return (
    <div className="w-full">
      <h2 className="text-blue-900 font-normal text-xl mb-2 px-2">Enter Document Name</h2>
      <div className="flex items-center w-fit">
        <input
          className="min-w-[620px] h-10 border border-gray-300 rounded-xl px-3 text-lg placeholder-gray-500"
          placeholder="Ex. Degree_Doc"
          value={inputValue}
          onChange={handleChange}
        />
        <button
          className="w-[110px] h-10 border-2 border-green-600 rounded-full text-lg text-green-600 bg-transparent ml-4 hover:bg-green-600 hover:text-white transition-all"
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};
