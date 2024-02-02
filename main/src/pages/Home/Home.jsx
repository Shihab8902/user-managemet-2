import Login from "../Login/Login";
import Profile from "../User profile/Profile";

const Home = () => {


    const user = false;



    return <section>
        {
            user ? <Profile /> : <Login />
        }
    </section>
}

export default Home