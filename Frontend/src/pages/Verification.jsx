import React, { useState } from 'react';
import axios from 'axios';
import './Verification.css';

function Verifier() {
    const [fileName, setFileName] = useState(null);
    const [hash , setHash] = useState(null);
    const [file, setFile] = useState(null);
    const [studentUniqueId, setStudentUniqueId] = useState(""); // Added input for Student ID

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name); // Update UI with selected file name
            setFile(selectedFile); // Update state with selected file
        }
    };

    const handleUpload = async () => {
        if (!file || !studentUniqueId) {
            alert("Please select a file and enter a Student Unique ID.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Corrected form field name
        formData.append('studentUniqueId', studentUniqueId); // Include student ID

        try {
            const response = await axios.post("http://localhost:5000/api/document/verify", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert(response.data.message);
            setHash(response.data.documentHash);
        } catch (error) {
            console.error('Error uploading document:', error.message);
            alert('Error uploading document. Please try again.');
        }

        console.log(hash);
    };

    return (
        <section>
            <div className="container">
                <div className="title">
                    <h1>Upload Document</h1>
                </div>
                <hr />
                <div className="fileUploadContainer">
                    <input 
                        type="text" 
                        placeholder="Enter Student Unique ID" 
                        value={studentUniqueId} 
                        onChange={(e) => setStudentUniqueId(e.target.value)} 
                    />
                    <div className="fileUpload">
                        <div className='uploadicon'>
                            <img src="../../src/assets/uploadICON.svg" alt="Upload Icon" />
                        </div>
                        <p>Please upload a copy of valid identification</p>
                        <input type="file" id="file-upload" className="hidden-input" onChange={handleFileChange} />
                        <label htmlFor="file-upload" className='upload-button'>
                            {fileName ? fileName : "Upload"}
                        </label>
                    </div>
                    <button className="submit-button" onClick={handleUpload}>Verify Document</button>
                </div>
            </div>
        </section>
    );
}

export default Verifier;
