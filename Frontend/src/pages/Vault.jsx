import { useEffect, useState } from "react";
import axios from "axios";

const VaultDocuments = ({ abcID }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVaultDocuments = async () => {
            try {
                if (!abcID) {
                    setError("abcID is required.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:5000/vault", {
                    params: { abcID }
                });

                setDocuments(response.data.documents || []);
            } catch (error) {
                setError("Error fetching documents.");
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVaultDocuments();
    }, [abcID]);

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">My Vault</h2>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {documents.length > 0 ? (
                <ul className="border rounded-lg p-4 shadow">
                    {documents.map((doc, index) => (
                        <li key={index} className="py-2 border-b last:border-0">
                            <p className="font-semibold">{doc.documentName}</p>
                            <p className="text-sm text-gray-500">Hash: {doc.documentHash}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p className="text-gray-500">No documents found.</p>
            )}
        </div>
    );
};

export default VaultDocuments;
