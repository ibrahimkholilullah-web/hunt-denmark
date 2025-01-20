import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase.config";
import useAxiosePublic from "../PublicAxiose/useAxiosePublic";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosePublic = useAxiosePublic();

  // Create user with email and password
  const createUser = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUser = async (name, photo) => {
    try {
      setLoading(true);
      if (!auth.currentUser) throw new Error("No user is signed in.");
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in user with email and password
  const signUser = async (email, password) => {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    
  };

  // Sign out user
  const signOutUser = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const googleSignInUser = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userInfo = { email: currentUser.email };
          const { data } = await axiosePublic.post(`/jwt`, userInfo);
          if (data?.token) {
            localStorage.setItem("token", data.token);
          }
        } catch (error) {
          console.error("Error fetching token:", error);
        } finally {
          setLoading(false);
        }
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    });

    return unsubscribe; // Unsubscribe on cleanup
  }, [axiosePublic]);

  // Context data
  const dataInfo = {
    createUser,
    signUser,
    loading,
    updateUser,
    signOutUser,
    googleSignInUser,
    user,
  };

  return <AuthContext.Provider value={dataInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
