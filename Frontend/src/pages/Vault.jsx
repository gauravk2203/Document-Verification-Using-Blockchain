import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DocumentCard } from "../components/DocumentCard.jsx";

export const Vault = () => {
  const navigate = useNavigate();
  const [vaultDocuments, setVaultDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVaultDocuments = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Fetching all vault documents...");
      const response = await axios.get("http://localhost:5000/api/vault/Myvault");
      setVaultDocuments(response.data.documents);
    } catch (err) {
      console.error("Error fetching vault documents:", err.message);
      setError("Failed to fetch vault documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVaultDocuments();
  }, [fetchVaultDocuments]);

  return (
    <div className="max-w-3xl mx-auto text-center p-6">
      <h1 className="text-2xl font-bold mb-4">My Vault</h1>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition duration-200"
      >
        ← Back to Dashboard
      </button>

      {loading ? (
        <p className="text-gray-600">Loading Vault Documents...</p>
      ) : error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : vaultDocuments.length === 0 ? (
        <p className="text-gray-700">No documents found in your vault.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {vaultDocuments.map((doc, index) => (
            <DocumentCard key={index} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
};
