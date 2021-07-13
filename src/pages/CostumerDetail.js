import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CostumerService from '../services/costumer'
import MainLayout from '../core/MainLayout'
import RoutingInfo from '../components/RoutingInfo'
import QRCode from 'qrcode.react';

export default function CostumerDetail({match}) {

    const [personal, setPersonal] = useState({})
    const [paymentHistory, setPaymentHistory] = useState([])
    const [product, setProduct] = useState({})
    
    useEffect(() => {
        const init = async () => {
            const data = await CostumerService.detailCostumer(match.params.id)
            const { personal, product, payment } = data;
            setPersonal(personal)
            setProduct(product)
            setPaymentHistory(payment.payment_history.reverse());
        }
        init();
    }, []);

    return (
        <MainLayout>
            <div className="flex flex-col mx-auto max-w-xl">
                <RoutingInfo route={["Müşteri Listesi", "Müşteri Detay Görüntüleme"]}/>

                <div className="flex mt-4 p-5 border rounded-md">
                    <div className="bg-gray-50 border rounded-md p-3">
                        <QRCode size={100} value="http://instagram.com/" />
                    </div>
                    <div className="flex flex-col ml-5">
                        <h1 className="text-lg font-medium bg-gray-100 border rounded-md p-2">Kişisel Bilgiler</h1>
                        <div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">Ad Soyad:</p>
                                    <input type="text" className="form-control-sm"value={personal.name_surname}/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Birincil Telefon:</p>
                                    <input type="text" className="form-control-sm"value={personal.primary_phone}/>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">İkincil Telefon:</p>
                                    <input type="text" className="form-control-sm"value={personal.secondary_phone}/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Nişan Tarihi:</p>
                                    <input type="text" className="form-control-sm"value={personal.engagement_date}/>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">Düğün Tarihi:</p>
                                    <input type="text" className="form-control-sm"value={personal.wedding_date}/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Kına Tarihi:</p>
                                    <input type="text" className="form-control-sm"value={personal.henna_date}/>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="sub-header">Adres:</p>
                                <textarea className="form-control-sm resize-none w-full"value={personal.address}/>
                            </div>
                        </div>
                        <h1 className="text-lg mt-2 font-medium bg-gray-100 border rounded-md p-2">Ürün Bilgileri</h1>
                        <div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">Ürün Kodu:</p>
                                    <input type="text" className="form-control-sm"value={product.product_code}/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Prova Günü:</p>
                                    <input type="text" className="form-control-sm"value={product.test_date}/>
                                </div>
                            </div>
                            <div className="flex mt-2">
                                <div>
                                    <p className="sub-header">Paket Gidiş Tarihi:</p>
                                    <input type="text" className="form-control-sm"value={product.package_going_date}/>
                                </div>
                                <div className="ml-5">
                                    <p className="sub-header">Paket Geliş Tarihi:</p>
                                    <input type="text" className="form-control-sm"value={product.package_return_date}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <button className="btn btn-danger mt-4">Müşteriyi Sil</button>
                <p className="sub-header mt-2">Bu işlem geri <span className="font-bold">alınamaz.</span> Lütfen dikkatli olunuz.</p>
            </div>
        </MainLayout>
    )
}
