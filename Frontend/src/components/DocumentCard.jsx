import React from "react";

export const DocumentCard = ({ document, addToVault }) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 my-4 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-2">Fetched Document</h3>
        <p className="text-gray-700 mb-4">{document.documentName}</p>
        <button
          onClick={addToVault}
          className="bg-blue-500 text-white px-6 py-2 rounded-md mt-3 hover:bg-blue-700 transition duration-200"
        >
          Add to My Vault
        </button>
      </div>
    </div>
  );
};