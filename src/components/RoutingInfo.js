import React, {useState, Fragment} from 'react'
import { signout } from '../pages/auth/Helpers'
import { Link } from 'react-router-dom'
import { Signout} from '../utils/Icons'

export default function RoutingInfo({route, openMenu, setOpenMenu}) {
    const [routing, setRouting] = useState(route)

    const open = () => {
        setOpenMenu(true)
    }

    return (
        <div className="flex items-center flex-wrap mb-5 px-4 py-3 items-center border-b bg-white">
            <p>Hoşgeldiniz, <span className="font-bold">{localStorage.getItem('user_name').slice(1, localStorage.getItem('user_name').length-1)}</span> </p>
            <p className="sub-header mt-0.5 ml-2 font-medium">({localStorage.getItem('user_role').slice(1, localStorage.getItem('user_role').length-1)})</p>
            <Link className="absolute right-0 mr-4" onClick={()=>(signout())} to='/'>
                <Signout/>
            </Link>
        </div>
    )
}
