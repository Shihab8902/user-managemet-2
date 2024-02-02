import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

const DataModal = ({ isModalOpen, setIsModalOpen, data, refetch }) => {

    const { picture, name, email, phone, dateOfBirth, _id } = data;


    //States
    const [selectedImage, setSelectedImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const imageHostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;



    //Handle image preview
    const handleImageChange = (file) => {
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Update state with the base64-encoded image data
                setSelectedImage(reader.result);
            };

            // Read the selected file as a data URL
            reader.readAsDataURL(file);
            setNewImage(file);
        }
    }


    //Handle update information
    const handleUpdate = (data) => {
        axios.put(`https://user-management-2.vercel.app/user?id=${_id}`, data)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Profile updated!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    setIsModalOpen(!isModalOpen);
                    setIsUpdating(false);
                }
            }).catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
                setIsUpdating(false);
            })
    }



    //Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const dateOfBirth = form.dateOfBirth.value;

        setIsUpdating(true);

        //Check for image change
        if (newImage) {
            //Upload new image
            axios.post(`https://api.imgbb.com/1/upload?key=${imageHostingAPIKey}`, { image: newImage }, {
                headers: {
                    "content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    if (res.data?.success) {
                        const imageURL = res.data?.data.display_url;
                        const data = { name, email, phone, picture: imageURL, dateOfBirth };
                        handleUpdate(data);
                    }
                })
        } else {
            const data = { name, email, phone, picture, dateOfBirth };
            handleUpdate(data);
        }

    }





    return (
        <>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(!isModalOpen)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* Profile picture */}
                    <div className=' d-flex justify-content-center gap-2'>
                        <img className=' flex-shrink-0 rounded-circle border border-white' style={{ width: "100px", height: "100px" }} src={selectedImage || picture} alt={name} />
                        <Form.Control type="file" accept='image/*' onChange={(e) => handleImageChange(e.target.files[0])} name="picture" required />
                    </div>

                    <Form className='mt-3' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label className=" fw-semibold">Name*</Form.Label>
                            <Form.Control type="text" defaultValue={name} placeholder="Enter your name" name="name" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className=" fw-semibold">Email*</Form.Label>
                            <Form.Control type="email" defaultValue={email} placeholder="Enter your email" name="email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label className=" fw-semibold">Phone</Form.Label>
                            <Form.Control type="text" defaultValue={phone} placeholder="Enter your phone number" name="phone" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dateOfBirth">
                            <Form.Label className=" fw-semibold">Date of birth*</Form.Label>
                            <Form.Control type="date" defaultValue={dateOfBirth} name="dateOfBirth" required />
                        </Form.Group>

                        <Form.Group className="mt-4" controlId="submit">
                            <Form.Control disabled={isUpdating} size="lg" className="bg-primary text-white" type="submit" value={isUpdating ? "Saving..." : "Save changes"} />
                        </Form.Group>
                    </Form>


                </Modal.Body>


            </Modal>
        </>
    );
}

export default DataModal;


DataModal.propTypes = {
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func,
    data: PropTypes.object,
    refetch: PropTypes.func
}