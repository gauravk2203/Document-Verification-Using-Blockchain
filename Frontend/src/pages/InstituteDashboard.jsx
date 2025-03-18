import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../components/Dashboard/Header.jsx";
import { AddStudent } from "../Components/Dashboard/AddStudent.jsx";
import { StudentList } from "../Components/Dashboard/StudentsList.jsx";
import { CreateStudent } from "../Components/CreateStudent.jsx";
import { Upload } from "../components/Dashboard/Upload.jsx";
import { DocInput } from "../Components/Dashboard/DocInput.jsx";
import { RecentUpload } from "../Components/Dashboard/RecentUpload.jsx";
import { ReceiptPopup } from "../Components/ReceiptPopup.jsx";

export const InstituteDashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateStudent, setShowCreateStudent] = useState(false);
    const [selectedStudentInfo, setSelectedStudentInfo] = useState(null);
    const [file, setFile] = useState(null);
    const [inputData, setInputData] = useState("");
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [headerInfo, setHeaderInfo] = useState({
        title: "St. John College of Engineering and Management",
        subTitle: "Etheregg making it safe",
        pid: ""
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/Institute/getStudents");
                setStudents(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError("Failed to fetch students");
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const handleAddStudentClick = () => setShowCreateStudent(true);
    const handleCreateStudentClick = () => setShowCreateStudent(false);

    const handleNewStudent = (newStudent) => {
        setStudents((prevStudents) => [...prevStudents, newStudent]);
        setShowCreateStudent(false);
    };

    const handleStudentClick = async (student) => {
        try {
            const [studentResponse, documentResponse] = await Promise.all([
                axios.get(`http://localhost:5000/api/Institute/getStudent/${student.abcID}`),
                axios.get(`http://localhost:5000/api/document/hashes/${student.abcID}`)
            ]);

            const studentDetails = studentResponse.data;
            const documents = documentResponse.data || [];

            setSelectedStudentInfo({ student, details: studentDetails, documents });

            // **Ensure `headerInfo` updates immediately using functional update**
            setHeaderInfo((prev) => ({
                ...prev,
                title: studentDetails.studentName || "Student Name",
                subTitle: studentDetails.course || "Course",
                pid: studentDetails.pid || ""
            }));

        } catch (err) {
            console.error("Error fetching student data:", err);
        }
    };

    const handleBackToList = () => {
        setSelectedStudentInfo(null);
        setHeaderInfo({
            title: "St. John College of Engineering and Management",
            subTitle: "Etheregg making it safe",
            pid: ""
        });
    };

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    const fileupload = async () => {
        if (!file || !inputData || !selectedStudentInfo?.student) {
            alert("Please select a student, upload a file, and enter a document name.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentName", inputData);
        formData.append("abcID", selectedStudentInfo.student.abcID);

        try {
            const uploadDoc = await axios.post("http://localhost:5000/api/document/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (uploadDoc.status === 200) {
                alert("Data uploaded successfully!");

                // Simulated Blockchain Receipt (Replace with actual API response)
                const blockchainReceipt = {
                    transactionHash: uploadDoc.data.transactionHash || "0xabc123...",
                    blockNumber: uploadDoc.data.blockNumber || "123456",
                    gasUsed: uploadDoc.data.gasUsed || "21000",
                    timestamp: new Date().toISOString()
                };

                setReceiptData(blockchainReceipt);
                setShowReceipt(true);
            } else {
                alert("Upload failed!");
            }
        } catch (error) {
            console.error("Error uploading:", error);
            alert("An error occurred.");
        }
    };

    return (
        <div className="flex">
            <div className="flex-grow p-6">
                <Header 
                    title={headerInfo.title}
                    subTitle={headerInfo.subTitle}
                    pid={headerInfo.pid}
                />

                {selectedStudentInfo ? (
                    <div>
                        <Upload setFile={setFile} />
                        <DocInput setInputData={setInputData} onSubmit={fileupload} />
                        <RecentUpload student={selectedStudentInfo.documents} />
                        <button 
                            onClick={handleBackToList} 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Back to Student List
                        </button>
                    </div>
                ) : (
                    <div>
                        {!showCreateStudent ? (
                            <AddStudent onClick={handleAddStudentClick} />
                        ) : (
                            <CreateStudent 
                                onClick={handleCreateStudentClick} 
                                onStudentAdded={handleNewStudent} 
                            />
                        )}
                        <StudentList students={students} onClick={handleStudentClick} />
                    </div>
                )}
            </div>

            {showReceipt && (
                <ReceiptPopup 
                    receiptData={receiptData} 
                    onClose={() => setShowReceipt(false)} 
                />
            )}
        </div>
    );
};
