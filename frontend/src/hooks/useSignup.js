import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
    const [ loading, setLoanding] = useState(false)
    const { setAuthUser} = useAuthContext()

    const signup = async( {fullName, username, password, confirmePassword, gender}) => {
       const success = handleIpuntErrors({fullName,username,password,confirmePassword,gender})
       if (!success) return; 
       setLoanding(true)
       try {
        const res = await fetch("/api/auth/signup",{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify({fullName, username,password,confirmePassword,gender}),
        })
        const data = await res.json()
        if(data.error){
            throw new Error(data.error)
        }

        localStorage.setItem("chat-user", JSON.stringify(data))
        setAuthUser(data);
       } catch (error) {
        toast.error(error.message)
       }finally{
        setLoanding(false)
       }

      
    }
    return {loading, signup}
}

export default useSignup

function handleIpuntErrors ({fullName,username,password,confirmePassword,gender}){
    if(!fullName || !username || !password || !confirmePassword || !gender){
        toast.error("please fill in all fields")
        return false
    }
    if (password !== confirmePassword) {
        toast.error("Passwords do not match")
        return false
    }
    if(password.length < 6){
        toast.error("Password must be at least 6 characters")
        return false
    }
    return true
}