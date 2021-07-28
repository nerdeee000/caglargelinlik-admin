import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Left, Right } from '../utils/Icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CostumerService from '../services/costumer';
import RoutingInfo from '../components/RoutingInfo'
import Layout from '../core/Layout';
import Alert from '../utils/Alert'

const validationSchema = Yup.object({
    payer: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    amount: Yup.number().typeError("Lütfen doğru bir tutar giriniz.").required("Zorunlu alan. Boş Bırakılamaz!"),
});

export default function MakePay({match}) {



    const [paymentDoneSuccess, setPaymentDoneSuccess] = useState(false)
    const [paymentCancelInfo, setPaymentCancelInfo] = useState(false)
    const [isCompletedPayment, setIsCompletedPayment] = useState(false)

    /* Kalan tutar İle ilgili state yönetimi */
    const [remainingAmount, setRemainingAmount] = useState("");
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [showRemainingAmount, setShowRemainingAmount] = useState("");
    const [isErrorRemainingAmount, setIsErrorRemainingAmount] = useState(false)

    /* Ödeme işlemini geri almaya yönelik state yönetimi */
    const [undoAction, setUndoAction] = useState(false)
    const [undoActionTimer, setUndoActionTimer] = useState(10)

    /* Ödeme geçmişinde gezinme ile ilgili state yönetimi  */
    const [currentIndex, setCurrentIndex] = useState(0);

    const { setFieldValue, handleSubmit, handleChange, values, errors, isValid } = useFormik({
		initialValues: {
            payer: '',
            amount: ''
        },
        validationSchema,
        onSubmit: (values) => {
            setUndoAction(true);
            const timer = setInterval(() => {
                setUndoActionTimer(curr => {
                    if(curr === 1){
                        clearInterval(timer);
                        setUndoActionTimer(10);
                        setUndoAction(false);
                    }
                    return --curr;
                })
            }, 1000);
            CostumerService.makePay(values, match.params.id)
                .then((response)=>{
                    console.log(response);
                    setPaymentDoneSuccess(true);
                    setTimeout(() => {
                        setPaymentDoneSuccess(false);
                    }, 2000);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    });

    const { payer, amount } = values;

    const onAmountHandle = async (e, setFieldValue) => {
        setFieldValue('amount', e.target.value );
        if(e.target.value <= remainingAmount){
            setIsErrorRemainingAmount(false)
            setShowRemainingAmount(remainingAmount - e.target.value);
        }
        else{
            setIsErrorRemainingAmount(true)
        }
    }

    const cancelMakePay = () => {
        CostumerService.cancelMakePay(match.params.id, amount)
            .then((response)=>{
                console.log(response);
                setPaymentDoneSuccess(false);
                setPaymentCancelInfo(true);
                setUndoAction(false)
                    setTimeout(() => {
                        setPaymentCancelInfo(false);
                    }, 2000);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        const init = async () => {
            const remainingData = await CostumerService.getRemainingAmount(match.params.id);
            const paymentHistory = await CostumerService.detailCostumer(match.params.id);
            setPaymentHistory(paymentHistory.payment.payment_history.reverse());
            setRemainingAmount(remainingData);
            setShowRemainingAmount(remainingData);
            if(remainingData === 0) {
                setIsCompletedPayment(true)
            }
        }
        init();
    }, []);

    const formatDate = (date) => {
        const data = new Date(date);
        const MyDateString = ('0' + data.getDate()).slice(-2) + '/'
             + ('0' + (data.getMonth()+1)).slice(-2) + '/'
             + data.getFullYear();

        return MyDateString;
    }

    const paymentViewForwards = () => {
        if(currentIndex < paymentHistory.length - 1){
            setCurrentIndex(curr => ++curr);
        }
    }
    
    const paymentViewBack = () => {
        if(currentIndex > 0){
            setCurrentIndex(curr => --curr);
        }
    }

    return (
        <Layout>
            <div>
                {
                    isCompletedPayment ?
                    <div className="flex flex-col items-center justify-center border border-green-600 bg-green-50 p-4 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h1 className="text-center font-bold text-green-800 text-xl my-3">KAYITLI ÖDEMELER TAMAMLANMIŞTIR</h1>
                        <p className="font-light text-sm text-center text-green-800">Ödemeler tamalanmıştır. Ödeme geçmişi için aşağıdaki <span className="font-medium">Ödeme Geçmişi</span> bölümünü inceleyebilirsiniz.</p>
                    </div> :
                    <Fragment>
                        <div className="bg-gray-50 p-4 rounded-md border mb-3">
                            <h1 className="text-xl font-medium">Kalan Miktar: <span>{showRemainingAmount}</span> </h1>
                            <h1 className="sub-header">Canlı olarak kalan miktarı görüntüleme sağlar.</h1>
                        </div>

                        {
                            paymentDoneSuccess ?
                            <Alert success content="Ödeme işlemi başarı ile alınmıştır."/>
                            : null
                        }

                        {
                            paymentCancelInfo ?
                            <Alert warn content="Ödeme işlemi başarı ile geri alınmıştır."/>
                            : null
                        }

                        <div className="flex flex-col mb-5 mt-3">
                            <input type="text" value={payer} name="payer" onChange={ handleChange } className="form-control mb-2" placeholder="Ödeme Yapan"/>
                            { errors.payer ? <p className="error-message">{errors.payer}</p> : null}
                            <input type="text" value={amount} name="amount" onChange={ (e)=>{ onAmountHandle(e, setFieldValue)} } className="form-control mb-2" placeholder="Ödeme Miktarı"/>
                            { errors.amount ? <p className="error-message">{errors.amount}</p> : null}
                            { isErrorRemainingAmount ? <p className="error-message">Kalan tutardan daha büyük değer girilemez</p> :  null}
                                    
                            { 
                                undoAction ?
                                <div className="flex flex-col">
                                    <button onClick={cancelMakePay} className="btn btn-link-primary primary mt-3">İşlemi Geri al</button>
                                    <p className="sub-header text-center">İşlemi geri almak için son {undoActionTimer} saniye</p>
                                </div> : 
                                <button disabled={!isValid} onClick={handleSubmit} className="btn btn-primary">Ödemeyi Gerçekleştir</button>
                            }           
                        </div>
                    </Fragment>
                }
        

                    <h2 className="font-medium mt-10">Ödeme Geçmişi</h2>
                    <p className="sub-header mb-3">Sola kaydırarak tüm geçmişe göz atabilirsiniz.</p>
                    <div className="flex bg-gray-100 border relative">
                         { 
                            paymentHistory.map((payment, i) => (
                                currentIndex === i ?
                                    <Fragment key={i}>
                                        {
                                            i !== 0 ?
                                            <button onClick={paymentViewBack} className="flex self-center justify-center items-center rounded-full bg-blue-600 shadow-lg w-7 h-7 absolute -ml-2.5 focus:outline-none">
                                                <Left/>
                                            </button> : null
                                        }

                                        <div className="flex mx-auto my-1 p-5">
                                            <Fragment>
                                                <div className="flex items-center relative mr-5">
                                                    {
                                                        i === 0 ?
                                                        <div className="flex items-center justify-center">
                                                            <span className="absolute flex bg-blue-600 w-4 h-4 rounded-full"></span>
                                                            <span className="absolute flex bg-blue-600 w-5 h-5 rounded-full animate-ping"></span>
                                                        </div> :
                                                        <span className="absolute flex bg-gray-600 w-4 h-4 rounded-full"></span>
                                                    }
                                                </div>
                                                <div className="flex flex-col ml-3">
                                                    <p>{payment.payer}</p> 
                                                    <p className="sub-header"><span className="font-bold mr-1">Ödeme Türü:</span>{paymentHistory.length - (++i) === 0 ? "Kapora" : `${paymentHistory.length - (i++)}. Taksit`}</p> 
                                                    <p className="sub-header"><span className="font-bold mr-1">Ödeme Tutarı:</span>{payment.amount}</p> 
                                                    <p className="sub-header"><span className="font-bold mr-1">Ödeme Zamanı:</span>{formatDate(payment.updatedAt)}</p> 
                                                </div>      
                                            </Fragment>
                                        </div>
                                        
                                        {
                                            currentIndex !== paymentHistory.length - 1 && paymentHistory.length > 1 ?
                                            <button onClick={paymentViewForwards} className="flex self-center justify-center right-0 items-center rounded-full bg-blue-600 shadow-lg w-7 h-7 absolute -mr-2.5 focus:outline-none">
                                                <Right/>
                                            </button> : null
                                        }

                                    </Fragment> : null
                                
                            ))
                         }
                    </div>

                    <div className="flex justify-start relative">
                        <div style={{width: `${(100/paymentHistory.length) * (currentIndex + 1)}%`}} className="absolute bg-blue-700 h-0.5"></div>
                        <div className="bg-gray-300 h-0.5 w-full"></div>
                    </div>
            </div>
        </Layout>
    )
}
