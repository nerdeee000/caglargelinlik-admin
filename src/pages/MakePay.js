import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CostumerService from '../services/costumer';
import RoutingInfo from '../components/RoutingInfo'
import MainLayout from '../core/MainLayout'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
  },
};


const validationSchema = Yup.object({
    payer: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    amount: Yup.number().typeError("Lütfen doğru bir tutar giriniz.").required("Zorunlu alan. Boş Bırakılamaz!"),
});


export default function MakePay({match}) {

    const [remainingAmount, setRemainingAmount] = useState("");
    const [showRemainingAmount, setShowRemainingAmount] = useState("");
    const [undoAction, setUndoAction] = useState(false)
    const [undoActionTimer, setUndoActionTimer] = useState(10)


    const { setFieldValue, handleSubmit, handleChange, values, errors, isValid } = useFormik({
		initialValues: {
            payer: '',
            amount: ''
        },
        validationSchema,
        onSubmit: () => {
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
        }
    });

    const { payer, amount } = values;

    const onAmountHandle = async (e, setFieldValue) => {
        setFieldValue('amount', e.target.value );
        setShowRemainingAmount(remainingAmount - e.target.value);
    }

    useEffect(() => {
        const init = async () => {
            const remainingData = await CostumerService.getRemainingAmount(match.params.id);
            setRemainingAmount(remainingData);
            setShowRemainingAmount(remainingData);
        }
        init();
    }, []);

    return (
        <MainLayout>
            <div className="flex flex-col mt-16 mx-auto mx-20 max-w-sm">
                <RoutingInfo route={["Müşteri Listesi", "Ödeme Noktası"]}/>
                <div className="flex flex-col mb-5">
                    <input type="text" value={payer} name="payer" onChange={ handleChange } className="form-control mb-2" placeholder="Ödeme Yapan"/>
                    { errors.payer ? <p className="error-message">{errors.payer}</p> : null}
                    <input type="text" value={amount} name="amount" onChange={ (e)=>{ onAmountHandle(e, setFieldValue)} } className="form-control mb-2" placeholder="Ödeme Miktarı"/>
                    { errors.amount ? <p className="error-message">{errors.amount}</p> : null}
                    { 
                        undoAction ?
                        <div className="flex flex-col">
                            <button className="btn btn-link-primary primary mt-3">İşlemi Geri al</button>
                            <p className="sub-header text-center">İşlemi geri almak için son {undoActionTimer} saniye</p>
                        </div> : 
                        <button onClick={handleSubmit} className="btn btn-primary">Ödemeyi Gerçekleştir</button>
                    }
                    
                </div>

                <div className="bg-gray-100 px-4 py-2 rounded-md border">
                    <h1 className="text-xl font-medium">Kalan Miktar: <span>{showRemainingAmount}</span> </h1>
                    <h1 className="sub-header">Canlı olarak kalan miktarı görüntüleme sağlar.</h1>
                </div>
            </div>
        </MainLayout>
    )
}
