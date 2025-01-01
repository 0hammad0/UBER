import React, { createContext, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandlerLogin = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

        if (response.status === 200) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }


        setEmail('')
        setPassword('')
    }

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const submitHandlerSignup = async (e) => {
        e.preventDefault()

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

        if (response.status === 201) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }

        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')

    }

    return (
        <div>
            <UserDataContext.Provider value={{
                user,
                setUser,
                email,
                setEmail,
                password,
                setPassword,
                submitHandlerLogin,
                
                firstName,
                setFirstName,
                lastName,
                setLastName,
                submitHandlerSignup
            }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext