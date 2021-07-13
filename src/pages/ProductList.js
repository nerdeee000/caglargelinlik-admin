import React, { useEffect, useState } from 'react'
import CostumerService from '../services/costumer'
import MainLayout from '../core/MainLayout'
import { useHistory } from 'react-router-dom'
import MakePay from './MakePay';
export default function ProductList({match}) {

    const [product, setProduct] = useState([]);

    let history = useHistory();

    const goDetailPage = (userItem) => {
        history.push(`/costumer/${userItem._id}`);
    }

    useEffect(() => {
        const init = async () => {
            const productList = await CostumerService.listCostumer();
            setProduct(productList);
        }
        init();
    }, []);

    return (
        <MainLayout>
            <div className="overflow-x-auto">
                <table className="container mx-auto min-w-max">
                    <thead>
                        <tr className="border-transparent border-l-4">
                            <th className="text-left">ID</th>
                            <th className="text-left">Ürün Kodu</th>
                            <th className="text-left">Ürün Adı</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            product.map((userItem, index) => (
                                <tr className="relative" key={index}>
                                    <td>{++index}</td>
                                    <td>{userItem.personal.name_surname}</td>
                                    <td>{userItem.personal.primary_phone}</td>    
                                    <td className="ml-20">
                                        <div className="flex">
                                            <button onClick={ ()=>goDetailPage(userItem) } className="bg-indigo-200 rounded-full p-1 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button className="bg-indigo-200 ml-2 rounded-full p-1 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div> 
        </MainLayout>
    )
}
