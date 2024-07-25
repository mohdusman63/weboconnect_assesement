import React, { useState, useEffect } from 'react';
import Like from './Like';
import axiosInstance from '../axiosSetup';
import { IMAGE_BASE_URL } from '../constant';
import Model from './Model';
import { useNavigate,Link } from 'react-router-dom';


const Post = ({ content, imageUrl, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [postData, setPostData] = useState([])
    const [modelState, setModelState] = useState([])
    const navigate = useNavigate();

    const handleLike = () => {
        setLikes(likes + 1);
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axiosInstance.get('/post');
                setPostData(res.data.data);
            } catch (error) {
                // setError('Error fetching images');
            }
        };

        fetchImages();
    }, []);
    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        // Navigate to the login page
       
        navigate('/');
      };

    const handleModalData = (data) => {
        console.log('child  data --->>', data)
        setPostData([data.data, ...postData])
        // setModalData(data);
    };

    return (
        <div style={styles.appContainer}>
            <Model sendDataToParent={handleModalData} />
            <button onClick={handleLogout} className="btn" >
                Logout
            </button>
            <h1 style={styles.header}>Posts</h1>
            {postData.map((ele, id) => {
                return (
                    <>
                        <Like key={ele.id}
                            content={ele.description}
                            imageUrl={`${IMAGE_BASE_URL}${ele.url}`}
                            initialLikes={0}
                        />
                    </>
                )
            })}


        </div>


    );
};

const styles = {
    postContainer: {
        border: '1px solid #ddd',
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: '16px auto',
        backgroundColor: '#f9f9f9',
    },
    postImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '12px',
    },
    postContent: {
        fontSize: '18px',
        marginBottom: '12px',
    },
    likeButton: {
        padding: '8px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    likeButtonHover: {
        backgroundColor: '#0056b3',
    },
    likeCount: {
        marginLeft: '12px',
        fontSize: '16px',
        verticalAlign: 'middle',
    },
};

export default Post;
