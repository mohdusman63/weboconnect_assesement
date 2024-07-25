import React, { useState } from 'react';
import GalleryImage from './GalleryImage';
import axiosInstance from '../axiosSetup';
import { useNavigate } from 'react-router-dom';


const ImageUploadForm = () => {
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('image', image);
    

        try {

            const res = await axiosInstance.post('/upload/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setResponse(res.data.data);

        } catch (error) {
            alert(error.response.data.message)
            console.error('Error uploading image:', error);
        } 
    };

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/');
    };

    return (
        <div>
            <h1>Upload Image and Message</h1>
            <button onClick={handleLogout}>Logout</button>
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit" >
                    Submit
                </button>
            </form>
           
            <GalleryImage data={response} />

        </div>
    );
};

export default ImageUploadForm;
