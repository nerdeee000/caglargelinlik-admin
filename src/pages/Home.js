import React, { Fragment, useEffect, useState } from 'react'
import {Pie, PieChart, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area} from 'recharts'
import { BarChart, Bar, Cell, Legend, ResponsiveContainer } from 'recharts';
import Alert from '../utils/Alert'
import CostumerService from '../services/costumer'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Confetti from 'react-confetti'
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const validationSchema = Yup.object({
    process_type: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    process_amount: Yup.number().required("Zorunlu alan. Boş Bırakılamaz!"),
});


export default function Home() {

    //Date Format Func.
    const formatDate = (date) => {
        const data = new Date(date);
        const MyDateString = ('0' + data.getDate()).slice(-2) + '/'
             + ('0' + (data.getMonth()+1)).slice(-2) + '/'
             + data.getFullYear();

        return MyDateString;
    }

    let [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    
    //PaymentData State
    const [paymentData, setPaymentData] = useState([]);
    const [paymentDataTotalEarning, setPaymentDataTotalEarning] = useState(0);
    const [paymentDataTotalDamage, setPaymentDataTotalDamage] = useState(0);
    const [filterPaymentData, setFilterPaymentData] = useState([]);
    
    //Chart State
    const [earningChart, setEarningChart] = useState([]);
    const [damageChart, setDamageChart] = useState([]);
    const [workerChart, setWorkerChart] = useState([]);
    const [employeeOfTheMonth, setEmployeeOfTheMonth] = useState("");


    //DatePicker Handle State
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");

    //Damage Alert State
    const [damageError, setDamageError] = useState(false);
    const [damageSuccess, setDamageSuccess] = useState(false);


    const dataPerPage = 5;
    const pagesVisited = pageNumber * dataPerPage;

    const displayPaymentData = filterPaymentData.slice(pagesVisited, pagesVisited + dataPerPage);    


    const handlePageClick = ({selected}) => {
        setPageNumber(selected)
    }

    const { handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
			process_type: '',
			process_amount: '',
        },
        validationSchema,
        onSubmit: (values) => {
            CostumerService.addDamage(values)
            .then(()=>{

                //Damage Alert Action
                setDamageError(false)
                setDamageSuccess(true)
                setTimeout(() =>{
                    setDamageSuccess(false)
                },1300);

            })
            .catch(() => {
                
                //Damage Alert Action
                setDamageSuccess(false)
                setDamageError(true)
                setTimeout(() =>{
                    setDamageError(false)
                },1300)

            })
        }
    });

    const { process_type, process_amount, } = values;

    useEffect(() => {
        const init = async () => {
            const paymentData = await CostumerService.getPaymentData();
            setPaymentData(paymentData)
            setFilterPaymentData(paymentData)

            const workerFind = await CostumerService.findWorker();
            setWorkerChart(workerFind);

            const earningData = await CostumerService.getEarningChart();
            setEarningChart(earningData)
            earningData.map(item =>(
                setPaymentDataTotalEarning(curr => curr + item.process_amount)
            ));

            const damageData = await CostumerService.getDamageChart();
            setDamageChart(damageData)
            damageData.map(item =>(
                setPaymentDataTotalDamage(curr => curr + item.process_amount)
            ));

            const monthWorker = await CostumerService.monthWorker();
            setEmployeeOfTheMonth(monthWorker)

        }
        init();
    }, []);


    const handleBetweenHandle = (finishDate) => {
            
            setFinishDate(finishDate)
            const dateFilterPaymentDataArray = paymentData.filter((val)=>{
                if(startDate === "" || finishDate === ""){
                    return val;
                }
                else if(new Date(startDate) - new Date(val.createdAt) <= 0 && new Date(finishDate) - new Date(val.createdAt) >= 0){
                    return val;
                }
            })
            setFilterPaymentData(dateFilterPaymentDataArray)
            
            const earningRange = earningChart.filter((val)=>{
                if(startDate === "" || finishDate === ""){
                    return val;
                }
                else if(new Date(startDate) - new Date(val.createdAt) <= 0 && new Date(finishDate) - new Date(val.createdAt) >= 0){
                    return val;
                }
            })

            const damageRange = damageChart.filter((val)=>{
                if(startDate === "" || finishDate === ""){
                    return val;
                }
                else if(new Date(startDate) - new Date(val.createdAt) <= 0 && new Date(finishDate) - new Date(val.createdAt) >= 0){
                    return val;
                }
            })

    }
    

    return (
        <Fragment>
            {
                localStorage.getItem('user_role').slice(1,localStorage.getItem('user_role').length-1) === 'YÖNETİCİ' ?
                <div className="flex flex-col">
                        <div className="flex">
                            <div className="flex flex-col">
                                <div className="flex flex-col m-2 p-5">
                                    <p className="sub-header mb-1">Filtreli Gelir Grafiği</p>
                                    <div className="flex items-end">
                                        <h2 className="font-bold text-3xl">{paymentDataTotalEarning} ₺</h2>
                                    </div>
                                     <AreaChart width={250} height={100} data={earningChart}>
                                        <Tooltip/>
                                        <Area type="monotone" dataKey="process_amount" stroke="#7AE0D6" strokeWidth="5" fillOpacity={1} fill="#EBFBFA" /> 
                                    </AreaChart>
                                </div>
                                <div className="flex flex-col m-2 p-5">
                                    <p className="sub-header mb-1">Filtreli Gider Grafiği</p>
                                    <div className="flex items-end">
                                        <h2 className="font-bold text-3xl">{paymentDataTotalDamage} ₺</h2>
                                    </div>
                                    <AreaChart width={250} height={100} data={damageChart}>
                                        <Tooltip/>
                                        <Area type="monotone" dataKey="process_amount" stroke="#F3A6BA" strokeWidth="5" fillOpacity={1} fill="#FDF2F8" />
                                    </AreaChart>
                                </div>

                                <div className="flex mt-3 p-3">
                                    <div>
                                        {
                                            damageError ?
                                            <Alert error header="Maalesef, gider eklenemedi"/> :
                                            null
                                        }
                                        {
                                            damageSuccess ?
                                            <Alert success header="Gider başarı ile eklendi"/> :
                                            null
                                        }
                                        <input type="text" onChange={handleChange} value={process_type} name="process_type" className="form-control my-2" placeholder="İşlem Türü"/>
                                        { errors.process_type ? <p className="error-message">{errors.process_type}</p> : null}
                                        <input type="text" onChange={handleChange} value={process_amount} name="process_amount" className="form-control mb-2" placeholder="İşlem Tutarı"/>
                                        { errors.process_amount ? <p className="error-message">{errors.process_amount}</p> : null}
                                        <button onClick={handleSubmit} type="submit" className="btn btn-block btn-danger">Gider Ekle</button>
                                    </div>
                                </div>

                            </div>
                        
                            <div className="flex-1 p-3 mr-4">
                                <DatePicker placeholderText="Filtrelenecek İlk Tarih" className="form-control-sm bg-gray-50" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date)=>{setStartDate(date)}} />                       
                                <DatePicker placeholderText="Filtrelenecek Son Tarih" className="form-control-sm bg-gray-50 ml-2 mb-7"  dateFormat="dd/MM/yyyy" selected={finishDate} onChange={(date)=>{handleBetweenHandle(date)}} /> 

                                <table className="container mx-auto">
                                    <thead>
                                        <tr>
                                            <th className="text-left">Müşteri Numarası (ID)</th>
                                            <th className="text-left">İşlem Türü</th>
                                            <th className="text-left">İşlem Tarihi</th>
                                            <th className="text-left">İşlem Tutarı</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            displayPaymentData.map((item, i) =>(
                                                <tr>
                                                    <td>
                                                        <Link to={`costumer/${item.costumer_id}`}>{item.costumer_id}</Link>
                                                    </td>
                                                    <td>{item.process_type}</td>
                                                    <td>{formatDate(item.createdAt)}</td>
                                                    <td className={item.isEarning ? 'text-green-600' : 'text-red-600'}>{item.process_amount}₺</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <ReactPaginate
                                    previousLabel={'Geri'}
                                    previousClassName={'btn btn-primary mr-4'}
                                    nextLabel={'Sonraki'}
                                    onPageChange={handlePageClick}
                                    nextClassName={'btn btn-primary ml-4'}
                                    breakLabel={'...'}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    containerClassName={'flex items-center py-3 justify-end pr-7 rounded-b-md'}
                                    activeClassName={'bg-blue-700 font-bold text-white'}
                                    pageCount={Math.ceil(filterPaymentData.length/dataPerPage)}
                                    pageClassName={'flex items-center justify-center p-4 rounded-full w-5 h-5'}
                                />
                                <div>
                                <BarChart
                                        width={500}
                                        height={300}
                                        data={workerChart}
                                        margin={{
                                            top: 30,
                                            right: 30,
                                            left: 30,
                                            bottom: 20,
                                        }}
                                    >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="countOrder" fill="#8884d8" />
                                </BarChart>
                                </div>
                            </div>
                            
                        </div>
                </div> : 
                <div className="mx-10">
                    <Alert warn header="Görüntülenme Sağlanamıyor" content="Analizler yalnızca yönetici kadrosuna açıktır. Diğer tüm işlemler için sayfada gezinebilmek üyelere açıktır."/>
                    <div className="flex flex-col mt-10 justify-center items-center">
                        <Confetti
                            width={1800}
                            height={400}
                        />
                        {
                            employeeOfTheMonth ? 
                            <p className="font-bold text-3xl text-blue-700 mt-4">{employeeOfTheMonth}</p> : 
                            <div className="flex flex-col items-center">
                                <ScaleLoader color="#275efe" radius="2" margin="4" width="4" height="35"/>
                                <p className="text-blue-700 animate-pulse">YÜKLENİYOR...</p>
                            </div>
                        }
                        <p className="font-bold text-xl mt-4">Tebrikler ayın elemanı sizsiniz 🎉🎉🎉</p>
                        <p className="sub-header mt-2"><span className="font-bold">DİPNOT:</span> Ayın sonuna kadar sürekli güncellenmektedir. Ayın başında tekrar sıfırlanmaktadır.</p>
                    </div>
                </div>
            }
        </Fragment>
    )
}
