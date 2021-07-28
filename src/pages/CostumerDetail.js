import React, { useEffect, useState, useRef } from 'react'
import Layout from '../core/Layout'
import QRCode from 'qrcode.react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AreYouSure from '../components/AreYouSure'
import CostumerService from '../services/costumer'
import ReactToPrint from 'react-to-print';

const validationSchema = Yup.object({
    name_surname: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    primary_phone: Yup.string().matches(/(\W+)(905)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/, "Geçerli bir telefon formatı giriniz.").required("Zorunlu alan. Boş Bırakılamaz!"),
    secondary_phone: Yup.string().matches(/(\W+)(905)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/, "Geçerli bir telefon formatı giriniz.").required("Zorunlu alan. Boş Bırakılamaz!"),
    address: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    wedding_date: Yup.string().typeError("Zorunlu alan. Boş Bırakılamaz!"),
    henna_date: Yup.string().typeError("Zorunlu alan. Boş Bırakılamaz!"),
    engagement_date: Yup.string().typeError("Zorunlu alan. Boş Bırakılamaz!"),
    product_code: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    test_date: Yup.string().typeError("Zorunlu alan. Boş Bırakılamaz!"),
    package_going_date: Yup.string().typeError("Zorunlu alan. Boş Bırakılamaz!"),
    package_return_date: Yup.string().typeError("Zorunlu alan. Boş Bırakılamaz!"),
    payer: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    total: Yup.number().typeError("Yalnızca numara girişi kabul edilir.").required("Zorunlu alan. Boş Bırakılamaz!"),
    down_payment: Yup.number().typeError("Yalnızca numara girişi kabul edilir.").required("Zorunlu alan. Boş Bırakılamaz!"),
    remaining: Yup.number().typeError("Yalnızca numara girişi kabul edilir.").min(0, "Tutarları doğru girdiğinizden emin olunuz."),
});

export default function CostumerDetail({match}) {
    
    const componentRef = useRef();

    const [modalIsOpen, setIsOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(true)

    const [personal, setPersonal] = useState({})
    const [payment, setPayment] = useState({})
    const [product, setProduct] = useState({})

    const { handleSubmit, handleChange, values, errors, isValid } = useFormik({
		initialValues: {
			name_surname: '',
			primary_phone: '',
			secondary_phone: '',
            address: '',
            wedding_date: null,
            henna_date: null,
            engagement_date: null,
            product_code: '',
            test_date: null,
            package_going_date: null,
            package_return_date: null
        },
        onSubmit: (values) => {
            console.log("values");
        }
    });

    const { name_surname, 
            primary_phone, 
            secondary_phone, 
            address, 
            wedding_date, 
            henna_date, 
            engagement_date, 
            product_code,
            test_date, 
            package_going_date,
            package_return_date,
        } = values;
    

    
    useEffect(() => {
        const init = async () => {
            const data = await CostumerService.detailCostumer(match.params.id)
            const { personal, product, payment } = data;
            setPersonal(personal)
            setProduct(product)
            setPayment(payment);
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

    const _onFocus = (e) => {
        e.currentTarget.type = "date";
    }

    const _onBlur = (e) => {
        e.currentTarget.type = "text";
        if(e.target.value){
            e.currentTarget.value = formatDate(e.target.value)
        }
    }

    const openAreYouSure = () => {
        setIsOpen(true);
    }

    return (
        <Layout>
            <div className="flex flex-col">
                <AreYouSure modalIsOpen = { modalIsOpen } id = { match.params.id } setModalIsOpen = { setIsOpen }/>
                <p className="sub-header">Aşağıdaki <span className="font-bold rounded-md">QR Code</span> sayesinde prova tarihinize kalan süreyi görebilecek kayıtlı bilgilerinize rahatça ulaşabileceksiniz.</p>
                <div ref={componentRef} className="flex mt-4 p-5 border rounded-md">
                    <div className="flex flex-col items-center bg-gray-50 px-4 pt-10 border rounded-md">
                        <QRCode size={100} value="Rabia Nasılsın" />
                    </div>
                    <div className="flex flex-col ml-5">
                        <div className="flex justify-between bg-gray-100 border rounded-md p-2">
                            <h1 className="text-lg font-medium">Kişisel Bilgiler</h1>
                        </div>
                        <div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">Ad Soyad:</p>
                                    <input type="text" placeholder={personal.name_surname} className="placeholder-black form-control-sm" onChange={handleChange} name="name_surname"/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Birincil Telefon:</p>
                                    <input type="text" className="placeholder-black form-control-sm" placeholder={personal.primary_phone} onChange={handleChange} name="primary_phone"/>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">İkincil Telefon:</p>
                                    <input type="text" className="placeholder-black form-control-sm" placeholder={personal.secondary_phone} onChange={handleChange} name="secondary_phone"/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Nişan Tarihi:</p>
                                    <input type="text" onFocus = {_onFocus} onBlur= {_onBlur} className="placeholder-black form-control-sm" placeholder={formatDate(personal.engagement_date)} onChange={handleChange} name="engagement_date"/>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">Düğün Tarihi:</p>
                                    <input type="text" onFocus = {_onFocus} onBlur= {_onBlur} className="placeholder-black form-control-sm" placeholder={formatDate(personal.wedding_date)} onChange={handleChange} name="wedding_date"/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Kına Tarihi:</p>
                                    <input type="text" onFocus = {_onFocus} onBlur= {_onBlur} className="placeholder-black form-control-sm" placeholder={formatDate(personal.henna_date)} onChange={handleChange} name="henna_date"/>
                                </div>
                            </div>
                            <div className="my-2">
                                <p className="sub-header">Adres:</p>
                                <textarea className="placeholder-black form-control-sm resize-none w-full" placeholder={personal.address} onChange={handleChange} name="address"/>
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-100 border rounded-md p-2">
                            <h1 className="text-lg font-medium">Ürün Bilgileri</h1>
                        </div>
                        <div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">Ürün Kodu:</p>
                                    <input type="text" className="placeholder-black form-control-sm" placeholder={product.product_code} onChange={handleChange} name="product_code"/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Prova Tarihi:</p>
                                    <input type="text" onFocus = {_onFocus} onBlur= {_onBlur} className="placeholder-black form-control-sm" placeholder={formatDate(product.test_date)} onChange={handleChange} name="test_date"/>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">Paket Gidiş Tarihi:</p>
                                    <input type="text" onFocus = {_onFocus} onBlur= {_onBlur} className="placeholder-black form-control-sm" placeholder={formatDate(product.package_going_date)} onChange={handleChange} name="package_going_date"/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Paket Geliş Tarihi:</p>
                                    <input type="text" onFocus = {_onFocus} onBlur= {_onBlur} className="placeholder-black form-control-sm" placeholder={formatDate(product.package_return_date)} onChange={handleChange} name="package_return_date"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                {
                    /*
                    name_surname || 
                    primary_phone ||
                    secondary_phone ||
                    address ||
                    wedding_date ||
                    henna_date ||
                    engagement_date ||
                    product_code ||
                    test_date || 
                    package_going_date ||
                    package_return_date ? 

                    <button onSubmit={()=>console.log("efjnw")} className="btn mt-3 bg-yellow-100 hover:bg-yellow-600 hover:text-white text-yellow-600">Güncelle</button> :
                    */
                    <div className="flex justify-between">
                        <div className="flex-1 mr-5">
                            <button onClick={openAreYouSure} className="btn btn-danger btn-block mt-4">Müşteriyi Sil</button>
                            <p className="sub-header mt-2">Bu işlem geri <span className="font-bold">alınamaz.</span> Lütfen dikkatli olunuz.</p>
                        </div>
                        <div className="flex-1 ml-5">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-primary btn-block mt-4">Yazdır</button>}
                                content={() => componentRef.current}
                            />
                        </div>
                    </div> 
                }
            </div>
        </Layout>
    )
}
