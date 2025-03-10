import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CreateStudent.module.css";

export const CreateStudent = ({ onClick, onStudentAdded }) => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({
        studentName: "",
        abcID: "",
        pid: "",
        course: "Artificial Intelligence & Machine Learning",
        batch: "2025",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // New state for success message

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:5000/api/Institute/createStudent", studentData);
            onStudentAdded(response.data.student);

            // Show success message
            setSuccess(true);

            // Hide the popup and redirect after 2 seconds
            setTimeout(() => {
                setSuccess(false);
                navigate("/institute-dashboard"); // Redirect to the dashboard
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2>Add New Student</h2>
                    <button className={styles.closeButton} onClick={onClick}>X CLOSE</button>
                </div>
                
                {error && <p className={styles.errorMessage}>{error}</p>}

                {success && (
                    <div className={styles.successPopup}>
                        ✅ Student added successfully!
                    </div>
                )}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Student Name</label>
                        <input 
                            type="text" 
                            name="studentName" 
                            placeholder="Ex. Joeshep D" 
                            value={studentData.studentName} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label>ABC ID</label>
                            <input 
                                type="text" 
                                name="abcID" 
                                placeholder="Ex. XYA2G87" 
                                value={studentData.abcID} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>PID No.</label>
                            <input 
                                type="text" 
                                name="pid" 
                                placeholder="Ex. EU12XABC6X11" 
                                value={studentData.pid} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Select Current Course</label>
                        <select 
                            name="course" 
                            value={studentData.course} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Select Passing Year</label>
                        <select 
                            name="batch" 
                            value={studentData.batch} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                        </select>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" className={styles.cancelButton} onClick={onClick}>
                            CANCEL
                        </button>
                        <button type="submit" className={styles.addButton} disabled={loading}>
                            {loading ? "Adding..." : "ADD"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
