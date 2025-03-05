import { useState } from "react";
import axios from "axios";
import DocumentCard from "../DocumentCard.jsx";

const FetchHashComponent = () => {
  const [abcID, setAbcID] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!abcID || !file) {
      setError("Student Unique ID and file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("abcID", abcID);
    formData.append("file", file);

    try {
      setError(null);
      setResult(null);
      const response = await axios.post("/api/fetch-hash", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Verify Document</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={abcID}
          onChange={(e) => setAbcID(e.target.value)}
          placeholder="Enter Student Unique ID"
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Verify
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && result.matchingHash && <DocumentCard matchingHash={result.matchingHash} />}
    </div>
  );
};

export default FetchHashComponent;
