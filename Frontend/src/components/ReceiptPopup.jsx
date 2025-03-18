import React from "react";

export const ReceiptPopup = ({ receiptData, onClose }) => {
  if (!receiptData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-80 text-left shadow-lg border border-gray-300">
        <h2 className="text-xl font-semibold mb-4 text-center">Blockchain Receipt</h2>
        <div className="border-b border-gray-300 mb-4"></div>
        
        <div className="mb-2">
          <p className="text-gray-700">
            <strong>Transaction Hash:</strong>
          </p>
          <p className="text-gray-800 font-mono">{receiptData.transactionHash}</p>
        </div>
        
        <div className="mb-2">
          <p className="text-gray-700">
            <strong>Block Number:</strong>
          </p>
          <p className="text-gray-800 font-mono">{receiptData.blockNumber}</p>
        </div>
        
        <div className="mb-2">
          <p className="text-gray-700">
            <strong>Gas Used:</strong>
          </p>
          <p className="text-gray-800 font-mono">{receiptData.gasUsed}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Timestamp:</strong>
          </p>
          <p className="text-gray-800 font-mono">{new Date(receiptData.timestamp).toLocaleString()}</p>
        </div>

        <div className="border-t border-gray-300 mt-4 mb-2"></div>
        
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