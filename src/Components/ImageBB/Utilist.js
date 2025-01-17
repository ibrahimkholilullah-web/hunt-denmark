import axios from "axios"

export const imageUpload = async imageData =>{
    const formData = new FormData()
    formData.append('image', imageData)
    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAG_API}`, formData)
    return data.data.display_url
}

export const saveUser = async (user) =>{
    await axios.post(`${import.meta.env.VITE_PROJECT_APT}/users/${user.email}`,{
        name : user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        status: "pending"
    })
}