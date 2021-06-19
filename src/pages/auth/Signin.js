import React from 'react'
import AuthLayout from '../../core/auth'
import { Link } from 'react-router-dom'

export default function Signin() {

    return (
        <AuthLayout>
            <Link to="/signin/with-username">
                <button className="btn btn-primary btn-block">Kullanıcı adı ile devam et</button>
            </Link>
            <hr className="my-4"/>
            <Link to="/signin/with-phone">
                <button className="btn btn-secondary btn-block">Telefon numarası ile devam et</button>
            </Link>
        </AuthLayout>
    )
}
