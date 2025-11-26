import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase.init';

const AuthProvider = ({children}) => {
    const registerUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signinUser = (email, password)=>{
        return signInWithEmailAndPassword (auth, email, password)
    }

    const authInfo = {
        registerUser,
        signinUser,

        
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;