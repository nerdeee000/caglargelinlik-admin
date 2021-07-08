import React, { useState } from 'react'
import AuthLayout from '../../core/AuthLayout'
import AuthService from '../../services/auth'
import { authenticate } from './Helpers';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '../../utils/Alert'


const validationSchema = Yup.object({
    username: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!").max(20, "En fazla 20(On) karakter sınırı bulunmaktadır."),
    password: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!").max(15, "En fazla 15(On beş) karakter sınırı bulunmaktadır."),
});

export default function SigninWithUsername() {

    const [signinErrors, setSigninErrors] = useState("")

    const { handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
			username: '',
			password: '',
        },
        validationSchema,
		onSubmit: async (values) => {
            console.log(values)
            const { username, password } = values;
            await AuthService.signinWithUsername(username,password)
            .then((response)=>{
                console.log("Signup success...");
                authenticate(response, ()=>{
                    console.log(response)
                })
            })
            .catch((error) => {
                console.log(error.response.data.error);
                setSigninErrors(error.response.data.error)
            })
		},
    });

    const { username, password } = values;

    return (
        <AuthLayout>
            {
                signinErrors ? 
                <Alert error header={signinErrors}/>
                : null
            }
            <form className="flex flex-col">
                <input type="text" className="form-control" name="username" values={username} onChange={handleChange} placeholder="Kullanıcı Adı"/>
                <p className="self-start text-red-600 text-xs mb-3 mt-1 ml-2">
                    {errors.username ? errors.username : null}
                </p>
                <input type="password" className="form-control" name="password" values={password} onChange={handleChange} placeholder="Şifre"/>
                <p className="self-start text-red-600 text-xs mb-3 mt-1 ml-2">
                    {errors.password ? errors.password : null}
                </p>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Kullanıcı adı ile devam et</button>
            </form>
        </AuthLayout>
    )
}
