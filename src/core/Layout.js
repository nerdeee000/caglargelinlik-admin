import React, { useEffect } from 'react'
import MainLayout from './MainLayout'

export default function Layout({ children }) {


    return (
        <MainLayout>
            <div className="max-w-xl mx-auto mt-5">
                { children }
            </div>
        </MainLayout>
    )
}
