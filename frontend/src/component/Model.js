import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../axiosSetup';


function Model({sendDataToParent}) {
    
    const [show, setShow] = useState(false);
    const [postDescription, setPostDescription] = useState('');
    const [postImage, setPostImage] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSaveChanges = () => {
        // Handle the form submission here
        console.log('Post Description:', postDescription);
        console.log('Post Image:', postImage);
        const formData = new FormData();
        formData.append('description', postDescription);
        formData.append('title', 'postDescription');

        formData.append('image', postImage);
        sendPost(formData)

        // Close the modal after saving changes
        setShow(false);
    };
    async function sendPost(formData) {
        try {
            const response = await axiosInstance.post('/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data)
            sendDataToParent(response.data);
            if (response && response.data.statusCode == 200) {
                // const token = response.data.data.token;

                // Store token in localStorage
                // localStorage.setItem('token', token);

                // Navigate to the home page or any other page
                // navigate('/post');

            }


        } catch (error) {
            // setError('Invalid email or password');
        }
    }

    const handleDescriptionChange = (e) => {
        setPostDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setPostImage(e.target.files[0]);
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow} className='btn-left'>
                Create Post
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="postDescription">
                            <Form.Label>Post Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={postDescription}
                                onChange={handleDescriptionChange}
                                placeholder="Write your post description here..."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postImage">
                            <Form.Label>Post Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Model;