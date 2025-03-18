import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    const [success, setSuccess] = useState(false); 

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:5000/api/Institute/createStudent", studentData,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            onStudentAdded(response.data.student);
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                navigate("/institute-dashboard");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add student");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <div className="flex justify-between items-center pb-4">
                    <h2 className="text-xl font-semibold">Add New Student</h2>
                    <button className="text-gray-500 text-lg hover:text-gray-700" onClick={onClick}>
                        ✖ CLOSE
                    </button>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                {success && (
                    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow-md">
                        ✅ Student added successfully!
                    </div>
                )}

                <form className="mt-5" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Student Name</label>
                        <input 
                            type="text"
                            name="studentName"
                            placeholder="Ex. Joeshep D"
                            value={studentData.studentName}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium">ABC ID</label>
                            <input 
                                type="text"
                                name="abcID"
                                placeholder="Ex. XYA2G87"
                                value={studentData.abcID}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">PID No.</label>
                            <input 
                                type="text"
                                name="pid"
                                placeholder="Ex. EU12XABC6X11"
                                value={studentData.pid}
                                onChange={handleChange}
                                required
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Select Current Course</label>
                        <select 
                            name="course"
                            value={studentData.course}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                        >
                            <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Select Passing Year</label>
                        <select 
                            name="batch"
                            value={studentData.batch}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                        >
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button 
                            type="button" 
                            className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
                            onClick={onClick}
                        >
                            CANCEL
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "ADD"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
