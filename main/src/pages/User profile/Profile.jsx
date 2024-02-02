import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

import axios from 'axios';
import Swal from 'sweetalert2';

const Profile = () => {

    const { user, logOutUser } = useContext(AuthContext);

    //Fetch user data
    const { isPending, refetch, data = {} } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:9000/user?email=${user?.email}`);
            return response.data;
        }
    });

    const { picture, name, email, phone, dateOfBirth } = data;


    //Handle logout
    const handleLogout = () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                logOutUser()
                    .then(() => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "You are logged out successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    }




    return <>

        {
            user ? <>

                {
                    isPending ? "Fetching..." :
                        <div className="custom-profile-width shadow-lg mx-auto  my-5 rounded-3">
                            {/* Upper section */}
                            <div className=' bg-primary p-4 rounded-top-3'>
                                <div className=' d-flex justify-content-center'>
                                    <img className=' rounded-circle border border-white' style={{ width: "100px", height: "100px" }} src={picture} alt={name} />
                                </div>
                                <h4 className='text-center mt-1 fw-bold text-white'>{name}</h4>
                            </div>

                            {/* Action button */}
                            <div className=' d-flex gap-4 justify-content-center mt-4'>
                                <button onClick={handleLogout} className=' btn btn-danger '>Logout</button>
                                <button className='btn btn-primary '>Edit profile</button>
                            </div>

                            {/* Additional Information */}
                            <ul className='list-unstyled py-4 px-5'>
                                <li className='fw-bold mb-2'>Email: <span className='fw-medium'>{email}</span></li>
                                <li className='fw-bold mb-2'>Phone: <span className='fw-medium'>{phone || "Unknown"}</span></li>
                                <li className='fw-bold mb-2'>Date of Birth: <span className='fw-medium'>{dateOfBirth}</span></li>
                            </ul>


                        </div>
                }

            </>
                : "forbidden"
        }





    </>
}

export default Profile