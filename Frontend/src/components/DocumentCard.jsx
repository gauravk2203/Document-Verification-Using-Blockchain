import React from "react";

export const DocumentCard = ({ document, addToVault }) => {
  if (!document) return null;

  return (
    <div className="bg-white p-4 my-4 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold">Fetched Document</h3>
      <p className="text-gray-700">{document.name}</p>
      <button
        onClick={addToVault}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-3 hover:bg-blue-700 transition duration-200"
      >
        Add to My Vault
      </button>
    </div>
  );
};
