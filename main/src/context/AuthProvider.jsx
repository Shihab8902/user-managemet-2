import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import app from '../firebase/firebase.config';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const auth = getAuth(app);

    //States
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    //Login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //Logout user
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }



    //User observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });


        //Unmount observer after session
        return () => unsubscribe();


    }, []);

    console.log(user)

    const userInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOutUser
    }


    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>




}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.node
}