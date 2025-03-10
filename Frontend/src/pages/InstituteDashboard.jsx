import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../components/Dashboard/Header.jsx";
import { AddStudent } from "../components/Dashboard/AddStudent.jsx";
import styles from "./InstituteDashboard.module.css";
import { StudentList } from "../components/Dashboard/StudentsList.jsx";
import { CreateStudent } from "../components/CreateStudent.jsx";
import { Upload } from "../components/Dashboard/Upload.jsx";
import { DocInput } from "../components/Dashboard/DocInput.jsx";
import { RecentUpload } from "../components/Dashboard/RecentUpload.jsx";

export const InstituteDashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateStudent, setShowCreateStudent] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);
    const [document, setDocument] = useState([]);
    const [file, setFile] = useState(null);
    const [inputData, setInputData] = useState("");
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [headerInfo , setheaderinfo] = useState({
        title : "St. John College of Engineering and Management" ,
        subTitle : "Etheregg making it safe" ,
        pid : ""
    })
   


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

    useEffect(() => {
        if (studentDetails) {
            setheaderinfo({
                title: studentDetails.studentName,
                subTitle: studentDetails.course,
                pid: studentDetails.pid
            });
        }
    }, [studentDetails]);

    const handleAddStudentClick = () => setShowCreateStudent(true);
    const handleCreateStudentClick = () => setShowCreateStudent(false);

    const handleNewStudent = (newStudent) => {
        setStudents((prevStudents) => [...prevStudents, newStudent]);
        setShowCreateStudent(false);
    };

    const handleStudentClick = async (student) => {
        setSelectedStudent(student);

        try {
            // Fetch student details (Name & Course)
            const studentResponse = await axios.get(`http://localhost:5000/api/Institute/getStudent/${student.abcID}`);
            setStudentDetails(studentResponse.data);

            // Fetch document hashes
            const documentResponse = await axios.get(`http://localhost:5000/api/document/hashes/${student.abcID}`);
            setDocument(documentResponse.data || []);
        } catch (err) {
            console.error("Error fetching student data:", err);
        }
    };

    const handleBackToList = () => {
        setSelectedStudent(null);
        setStudentDetails(null);
        setDocument([]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    const fileupload = async () => {
        if (!file || !inputData || !selectedStudent) {
            alert("Please select a student, upload a file, and enter a document name.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("inputData", inputData);
        formData.append("studentID", selectedStudent.abcID);
    
        try {
            const uploadDoc = await axios.post("http://localhost:5000/api/document/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
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
                setShowReceipt(true); // Show popup
            } else {
                alert("Upload failed!");
            }
        } catch (error) {
            console.error("Error uploading:", error);
            alert("An error occurred.");
        }
    };

    // console.log('this is the selected student', selectedStudent);
    // console.log('this is the  document ', document);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header 
                    title={headerInfo.title}
                    subTitle={headerInfo.subTitle}
                    pid={headerInfo.pid}
                />

                {selectedStudent ? (
                    <div>
                        <Upload  setFile={setFile} />
                        <DocInput setInputData={setInputData} onSubmit={fileupload} />
                        <RecentUpload student={document} />
                        <button onClick={handleBackToList}>Back to Student List</button>
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
