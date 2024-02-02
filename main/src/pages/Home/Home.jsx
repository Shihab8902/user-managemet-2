import { useContext } from "react";
import Login from "../Login/Login";
import Profile from "../User profile/Profile";
import { AuthContext } from "../../context/AuthProvider";

const Home = () => {


    const { user } = useContext(AuthContext);
    console.log(user);



    return <section>
        {
            user ? <Profile /> : <Login />
        }
    </section>
}

export default Home