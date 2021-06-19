import React, { useState } from 'react'
import AuthLayout from '../../core/auth'
import AuthService from '../../services/auth'
import { authenticate } from './Helpers';

export default function SigninWithUsername() {

    const [values, setValues] = useState({
        username:"resatyavcin",
        password:"Rr22092000",
        buttonText:"Kullanıcı adı ile devam et"
    });

    const { username, password, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = async () => {
        await AuthService.signinWithUsername(username,password)
            .then((response)=>{
                console.log("Signup success...");
                authenticate(response, ()=>{
                    setValues({...values, username:'', password:'', buttonText: 'Giriş Sağlandı'})
                })
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
    }


    return (
        <AuthLayout>
            <input type="text" className="form-control mb-3" onChange={handleChange('username')} value={username} placeholder="Kullanıcı Adı"/>
            <input type="password" className="form-control mb-3" onChange={handleChange('password')} value={password} placeholder="Şifre"/>
            <button onClick={clickSubmit} className="btn btn-primary btn-block">{buttonText}</button>
        </AuthLayout>
    )
}
