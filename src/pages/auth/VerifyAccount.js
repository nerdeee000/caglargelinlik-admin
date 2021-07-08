import React, { useState } from 'react'
import AuthLayout from '../../core/AuthLayout'
import AuthService from '../../services/auth'
import { authenticate } from './Helpers';

export default function VerifyAccount({match}) {

    const [activeCodeInput, setActiveCodeInput] = useState("")

    const handleChange = (event) => {
        setActiveCodeInput(event.target.value);
    }

    const clickSubmit = async () => {
        const token = match.params.token;
        await AuthService.verifyAccount(token, activeCodeInput)
            .then((response)=>{
                console.log("Signup success...");
                authenticate(response, ()=>{
                })
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
    }
    return (
        <AuthLayout>
            <input type="text" className="form-control font-mono text-center mb-3" onChange={handleChange} placeholder="CAGLAR-KOD"/>
            <button onClick={clickSubmit} className="btn btn-primary btn-block">Telefonu doğrula</button>
        </AuthLayout>
    )
}
