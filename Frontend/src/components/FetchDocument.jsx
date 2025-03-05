import { useState } from "react";
import axios from "axios";

const FetchDocument = () => {
    const [file, setFile] = useState(null);
    const [abcID, setAbcID] = useState("");
    const [storedDocument, setStoredDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !abcID) {
            setError("Student Unique ID and file are required.");
            return;
        }

        setLoading(true);
        setError(null);
        setMessage("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("abcID", abcID);

        try {
            const response = await axios.post("http://localhost:5000/api/document/fetch", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            setStoredDocument(response.data.document);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToVault = async () => {
        if (!storedDocument || !abcID) {
            setError("No document found. Fetch a document first.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/vault/addtoVault", {
                document: storedDocument,
                abcID
            },
            { withCredentials: true });

            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add document.");
        }
    };

    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Fetch Document</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter Student Unique ID" 
                    value={abcID} 
                    onChange={(e) => setAbcID(e.target.value)}
                    className="border p-2 mb-2 w-full"
                />
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="border p-2 mb-2 w-full"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Fetching..." : "Fetch Document"}
                </button>
            </form>
            {storedDocument && (
                <div className="mt-4 border rounded-lg shadow-lg p-4">
                    <img 
                        src={`https://api.pinata.cloud/ipfs/${storedDocument.documentHash}`} 
                        alt="Document" 
                        className="w-full h-48 object-cover rounded"
                    />
                    <h2 className="text-lg font-bold mt-2">{storedDocument.documentName}</h2>
                    {/* <p className="text-gray-700">Type: {storedDocument.type}</p> */}
                    {/* <p className="text-gray-700">Size: {storedDocument.size}</p> */}
                    <p className="text-green-500 mt-2">
                        Hash Found: 
                        <a 
                            href={`https://api.pinata.cloud/ipfs/${storedDocument.documentHash}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="underline"   
                        >
                            {storedDocument.documentHash}
                        </a>
                    </p>
                    <button 
                        onClick={handleAddToVault} 
                        className="bg-green-500 text-white p-2 rounded w-full mt-2"
                    >
                        Add to Vault
                    </button>
                </div>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {message && <p className="text-green-500 mt-2">{message}</p>}
        </div>
    );
};

export default FetchDocument;
