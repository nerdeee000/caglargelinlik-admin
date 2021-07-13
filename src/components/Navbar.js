import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Close } from '../utils/Icons'
import { signout } from '../pages/auth/Helpers';

export default function Navbar({openMenu, setOpenMenu}) {

    const closeNavbar = () => {
        setOpenMenu(false)
    }
    return (
        <div>
            <div className={openMenu ? 'sidenav active shadow-lg' : 'sidenav'}>
                <button onClick={closeNavbar} className="absolute m-4 focus:outline-none">
                    <Close/>
                </button>
                <div className="flex flex-col mt-20 w-full px-3">
                    <div className="">
                        <Link to="/costumer-add">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11h4" />
</svg>
                            <button className=" mb-2">Müşteri Ekle</button>
                        </Link>
                        <Link to="/product-add">
                            <button className="btn btn-primary btn-block mb-2">Ürün Ekle</button>
                        </Link>
                        <Link to="/costumer-list">
                            <button className="btn hover:bg-gray-200 btn-block mb-2">Müşteri Listesi</button>
                        </Link>
                        <Link to="/product-list">
                            <button className="btn hover:bg-gray-200 btn-block">Ürün Listesi</button>
                        </Link>

                        <div className="flex-1">
                            <div className="flex flex-col rounded-xl">
                                <div className="flex justify-center py-2">
                                    <div className="flex mt-1 items-center justify-center w-10 h-10 bg-purple-300 rounded-full">
                                        <h2 className="font-extrabold text-indigo-900">CG</h2>
                                    </div>
                                    <div className="ml-2">
                                        <p className="font-medium">caglargelinlik</p>
                                        <p className="text-xs">Eleman üyelik hesabı</p>
                                        <button onClick={signout} className="text-sm danger mt-2">Güvenli Çıkış</button>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
