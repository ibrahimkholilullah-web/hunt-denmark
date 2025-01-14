import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.config';
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // create user
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo) =>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
    }
    const signUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email,password)
    }
    const signOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const googleSignInUser = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            setLoading(false)
        })
        return () =>{
            return unsubscribe()
        }
    },[])
    const dataInfo = {
        createUser,
        signUser,
        loading,
        updateUser,
        signOutUser,
        googleSignInUser, user,
    }
    return (
        <AuthContext.Provider value={dataInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;