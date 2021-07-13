import React, { useState, useEffect, Fragment } from 'react'
import AuthLayout from '../../core/AuthLayout'
import AuthService from '../../services/auth'
import { authenticate } from './Helpers';
import Alert from '../../utils/Alert'

export default function VerifyAccount({match}) {

    const [activeCodeInput, setActiveCodeInput] = useState("")
    const [undoAction, setUndoAction] = useState(false)
    const [undoActionTimer, setUndoActionTimer] = useState(10)
    const [signinErrors, setSigninErrors] = useState("")

    const handleChange = (event) => {
        setActiveCodeInput(event.target.value);
    }

    useEffect(() =>{
        setUndoAction(true)
        const timer = setInterval(() => {
            setUndoActionTimer(curr => {
                if(curr === 1){
                    clearInterval(timer);
                    setUndoActionTimer(10);
                    setUndoAction(false);
                    setSigninErrors("Kod süresi doldu. Lütfen Tekrar kod gönderimi yapınız.")
                }
                return --curr;
            })
        }, 1000);
    },[]);

    const clickSubmit = async () => {

        const token = match.params.token;
        await AuthService.verifyAccount(token, activeCodeInput)
            .then((response)=>{
                console.log("Signup success...");
                authenticate(response, ()=>{
                    console.log(response)
                })
            })
            .catch((error) => {
                setSigninErrors(error.response.data.error);
            })
    }
    return (
        <AuthLayout>
            {
                signinErrors ? 
                <Alert error header={signinErrors}/>
                : null
            }
            <input type="text" className="form-control font-mono text-center mb-3" onChange={handleChange} placeholder="CAGLAR-KOD"/>
            {
                undoAction ? 
                <Fragment>
                    <button onClick={clickSubmit} className="btn btn-primary btn-block">Telefonu doğrula</button>
                    <p className="font-light mt-5">Kalan Süre: {undoActionTimer} saniye</p>
                </Fragment> : 
                <Fragment>
                    <button className="btn primary btn-block hover:bg-blue-50 mt-3">Tekrar Gönder</button>
                </Fragment>
            }
        </AuthLayout>
    )
}
