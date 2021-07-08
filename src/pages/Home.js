import React from 'react'
import MainLayout from '../core/MainLayout'

export default function Home() {
    return (
        <MainLayout>
            <button className="btn btn-primary">Müşteri Ekle</button>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox"/>
                        </th>
                        <th>Ad Soyad</th>
                        <th>Birincil Telefon</th>
                        <th>Prova Tarihi</th>
                        <th>Ödeme Durumu</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr className="py-3 hover:bg-gray-100">
                        <td>
                                <input type="checkbox"/>
                            </td>
                        <td>Reşat YAVÇİN</td>
                        <td>+905457430302</td>
                        <td>22/09/2000</td>
                        <td>
                            <span className="font-medium bg-red-200 text-sm text-red-700 p-1.5 px-2 rounded-full">Tamamlanmadı</span>
                        </td>
                    </tr>
                
                </tbody>
            </table>
        </MainLayout>
    )
}
