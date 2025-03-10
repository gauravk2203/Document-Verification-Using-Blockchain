import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; 
import { Header } from "../components/Dashboard/Header.jsx";
import { Upload } from "../components/Dashboard/Upload.jsx";
import { MyVault } from "../components/Documents.jsx";
import styles from "./StudentDashboard.module.css";

export const StudentDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [headerInfo, setHeaderInfo] = useState({
    title: "",
    abcID: "",
  });

  const [status, setStatus] = useState({
    loading: true,
    error: null,
  });

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
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      console.log("Uploading file and fetching documents...");
      
      // Create FormData to send the file
      const formData = new FormData();
      formData.append("file", file);

      // Send POST request with the file
      const response = await axios.post("http://localhost:5000/api/document/fetch", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Matching documents:", response.data);
      setDocuments(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching documents:", err.message);
      setStatus((prev) => ({ ...prev, error: "Failed to fetch documents" }));
    }
  }, [file]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStudents();
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, [fetchStudents]);

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
        Fetch Documents
      </button>
      <MyVault documents={documents} />
    </div>
  );
};
