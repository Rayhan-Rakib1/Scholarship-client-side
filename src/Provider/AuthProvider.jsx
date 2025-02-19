

import React, { createContext, useEffect, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';



export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosPublic = UseAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (updated) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updated)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log('current user', currentUser);
         if(currentUser){
            const userInfo = {email: currentUser.email};
            axiosPublic.post('/jwt', userInfo)
            .then(res => {
                if(res.data.token){
                    localStorage.setItem('access-token', res.data.token)
                    setLoading(false)
                }
    
            })
        
         }
         else{
            localStorage.removeItem('access-token')
         }
        });
        return () => {
            return unsubscribe();
        }
    },[axiosPublic])

    const authInfo = {
        user, loading, createUser, signIn, signOutUser, signInWithGoogle, updateUserProfile, resetPassword, setUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;