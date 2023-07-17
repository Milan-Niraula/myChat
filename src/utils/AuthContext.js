import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setuser] = useState(null)

    useEffect(() => {
        getUserOnload()
    }, [])

    const getUserOnload = async () => {
        try {
            const accountDetails = await account.get();
            setuser(accountDetails)
            console.log("accountDetails", accountDetails);
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()

        try {
            const response = await account.createEmailSession(credentials.email, credentials.password);
            console.log("Logged in!!:", response);
            const accountDetails = await account.get();
            setuser(accountDetails)

            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const handleUserLogout = async () => {
        await account.deleteSession('current')
        setuser(null)
    }

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault()

        if (credentials.password1 !== credentials.password2) {
            alert("password do not matched")
            return
        }
        try {
            let response = account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            )

            console.log('Registered!!', response)
            navigate('/login')
            alert('User Registered Successfully!!..')
        } catch (error) {
            console.error(error)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}

    </AuthContext.Provider>
}

export const useAuth = () => { return useContext(AuthContext) }
export default AuthContext;