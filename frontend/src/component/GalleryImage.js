import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosSetup';
import { IMAGE_BASE_URL } from '../constant';


const GalleryImage = (props) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axiosInstance.get('/get/image');
                setImages(res.data.data);
            } catch (error) {
                setError('Error fetching images');
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        console.log('props triggered', props.data);
        if (props.data) {
            setImages(prevImages => [...prevImages, props.data]);
        }
    }, [props.data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Image Gallery</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={`${IMAGE_BASE_URL}/${image.image_path}`}
                            alt={image.name} style={{ width: '150px', height: '150px', display: 'flex' }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryImage;
