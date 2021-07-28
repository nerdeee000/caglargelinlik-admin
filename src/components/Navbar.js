import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { signout } from '../pages/auth/Helpers'
import { Analysis, Costumer ,Product, Bride, Signout} from '../utils/Icons'
export default function Navbar({openMenu, setOpenMenu}) {

    const close = () => {
        setOpenMenu(false)
    }

    return (
        <div>
            <div className="h-screen bg-white border-r w-72 hidden md:flex md:flex-col">
                <div className="flex flex-col items-center mt-7">
                    <Bride/>
                    <h2 className="text-2xl font-bold text-blue-600 mt-2">caglargelinlik.com</h2>
                    <h4 className=" text-blue-900 mb-3">İşletme Yönetim Paneli</h4>
                </div>
                <NavLink exact to="/" className="mt-10 mb-3 font-medium mx-5 p-3 rounded-md hover:bg-blue-50" activeClassName={'bg-blue-50 primary'}>
                    <div className="flex items-center">
                        <Analysis/>
                        <p className="ml-1">Analizler</p>
                    </div>
                </NavLink>
                <NavLink exact to="/costumer-list" className="mb-3 font-medium mx-5 p-3 rounded-md hover:bg-blue-50" activeClassName={'bg-blue-50 primary'}>
                    <div className="flex items-center">
                        <Costumer/>
                        <p className="ml-1">Müşteri İşlemleri</p>
                    </div>
                </NavLink>
                <NavLink exact to="/product-list" className="mb-3 font-medium mx-5 p-3 rounded-md hover:bg-blue-50" activeClassName={'bg-blue-50 primary'}>
                    <div className="flex items-center">
                        <Product/>
                        <p className="ml-1">Ürün İşlemleri</p>
                    </div>
                </NavLink>
            </div>
            <div className={openMenu ? "sidenav active flex flex-col shadow-lg" : "sidenav"}>
                <div className="flex flex-col items-center mt-7">
                    <Bride/>
                    <h2 className="text-2xl font-bold text-blue-600 mt-2">caglargelinlik.com</h2>
                    <h4 className=" text-blue-900 mb-3">İşletme Yönetim Paneli</h4>
                </div>
                <NavLink exact to="/" className="mt-10 mb-3 font-medium mx-5 p-3 rounded-md hover:bg-blue-50" activeClassName={'bg-blue-50 primary'}>
                    <div className="flex items-center">
                        <Analysis/>
                        <p className="ml-1">Analizler</p>
                    </div>
                </NavLink>
                <NavLink exact to="/costumer-list" className="mb-3 font-medium mx-5 p-3 rounded-md hover:bg-blue-50" activeClassName={'bg-blue-50 primary'}>
                    <div className="flex items-center">
                        <Costumer/>
                        <p className="ml-1">Müşteri İşlemleri</p>
                    </div>
                </NavLink>
                <NavLink exact to="/product-list" className="mb-3 font-medium mx-5 p-3 rounded-md hover:bg-blue-50" activeClassName={'bg-blue-50 primary'}>
                    <div className="flex items-center">
                        <Product/>
                        <p className="ml-1">Ürün İşlemleri</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
