import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DocumentCard } from "../components/DocumentCard.jsx";
import styles from "./Vault.module.css";

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
    <div className={styles["vault-container"]}>
      <h1>My Vault</h1>
      <button onClick={() => navigate(-1)} className={styles["back-btn"]}>
        ← Back to Dashboard
      </button>

      {loading ? (
        <p>Loading Vault Documents...</p>
      ) : error ? (
        <p className={styles["error-msg"]}>{error}</p>
      ) : vaultDocuments.length === 0 ? (
        <p>No documents found in your vault.</p>
      ) : (
        <div className={styles["document-grid"]}>
          {vaultDocuments.map((doc, index) => (
            <DocumentCard key={index} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
};
