import React from "react";

export const ReceiptPopup = ({ receiptData, onClose }) => {
  if (!receiptData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-80 text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Blockchain Receipt</h2>
        <p className="text-gray-700"><strong>Transaction Hash:</strong> {receiptData.transactionHash}</p>
        <p className="text-gray-700"><strong>Block Number:</strong> {receiptData.blockNumber}</p>
        <p className="text-gray-700"><strong>Gas Used:</strong> {receiptData.gasUsed}</p>
        <p className="text-gray-700"><strong>Timestamp:</strong> {new Date(receiptData.timestamp).toLocaleString()}</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
