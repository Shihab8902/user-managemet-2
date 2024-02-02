import { useContext } from "react"
import { Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"
import Swal from "sweetalert2"

const Login = () => {

    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    //Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        //Login user
        loginUser(email, password)
            .then(res => {
                if (res) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Logged in successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/")
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: error.message
                });
            });
    }





    return <div className=" shadow-lg my-5 p-5 custom-width mx-auto rounded-2">
        {/* Title text */}
        <h3 className=" text-center text-uppercase ">Login </h3>

        {/* Form element */}
        <Form className="mt-5" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label className=" fw-semibold">Email*</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label className=" fw-semibold">Password*</Form.Label>
                <Form.Control type="password" name="password" placeholder="Minimum 6 character" required />
            </Form.Group>

            <Form.Group className="mt-4" controlId="submit">
                <Form.Control size="lg" className="bg-primary text-white" type="submit" value="Login" />
            </Form.Group>

            <p className="text-center mt-3 ">Don't have an account? <Link className="text-decoration-none hover-text-decoration-underline" to="/register">Register</Link></p>

        </Form>





    </div>
}

export default Login