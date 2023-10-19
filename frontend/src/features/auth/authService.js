//this service is stricitly for sending request
import axios from "axios"


const API_URL = "/api/users/"
//Register funciton
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    //we need to store to local storage
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(userData))
    }

    return response.data
}

//Logout
const logout = async () => {
    localStorage.removeItem("user")
}


const authService = {
    register,
    logout,
    login
}

export default authService