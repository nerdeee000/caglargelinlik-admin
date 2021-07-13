import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../core/MainLayout'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MultiStepForm, Step } from 'react-multi-form';
import CostumerService from '../services/costumer'
import RoutingInfo from '../components/RoutingInfo'

let date_regex = /^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\d{4}$/


const validationSchema = Yup.object({
    name_surname: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    primary_phone: Yup.string().matches(/(\W+)(905)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/, "Geçerli bir telefon formatı giriniz.").required("Zorunlu alan. Boş Bırakılamaz!"),
    secondary_phone: Yup.string().matches(/(\W+)(905)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/, "Geçerli bir telefon formatı giriniz.").required("Zorunlu alan. Boş Bırakılamaz!"),
    address: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    wedding_date: Yup.string().matches(date_regex, 'Geçerli Bir tarih formatı giriniz.').required("Zorunlu alan. Boş Bırakılamaz!"),
    henna_date: Yup.string().matches(date_regex, 'Geçerli Bir tarih formatı giriniz.').required("Zorunlu alan. Boş Bırakılamaz!"),
    engagement_date: Yup.string().matches(date_regex, 'Geçerli Bir tarih formatı giriniz.').required("Zorunlu alan. Boş Bırakılamaz!"),
    product_code: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    test_date: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    package_going_date: Yup.string().matches(date_regex, 'Geçerli Bir tarih formatı giriniz.').required("Zorunlu alan. Boş Bırakılamaz!"),
    package_return_date: Yup.string().matches(date_regex, 'Geçerli Bir tarih formatı giriniz.').required("Zorunlu alan. Boş Bırakılamaz!"),
    payer: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    total: Yup.number().typeError("Yalnızca numara girişi kabul edilir.").required("Zorunlu alan. Boş Bırakılamaz!"),
    down_payment: Yup.number().typeError("Yalnızca numara girişi kabul edilir.").required("Zorunlu alan. Boş Bırakılamaz!"),
    remaining: Yup.number().typeError("Yalnızca numara girişi kabul edilir.").min(0, "Tutarları doğru girdiğinizden emin olunuz."),
});

export default function CostumerAdd() {

    const [costumerSaveError, setCostumerSaveError] = useState("");

    const [ownPayer, setOwnPayer] = useState(true);
    const [sendSmsContol, setSendSmsControl] = useState(false);
    
    const [formStep, setFormStep] = useState(1);

    const completeFormStep = () => {
        setFormStep(curr => curr + 1);
    }
    const backFormStep = () => {
        setFormStep(curr => curr - 1)
    }

    const refreshPage = () => {
        window.location.reload(false);
    }


    const { setFieldValue, handleSubmit, handleChange, values, errors, isValid } = useFormik({
		initialValues: {
			name_surname: '',
			primary_phone: '+90',
			secondary_phone: '+90',
            address: '',
            wedding_date:'',
            henna_date: '',
            engagement_date: '',
            product_code: '',
            test_date: Date,
            package_going_date: '',
            package_return_date: '',
            payer: '',
            total:'',
            down_payment: '',
            remaining:'',
            sendSms: undefined,
        },
        onSubmit: (values) => {
            CostumerService.saveCostumer(values)
            .then((response)=>{
                console.log(response)
                console.log("Costumer save successfully");
                setFormStep(curr => curr + 1);
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
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
            payer,
            remaining,
            total,
            down_payment,
            sendSms } = values;

            const own_payer = (e, setFieldValue) => {
                setOwnPayer(!ownPayer);
                if(ownPayer){
                    setFieldValue('payer', name_surname);
                }else{
                    setFieldValue('payer', "");
                }
            }

            const handleChangeTotal = (event, setFieldValue) => {
                setFieldValue('total', event.target.value);
                setFieldValue('remaining', event.target.value - down_payment);
            }

            const handleChangeDownPayment = (event, setFieldValue) => {
                setFieldValue('down_payment', event.target.value);
                setFieldValue('remaining', total - event.target.value);
            }

            const sendSmsControl = (event, setFieldValue) => {
                setSendSmsControl(!sendSmsControl);
                if(sendSmsControl){
                    setFieldValue('sendSms', true);
                }else{
                    setFieldValue('sendSms', false);
                }
                console.log(values)
            }
        

    return (
        <MainLayout>
                <div className="flex flex-col mt-16 mx-auto mx-20 max-w-sm">
                    <RoutingInfo route={["Müşteri Listesi", "Müşteri Kayıt"]}/>
                    <MultiStepForm accentColor='#0066ff' activeStep={formStep}>
                        <Step label="KİSİSEL BİLGİLER">
                            <div className="flex flex-col">
                                <input type="text" className="form-control mb-2" name="name_surname" value={name_surname} onChange={handleChange} placeholder="Ad Soyad"/>
                                { errors.name_surname ? <p className="error-message">{errors.name_surname}</p> : null}
                                <input type="text" className="form-control mb-2" name="primary_phone" value={primary_phone} onChange={handleChange} placeholder="Birincil Telefon"/>
                                { errors.primary_phone ? <p className="error-message">{errors.primary_phone}</p> : null}
                                <input type="text" className="form-control mb-2" name="secondary_phone" value={secondary_phone} onChange={handleChange} placeholder="İkincil Telefon"/>
                                { errors.secondary_phone ? <p className="error-message">{errors.secondary_phone}</p> : null}
                                <textarea className="form-control resize-none mb-2" name="address" value={address} onChange={handleChange} placeholder="Adres"></textarea>
                                { errors.address ? <p className="error-message">{errors.address}</p> : null}
                                <input type="text" className="form-control mb-2" name="wedding_date" value={wedding_date} onChange={handleChange} placeholder="Düğün Tarihi"/>
                                { errors.wedding_date ? <p className="error-message">{errors.wedding_date}</p> : null}
                                <input type="text" className="form-control mb-2" name="henna_date" value={henna_date} onChange={handleChange} placeholder="Kına Tarihi"/>
                                { errors.henna_date ? <p className="error-message">{errors.henna_date}</p> : null}
                                <input type="text" className="form-control mb-2" name="engagement_date" value={engagement_date} onChange={handleChange} placeholder="Nişan Tarihi"/>
                                { errors.engagement_date ? <p className="error-message">{errors.engagement_date}</p> : null}
                                <div className="flex items-center mb-3">
                                    <input value={sendSms} onChange={e=>sendSmsControl(e, setFieldValue)} type="checkbox" name="sendSms" id=""/>
                                    <p className="ml-2 font-light">Kayıt oluşturulduğuna dair sms <b>gönderilsin mi?</b></p>
                                </div>
                            </div>
                        </Step>
                        <Step label="ÜRÜN BİLGİLERİ">
                            <div className="flex flex-col">
                                <input type="text" className="form-control mb-2" name="product_code" value={product_code} onChange={handleChange} placeholder="Ürün Kodu"/>
                                { errors.product_code ? <p className="error-message">{errors.product_code}</p> : null}
                                <div className="flex border bg-gray-100 rounded-md">
                                    <div className="flex items-center p-3">
                                        <input id="sale" name="saleStatus" type="radio"/>
                                        <p className="font-light ml-2">Satılık</p>
                                    </div>
                                    <div className="flex items-center ml-3">
                                        <input id="rent" name="saleStatus" type="radio"/>
                                        <p className="font-light ml-2">Kiralık</p>
                                    </div>
                                </div>
                                <div className="flex border bg-gray-100 rounded-md my-2">
                                    <div className="flex items-center p-3">
                                        <input id="sale" name="newStatus" type="radio"/>
                                        <p className="font-light ml-2">Sıfır</p>
                                    </div>
                                    <div className="flex items-center ml-3">
                                        <input id="rent" name="newStatus" type="radio"/>
                                        <p className="font-light ml-2">İkinci El</p>
                                    </div>
                                </div>
                                
                                <input type="date" className="form-control mb-2" name="test_date" value={test_date} onChange={handleChange} placeholder="Prova Tarihi"/>
                                { errors.test_date ? <p className="error-message">{errors.test_date}</p> : null}
                                <input type="text" className="form-control mb-2" name="package_going_date" value={package_going_date} onChange={handleChange} placeholder="Paket Gidiş Tarihi"/>
                                { errors.package_going_date ? <p className="error-message">{errors.package_going_date}</p> : null}
                                <input type="text" className="form-control mb-2" name="package_return_date" value={package_return_date} onChange={handleChange} placeholder="Paket Dönüş Tarihi"/>
                                { errors.package_return_date ? <p className="error-message">{errors.package_return_date}</p> : null}
                                
                            </div>
                        </Step>
                        <Step label="ÖDEME BİLGİLERİ">
                            <div className="flex flex-col">
                                <input type="text" className="form-control mb-2" name="total" value={total} onChange={e=>handleChangeTotal(e, setFieldValue)} placeholder="Toplam Tutar"/>
                                { errors.total ? <p className="error-message">{errors.total}</p> : null}
                                <input type="text" className="form-control mb-2" name="down_payment" value={down_payment} onChange={e=>handleChangeDownPayment(e, setFieldValue)} placeholder="Kapora"/>
                                { errors.down_payment ? <p className="error-message">{errors.down_payment}</p> : null}
                                <input type="text" className="form-control mb-2" name="remaining" value={remaining} disabled onChange={handleChange} placeholder="Kalan"/>
                                { errors.remaining ? <p className="error-message">{errors.remaining}</p> : null}
                                <input type="text" className="form-control mb-2" name="payer" value={payer} onChange={handleChange} placeholder="Ödemeyi Yapan"/>
                                { errors.payer ? <p className="error-message">{errors.payer}</p> : null}
                                <div className="flex items-center mb-5">
                                    <input onChange={e=>own_payer(e, setFieldValue)} id="c1" type="checkbox"/>
                                    <p className="font-light ml-2">Ödemeyi Yapan Kendisi</p>
                                </div>
                            </div>    
                        </Step>
                    </MultiStepForm>

                    {
                        formStep === 4 ?
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <h1 className="font-bold text-xl my-3">KAYIT BAŞARI İLE TAMAMLANDI</h1>
                            <p className="font-light text-sm text-center">Kayıt tamamlanmıştır. Bir sonraki kayıt için 'YENİ MÜŞTERİ' tuşunu kullanmalısınız.</p>
                            <Link to="/costumer">
                                <button onClick = { refreshPage } className="flex-1 mt-3 btn primary">YENİ MÜŞTERİ</button>
                            </Link>
                        </div> : 
                        <div className="flex">
                            {formStep !== 1 && (
                                <button onClick={backFormStep} className="flex-1 btn btn-pink mr-10">GERİ</button>
                            )}
                            {formStep === 3 && (
                                <button disabled={!isValid} type="submit" onClick={handleSubmit} className="flex-1 btn btn-primary">KAYDET</button>
                            )}
                            {formStep !== 3 &&  (
                                <button onClick={completeFormStep} className="flex-1 btn btn-primary">DEVAM ET</button>
                            )}
                        </div>
                    }
                </div>
      </MainLayout>
    )
}
