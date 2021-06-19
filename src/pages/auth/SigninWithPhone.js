import React, { useState } from 'react'
import AuthLayout from '../../core/auth'
import AuthService from '../../services/auth'
import { authenticate } from './Helpers';
import { useHistory } from 'react-router-dom'

export default function SigninWithPhone() {

    let history = useHistory();

    const [values, setValues] = useState({
        phone: "+905457430302",
        buttonText: "Telefon numarası ile devam et"
    });

    const { phone, buttonText } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    }

    const clickSubmit = async () => {
        await AuthService.signinWithPhone(phone)
            .then((response)=>{
                console.log("Signup success...");
                setValues({...values, phone:"+90", buttonText: 'Giriş Sağlandı.'});
                history.push(`/signin/verify-account/${response.token}`);
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
    }

    return (
        <AuthLayout>
            <input type="text" className="form-control mb-3" onChange={handleChange('phone')} value={phone}/>
            <button onClick={clickSubmit} className="btn btn-primary btn-block">{buttonText}</button>
        </AuthLayout>
    )
}
