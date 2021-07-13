import React, { useEffect, useState, Fragment } from 'react'
import CostumerService from '../services/costumer'
import { Calendar } from '../utils/Icons'
import MainLayout from '../core/MainLayout'
import { useHistory } from 'react-router-dom'
import MakePay from './MakePay';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDefaultLocale } from  "react-datepicker";
import tr from 'date-fns/locale/tr';


export default function CostumerList({match}) {

    const [user, setUser] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [filterSearch, setFilterSearch] = useState('');

    let history = useHistory();

    const goDetailPage = (userItem) => {
        history.push(`/costumer/${userItem._id}`);
    }

    useEffect(() => {
        const init = async () => {
            setDefaultLocale('tr', tr);
            const userList = await CostumerService.listCostumer();
            setUser(userList);
        }
        init();
    }, []);


    const getPay = async (userItem) => {
        history.push(`/costumer/make-pay/${userItem._id}`);
    }


    const handleSearch = (e) => {
        setFilterSearch(e.target.value);
    }



    const formatDate = (date) => {
        const data = new Date(date);
        const MyDateString = ('0' + data.getDate()).slice(-2) + '/'
             + ('0' + (data.getMonth()+1)).slice(-2) + '/'
             + data.getFullYear();

        return MyDateString;
    }

    const phoneFormat = (phone) => {
        const data = phone;
        return `${data.slice(2,data.length)}`;
    }

    return (
        <MainLayout>
            <div className="container mx-auto min-w-max bg-gray-100 p-4 border rounded-md">
                <div className="flex">
                    <div className="flex-1">
                        <DatePicker className="form-control-sm bg-gray-50" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date)=>setStartDate(date)} />                       
                        <DatePicker className="form-control-sm bg-gray-50 ml-2"  dateFormat="dd/MM/yyyy" selected={finishDate} onChange={(date)=>setFinishDate(date)} />
                        <div className="flex items-center mt-3 mb-4">
                            <Calendar/>
                            <p className="sub-header ml-1">İki tarih seçerek, arasında bulunan tüm <span className="font-medium bg-yellow-200 px-1 p-0.5 rounded-md">PROVA GÜNLERİNİ</span> getirmesini sağlayabilirsiniz.</p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute mt-1.5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" value={filterSearch} onChange={handleSearch} className="form-control-sm bg-gray-50"/>
                        <p className="sub-header mt-3 mb-4">Tüm müşterilerde <span className="font-medium bg-yellow-200 px-1 p-0.5 rounded-md">Ad Soyad</span> ve <span className="font-medium rounded-md bg-yellow-200 px-1 p-0.5">Telefon</span> gibi özellikleri arayabilirsiniz.</p>
                    </div>
                </div>
                <div className="overflow-x-auto border rounded-md mt-3 p-4 bg-gray-50">
                    <table className="container mx-auto">
                        <thead>
                            <tr className="border-transparent border-l-4">
                                <th className="text-left">ID</th>
                                <th className="text-left">Ad Soyad</th>
                                <th className="text-left">Telefon</th>
                                <th className="text-left">Prova Tarihi</th>
                                <th className="text-left">Ödeme Durumu</th>
                                <th className="text-left">Ödeme Al</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                user.filter((val)=>{
                                    if( filterSearch === ""){
                                        return val;
                                    } else if( val.personal.name_surname.toLowerCase().includes(filterSearch.toLowerCase()) || val.personal.primary_phone.includes(filterSearch.toLowerCase())) {
                                        return val;
                                    }
                                    }).map((userItem, index) => (
                                    <tr className="hover:bg-gray-100" key={index}>
                                        <td>{++index}</td>
                                        <td className="hover:underline hover:" onClick={()=>goDetailPage(userItem)}>{userItem.personal.name_surname}</td>
                                        <td>{phoneFormat(userItem.personal.primary_phone)}</td>
                                        <td>{formatDate(`${userItem.product.test_date}`)}</td>
                                        <td>
                                            <div className={userItem.payment.remaining !== 0 ? "text-red-600 text-sm" : "text-green-600 text-sm"}>
                                                {
                                                    userItem.payment.remaining !== 0 ? 
                                                    <div className="flex items-center"> 
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="ml-1">Tamamlanmadı</p>
                                                    </div> : 
                                                     <div className="flex items-center"> 
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        <p className="ml-1">Tamamlandı</p>
                                                    </div>
                                                }
                                            </div>
                                        </td>     
                                        <td className="ml-20">
                                            <div className="flex">
                                                <button onClick={ ()=> getPay(userItem) } className="flex btn btn-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
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
            </div>
        </MainLayout>
    )
}
