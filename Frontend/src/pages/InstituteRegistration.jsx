import React, { useState } from 'react';
import axios from 'axios';

const InstituteRegistration = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [formData, setFormData] = useState({});
    const [formValues, setFormValues] = useState({
        instituteName: '',
        instituteCode: '',
        universityName: '',
        location: '',
        pincode: '',
        password: '',
        email: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFirstForm = () => {
        const { instituteName, instituteCode, universityName, location, pincode } = formValues;
        if (!instituteName || !instituteCode || !universityName || !location || !pincode) {
            setError('All fields are required to proceed.');
            return;
        }
        setFormData((prevData) => ({ ...prevData, instituteName, instituteCode, universityName, location, pincode }));
        setCurrentSlide(2);
        setError('');
    };

    const handleSecondForm = async (e) => {
        e.preventDefault();
        const { password, email, confirmPassword } = formValues;

        if (!email || !password || !confirmPassword) {
            setError('All fields are required to proceed.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setFormData((prevData) => ({ ...prevData, password, email }));
        const completeData = { ...formData, password, email };

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/auth/instituteRegister', completeData);
            console.log(response.data);
            setSuccess(true);
            setError('');
        } catch (error) {
            console.error('Error in Institute Registration', error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const setInputs = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <main className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-900 text-white p-6">
            <div className="hidden md:block w-1/2">
                <img src="../Assets/security.svg" alt="Secure Verification" className="w-full h-auto" />
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full md:w-1/3 border border-blue-500">
                <div className="flex justify-center mb-4">
                    <img src="../Assets/logo.svg" alt="Etheregg Logo" className="h-12" />
                </div>
                <h1 className="text-2xl font-bold text-center text-blue-400">Register Your Institute on Etheregg</h1>
                <p className="text-center text-gray-400 text-sm mt-2">Securely register and verify academic documents on the blockchain.</p>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                {success && <div className="text-green-500 text-sm mt-2">Registration successful!</div>}
                {currentSlide === 1 && (
                    <form className="mt-4">
                        {['instituteName', 'universityName', 'location', 'instituteCode', 'pincode'].map((field, index) => (
                            <div key={index} className="mb-4">
                                <input type="text" name={field} value={formValues[field]} onChange={setInputs} 
                                    placeholder={field.replace(/([A-Z])/g, ' $1')} 
                                    className="w-full p-2 border rounded-md bg-gray-700 text-white" />
                            </div>
                        ))}
                        <button type="button" onClick={handleFirstForm} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Continue</button>
                    </form>
                )}
                {currentSlide === 2 && (
                    <form onSubmit={handleSecondForm} className="mt-4">
                        {['email', 'password', 'confirmPassword'].map((field, index) => (
                            <div key={index} className="mb-4">
                                <input type={field.includes('password') ? 'password' : 'email'} name={field} value={formValues[field]} onChange={setInputs} 
                                    placeholder={field.replace(/([A-Z])/g, ' $1')} 
                                    className="w-full p-2 border rounded-md bg-gray-700 text-white" />
                            </div>
                        ))}
                        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
};

export default InstituteRegistration;
