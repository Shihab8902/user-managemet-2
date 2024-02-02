import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import Swal from 'sweetalert2';




const Register = () => {

    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();



    //States
    const [picture, setPicture] = useState(null);

    const imageHostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;



    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const dateOfBirth = form.dateOfBirth.value;
        const password = form.password.value;


        //Check for password length
        if (password.length < 6) {
            return Swal.fire({
                title: "Password Error!",
                icon: "error",
                text: "Password must be at least 6 character!"
            })
        }






        //Host user image to imagebb
        axios.post(`https://api.imgbb.com/1/upload?key=${imageHostingAPIKey}`, { image: picture[0] }, {
            headers: {
                "content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data?.success) {
                    const imageURL = res.data?.data.display_url;

                    // Create user
                    createUser(email, password)
                        .then(res => {
                            if (res.user) {

                                const data = { name, email, phone, dateOfBirth, password, picture: imageURL };
                                axios.post("http://localhost:9000/user", data)
                                    .then(res => {
                                        if (res.data) {
                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                text: "Account registered successfully!",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate("/")

                                        }
                                    })
                            }
                        }).catch(error => {
                            Swal.fire({
                                title: "Error!",
                                icon: "error",
                                text: error.message
                            })
                        })
                }
            })


    }





    return <div className=" shadow-lg my-5 custom-width p-5 mx-auto rounded-3">
        {/* Title text */}
        <h3 className=" text-center text-uppercase ">Register account</h3>

        {/* Form element */}

        <Form className="mt-5" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label className=" fw-semibold">Name*</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" name="name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label className=" fw-semibold">Email*</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
                <Form.Label className=" fw-semibold">Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter your phone number" name="phone" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Label className=" fw-semibold">Date of birth*</Form.Label>
                <Form.Control type="date" name="dateOfBirth" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="picture">
                <Form.Label className=" fw-semibold">Profile picture*</Form.Label>
                <Form.Control onChange={(e) => setPicture(e.target.files)} type="file" accept="image/*" name="picture" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label className=" fw-semibold">Password*</Form.Label>
                <Form.Control type="password" name="password" placeholder="Minimum 6 character" required />
            </Form.Group>

            <Form.Group className="mt-4" controlId="submit">
                <Form.Control size="lg" className="bg-primary text-white" type="submit" value="Register" />
            </Form.Group>

            <p className="text-center mt-3 ">Already have an account? <Link className="text-decoration-none hover-text-decoration-underline" to="/login">Login</Link></p>

        </Form>

    </div>


}

export default Register