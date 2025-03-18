import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Dashboard/Header.jsx";
import { Upload } from "../components/Dashboard/Upload.jsx";
import { MyVault } from "../Components/vault.jsx";
import { DocumentCard } from "../Components/DocumentCard.jsx";

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const [fetchedDocument, setFetchedDocument] = useState(null);
  const [vaultDocuments, setVaultDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [headerInfo, setHeaderInfo] = useState({ title: "", abcID: "" });
  const [status, setStatus] = useState({ loading: true, error: null });
  const [vaultLoading, setVaultLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/Institute/getStudents");
      if (data.length > 0) {
        setHeaderInfo({
          title: data[0]?.studentName || "Unknown Student",
          abcID: data[0]?.abcID || "N/A",
        });
      }
    } catch (err) {
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
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/api/document/fetch", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${Cookies.get("jwt")}` },
        withCredentials: true,
      });

      setFetchedDocument(response.data);
    } catch (err) {
      setStatus((prev) => ({ ...prev, error: "Failed to fetch document" }));
    }
  }, [file]);

  const addToVault = async () => {
    if (!fetchedDocument) {
      alert("No document found to add.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/vault/addtoVault", fetchedDocument, {
        headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
        withCredentials: true,
      });

      if (response.data.success) {
        alert("Document added to vault successfully!");
        setVaultDocuments((prev) => [...prev, fetchedDocument]);
        setFetchedDocument(null);
      } else {
        alert("Failed to add document to vault.");
      }
    } catch (err) {
      alert("Failed to add document to vault.");
    }
  };

  const fetchVaultDocuments = useCallback(async () => {
    setVaultLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/vault/Myvault", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
      });

      setVaultDocuments(response.data.documents);
    } catch (err) {
      setVaultDocuments([]);
    } finally {
      setVaultLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
    fetchVaultDocuments();
  }, [fetchStudents, fetchVaultDocuments]);

  if (status.loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (status.error) return <p className="text-center text-red-500">{status.error}</p>;

  return (
    <div className="max-w-full h-fit mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Header title={headerInfo.title} abcID={headerInfo.abcID} />
      <hr className="my-4 border-gray-300" />
      <div className="mb-4">
        <Upload setFile={setFile} />
      </div>
      <button onClick={fetchDocuments} className="px-4 py-2 border-2 border-green-500 text-green-600 rounded-xl hover:bg-green-100">
        Fetch Document
      </button>
      <DocumentCard {...fetchedDocument} addToVault={addToVault} />

      {vaultLoading ? (
        <p className="text-center text-gray-600 mt-4">Loading Vault Documents...</p>
      ) : (
        <>
          <MyVault documents={vaultDocuments.slice(0, 4)} />
          {vaultDocuments.length > 4 && (
            <button onClick={() => navigate("/vault")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">
              View More
            </button>
          )}
        </>
      )}
    </div>
  );
};