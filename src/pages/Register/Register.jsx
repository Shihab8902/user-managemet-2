import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useState } from "react";


const Register = () => {

    //States
    const [picture, setPicture] = useState(null);


    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const dateOfBirth = form.dateOfBirth.value;
        const password = form.password.value;

        const data = { name, email, phone, dateOfBirth, password, picture };
        console.log(data);
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
                <Form.Control size="lg" className="bg-primary text-white" type="submit" />
            </Form.Group>

            <p className="text-center mt-3 ">Already have an account? <Link className="text-decoration-none hover-text-decoration-underline" to="/login">Login</Link></p>

        </Form>

    </div>


}

export default Register