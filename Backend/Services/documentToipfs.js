import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const PINATA_API_KEY = process.env.API_key;
const PINATA_API_SECRET = process.env.API_secret;
const PINATA_URL = process.env.PinataURL;


export const uploadDocument = async (fileBuffer, fileName) => {
    const form = new FormData();

    // Append the file buffer directly to form-data with a custom file name
    form.append('file', fileBuffer, fileName);

    // Add headers for Pinata API
    const headers = {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
        ...form.getHeaders(), // Include form-data headers
    };

    try {
        console.log('Uploading file to Pinata...');
        const response = await axios.post(PINATA_URL, form, { headers });
        console.log('File uploaded successfully:', response.data);
        return response.data.IpfsHash; // Return the IPFS hash from Pinata
    } catch (error) {
        console.error('Error uploading document to Pinata:', error.response?.data || error.message);
        throw new Error('Error uploading document to Pinata');
    }
};
