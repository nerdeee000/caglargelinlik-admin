import React, { useState, useEffect } from 'react'
import { isAuth } from '../pages/auth/Helpers';
import { Redirect } from 'react-router-dom'
import RoutingInfo from '../components/RoutingInfo'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Layout from '../core/Layout'
export default function MainLayout({children}) {
    const [openMenu, setOpenMenu] = useState(false)
     
    const open = () => {
        setOpenMenu(true);
    }

    const props = { 
        openMenu: openMenu,
        setOpenMenu: setOpenMenu,
    }

    return (
        <div>
            { 
                isAuth() ?   
                <div className="flex">
                    <div>
                        <Navbar {...props}/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <RoutingInfo {...props} route={["efwjk", "klwnefj"]}/>
                        <div className="flex-1">
                            {children}
                        </div>
                        <Footer/>
                    </div>
                </div> :  
                <Redirect to='/signin' />
            }
        </div>
    )
}
