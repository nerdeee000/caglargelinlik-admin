import React, { useEffect, useState, Fragment } from 'react'
import CostumerService from '../services/costumer'
import { Calendar } from '../utils/Icons'
import MainLayout from '../core/MainLayout'
import { useHistory } from 'react-router-dom'
import DatePicker from "react-datepicker";
import ReactPaginate from 'react-paginate';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from  "react-router-dom";

export default function CostumerList() {

    const [user, setUser] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [searchFilterUserArray, setSearchFilterUserArray] = useState([]);
    const [dateFilterUserArray, setDateFilterUserArray] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [pageNumber, setPageNumber] = useState(0)
    
    let history = useHistory();

    const userPerPage = 5;
    const pagesVisited = pageNumber * userPerPage;

    const displayUsers = filterUsers.slice(pagesVisited, pagesVisited + userPerPage);    

    const goDetailPage = (userItem) => {
        history.push(`/costumer/${userItem._id}`);
    }

    useEffect(() => {
        const init = async () => {
            const userList = await CostumerService.listCostumer();
            setUser(userList);
            setFilterUsers(userList)
        }
        init();
    }, []);


    const getPay = async (userItem) => {
        history.push(`/costumer/make-pay/${userItem._id}`);
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


    const handlePageClick = ({selected}) => {
        setPageNumber(selected)
    }
    

    const handleSearch = (e) => {
        const search = e.target.value;
        if(dateFilterUserArray.length > 0){
            const searchFilters = dateFilterUserArray.filter((val)=>{
                if( search === ""){
                    return val;
                } else if( val.personal.name_surname.toLowerCase().includes(search.toLowerCase()) || val.personal.primary_phone.includes(search.toLowerCase())) {
                    return val;
                }
            }); 
            setFilterUsers(searchFilters);
        }else{
            const searchFilters = user.filter((val)=>{
                if( search === ""){
                    return val;
                } else if( val.personal.name_surname.toLowerCase().includes(search.toLowerCase()) || val.personal.primary_phone.includes(search.toLowerCase())) {
                    return val;
                }
            });
            setSearchFilterUserArray(searchFilters)
            setFilterUsers(searchFilters);
        }
    }


    const handleBetweenHandle = (finishDate) => {
        setFinishDate(finishDate)
        if(searchFilterUserArray.length > 0){
            const dateFilterUsers = searchFilterUserArray.filter((val)=>{
                if(startDate === "" || finishDate === ""){
                    return val;
                }
                else if(new Date(startDate) - new Date(val.product.test_date) <= 0 && new Date(finishDate) - new Date(val.product.test_date) >= 0){
                    return val;
                }
            })
            setFilterUsers(dateFilterUsers); 
        }else{
            const dateFilterUsers = user.filter((val)=>{
                if(startDate === "" || finishDate === ""){
                    return val;
                }
                else if(new Date(startDate) - new Date(val.product.test_date) <= 0 && new Date(finishDate) - new Date(val.product.test_date) >= 0){
                    return val;
                }
            })
            setDateFilterUserArray(dateFilterUsers)
            setFilterUsers(dateFilterUsers);
        }
    }

    const resetFilter = () => {
        setDateFilterUserArray([])
        setSearchFilterUserArray([]);
        setStartDate("");
        setFinishDate("");
        setFilterUsers(user);
    }

    return (
        <MainLayout>
            <div className="flex flex-col mx-10 relative">
                <button className="btn btn-primary absolute right-0">
                    <Link to="/costumer-add">
                        Müşteri Ekle
                    </Link>
                </button>
                <button onClick={()=>{resetFilter()}} className="btn btn-secondary absolute ml-2">Filtreleri Temizle</button>
                <div className="p-4 mt-16 border rounded-md">
                    <div className="flex">
                        <div className="flex-1">
                            <DatePicker placeholderText="Filtrelenecek İlk Tarih" className="form-control-sm bg-gray-50" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date)=>{setStartDate(date)}} />                       
                            <DatePicker placeholderText="Filtrelenecek Son Tarih" className="form-control-sm bg-gray-50 ml-2"  dateFormat="dd/MM/yyyy" selected={finishDate} onChange={(date)=>{handleBetweenHandle(date)}} /> 
                            <div className="flex items-center mt-3 mb-4">
                                <Calendar/>
                                <p className="sub-header ml-1">İki tarih seçerek, arasında bulunan tüm <span className="font-medium bg-yellow-200 px-1 p-0.5 rounded-md">PROVA GÜNLERİNİ</span> getirmesini sağlayabilirsiniz.</p>
                            </div>
                        </div>
                        <div className="flex flex-col flex-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute mt-1.5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" onChange={handleSearch} className="font-light pl-9 py-1 border rounded-md focus:border-blue-500 focus:outline-none bg-gray-50"/>
                            <p className="sub-header mt-3 mb-4">Tüm müşterilerde <span className="font-medium bg-yellow-200 px-1 p-0.5 rounded-md">Ad Soyad</span> ve <span className="font-medium rounded-md bg-yellow-200 px-1 p-0.5">Telefon</span> gibi özellikleri arayabilirsiniz.</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto border rounded-t-md mt-3 p-4 bg-gray-50">
                        <table className="container mx-auto">
                            <thead>
                                <tr className="border-transparent border-l-4">
                                    <th className="text-left">Ad Soyad</th>
                                    <th className="text-left">Telefon</th>
                                    <th className="text-left">Prova Tarihi</th>
                                    <th className="text-left">Ödeme Durumu</th>
                                    <th className="text-left">Ödeme Al</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    displayUsers.map((userItem, index) => (
                                        <tr className="hover:bg-gray-100" key={index}>
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
                    <ReactPaginate
                        previousLabel={'Geri'}
                        previousClassName={'btn btn-primary mr-4'}
                        nextLabel={'Sonraki'}
                        onPageChange={handlePageClick}
                        nextClassName={'btn btn-primary ml-4'}
                        breakLabel={'...'}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        containerClassName={'flex items-center py-3 justify-end pr-7 border-b border-l border-r rounded-b-md'}
                        activeClassName={'bg-blue-700 font-bold text-white'}
                        pageCount={Math.ceil(filterUsers.length/userPerPage)}
                        pageClassName={'flex items-center justify-center p-4 rounded-full w-5 h-5'}
                    />
                </div>
            </div>
        </MainLayout>
    )
}
