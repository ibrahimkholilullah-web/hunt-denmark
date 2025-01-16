import axios from 'axios';
import React from 'react';
const axiosePublic = axios.create({
    baseURL: import.meta.env.VITE_PROJECT_APT
})
const useAxiosePublic = () => {
    return axiosePublic;
};

export default useAxiosePublic;