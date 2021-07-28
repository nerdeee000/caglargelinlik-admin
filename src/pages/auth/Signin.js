import React from 'react'
import AuthLayout from '../../core/AuthLayout'
import { Link } from 'react-router-dom'

export default function Signin() {

    return (
        <AuthLayout>
            <Link to="/signin/with-username">
                <button className="btn btn-primary btn-block">Kullanıcı adı ile devam et</button>
            </Link>
        </AuthLayout>
    )
}
