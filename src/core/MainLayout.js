import React, { useState } from 'react'
import Navbar from '../components/Navbar'

export default function MainLayout({children}) {

    const [openMenu, setOpenMenu] = useState(false)
    
    const open = () => {
        setOpenMenu(!openMenu);
    }

    const props = { 
        openMenu: openMenu
    }

    return (
        <div>
            { 
                /*
                    <button onClick={open} className="focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </button>
                */
            }
            <Navbar { ...props }/>
            { children }
        </div>
    )
}
