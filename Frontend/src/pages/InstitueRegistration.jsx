import './InstituteRegistration.module.css'
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
            setError('All fields are required in the first form.');
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
            setError('All fields are required in the second form.');
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
            const response = await axios.post('http://localhost:5000/api/institutes/register', completeData);
            console.log(response.data);
            setSuccess(true);
            setError('');
        } catch (error) {
            console.error('Error in InstituteRegistration', error);
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
        <main>
            <div className="imageHolder">
                <img src="../Assets/background.svg" alt="Institute" />
            </div>
            <div className="formHolder">
                <div className="logo">
                    <img src="../../src/assets/Logo.svg" alt="Logo" />
                </div>
                <div className="heading">
                    <h1>Register your <span className='institute'> Institute</span> on Etheregg </h1>
                </div>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">Registration successful!</div>}
                {currentSlide === 1 && (
                    <form>
                        <label htmlFor="instituteName">
                            Institute Name
                           <span className='border'>
                            <input type="text" name="instituteName" id="instituteName" value={formValues.instituteName} onChange={setInputs} 
                            placeholder='Example: St. John College pf Engineering and Management'/>
                           </span>    
                        </label>
                        <label htmlFor="universityName">
                            University Name
                            <span className='border'>
                            <input type="text" name="universityName" id="universityName" value={formValues.universityName} onChange={setInputs} 
                            placeholder='Example: University of Mumbai'/>
                            </span>
                        </label>
                        <label htmlFor="location">
                            Location
                            <span className='border'>
                            <input type="text" name="location" id="location" value={formValues.location} onChange={setInputs} 
                            placeholder='Example: Palghar, Maharashtra, India '/>
                            </span>
                        </label>
                        <div className="CodeContainer">

                        <label htmlFor="instituteCode">
                            Institute Code
                            <span className='border' id='border_of_instituteCode'>
                            <input type="text" name="instituteCode" id="instituteCode" value={formValues.instituteCode} onChange={setInputs} 
                            placeholder='Example: X-59861'/>
                            </span>
                        </label>
                        <label htmlFor="pincode">
                            Pincode
                            <span className='border' id='border_of_pincode'>
                            <input type="text" name="pincode" id="pincode" value={formValues.pincode} onChange={setInputs} 
                            placeholder='Example: X-59861'/>
                            </span>
                        </label>

                        </div>
            
                        <button type="button" onClick={handleFirstForm}>Continue</button>
                    </form>
                )}
                {currentSlide === 2 && (
                    <form onSubmit={handleSecondForm}>
                        <label htmlFor="email">
                            Email
                            <span className='border'>
                            <input type="email" name="email" id="email" value={formValues.email} onChange={setInputs} />
                            </span>
                        </label>
                        <label htmlFor="password">
                            Password
                            <span className='border'>
                            <input type="password" name="password" id="password" value={formValues.password} onChange={setInputs} />
                            </span>
                        </label>
                        <label htmlFor="confirmPassword">
                            Confirm Password
                            <span className='border'>
                            <input type="password" name="confirmPassword" id="confirmPassword" value={formValues.confirmPassword} onChange={setInputs} />
                            </span>
                        </label>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
};

export default InstituteRegistration;