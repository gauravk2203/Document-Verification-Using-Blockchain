import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Dashboard/Header.jsx";
import { Upload } from "../components/Dashboard/Upload.jsx";
import { MyVault } from "../components/Documents.jsx";
import { DocumentCard } from "../components/DocumentCard.jsx";
import styles from "./StudentDashboard.module.css";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const [fetchedDocument, setFetchedDocument] = useState(null);
  const [vaultDocuments, setVaultDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [headerInfo, setHeaderInfo] = useState({ title: "", abcID: "" });
  const [status, setStatus] = useState({ loading: true, error: null });
  const [vaultLoading, setVaultLoading] = useState(true); // Separate loading for vault

  const fetchStudents = useCallback(async () => {
    try {
      console.log("Fetching students...");
      const { data } = await axios.get("http://localhost:5000/api/Institute/getStudents");
      if (data.length > 0) {
        setHeaderInfo({
          title: data[0]?.studentName || "Unknown Student",
          abcID: data[0]?.abcID || "N/A",
        });
      }
    } catch (err) {
      console.error("Error fetching students:", err.message);
      setStatus((prev) => ({ ...prev, error: "Failed to fetch students" }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      console.log("Uploading file and fetching document...");
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/api/document/fetch", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Fetched document:", response.data);
      setFetchedDocument(response.data);
    } catch (err) {
      console.error("Error fetching document:", err.message);
      setStatus((prev) => ({ ...prev, error: "Failed to fetch document" }));
    }
  }, [file]);

  const addToVault = async () => {
    if (!fetchedDocument) return;

    try {
      console.log("Adding document to vault...");
      const response = await axios.post("http://localhost:5000/api/vault/addtoVault",{ withCredentials: true });

      if (response.data.success) {
        alert("Document added to vault successfully!");
        setVaultDocuments((prev) => [...prev, fetchedDocument]);
        setFetchedDocument(null);
      }
    } catch (err) {
      console.error("Error adding document to vault:", err.message);
      alert("Failed to add document to vault.");
    }
  };

  const fetchVaultDocuments = useCallback(async () => {
    setVaultLoading(true); // Start loading only for vault documents
    try {
      console.log("Fetching vault documents...");
      const response = await axios.get("http://localhost:5000/api/vault/Myvault",{ withCredentials: true });

      setVaultDocuments(response.data.documents);
    } catch (err) {
      console.error("Error fetching vault documents:", err.message);
      setVaultDocuments([]);
    } finally {
      setVaultLoading(false); // Stop loading only for vault
    }
  }, []);

  useEffect(() => {
    fetchStudents();
    fetchVaultDocuments();
  }, [fetchStudents, fetchVaultDocuments]);

  if (status.loading) return <p>Loading...</p>;
  if (status.error) return <p>{status.error}</p>;

  return (
    <div className={styles["dashboard-container"]}>
      <Header title={headerInfo.title} abcID={headerInfo.abcID} />
      <hr />
      <div className={styles["upload-container"]}>
        <Upload setFile={setFile} />
      </div>
      <button onClick={fetchDocuments} className={styles["fetch-btn"]}>
        Fetch Document
      </button>
      <DocumentCard document={fetchedDocument} addToVault={addToVault} />

      {vaultLoading ? (
        <p>Loading Vault Documents...</p>
      ) : (
        <>
          <MyVault documents={vaultDocuments.slice(0, 4)} />
          {vaultDocuments.length > 4 && (
            <button onClick={() => navigate("/vault")} className={styles["more-btn"]}>
              View More
            </button>
          )}
        </>
      )}
    </div>
  );
};
