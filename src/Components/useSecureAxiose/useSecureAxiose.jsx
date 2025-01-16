import axios from 'axios';
import useAuth from '../AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';
const axioseSecure = axios.create({
    baseURL : import.meta.env.VITE_PROJECT_APT
})
const useSecureAxiose = () => {
    const {signOutUser} = useAuth()
    const navigate = useNavigate()
    axioseSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('token')
        config.headers.authorization = `Bearer ${token}`
        console.log("request stop", token)
        return config;
    },function (error) {
        // Do something with request error
        return Promise.reject(error);
      })
      axioseSecure.interceptors.response.use(function (response){
        return response
      }, async (error) => {
        const status = error.response.status
        if(status === 401 || status === 403){
            await signOutUser()
            navigate('/login')
        }
        return Promise.reject(error);
      })
    return axioseSecure
};

export default useSecureAxiose;