import React, { Fragment } from 'react'
import { isAuth } from '../pages/auth/Helpers';
import { Redirect } from 'react-router-dom'
export default function AuthLayout({children}) {
    return (
        <Fragment>
            { 
                isAuth() ? <Redirect to='/' /> :   
                <div className="auth-form text-center">
                <h2 className="header mb-7">caglargelinlik.com</h2>
                    {children}
                <p className="sub-header mt-7">
                    © caglargelinlik.com bu yönetim panelinin tüm hakları saklıdır. 
                    Her türlü güvenlik önlemi alınmış olup, başarısız girişim tehditleri tespit edilirse 
                    anayasal olarak dava için delil sayılır.
                </p>
                </div>
            }
        </Fragment>

    )
}
