import React, { useState, useEffect, useRef } from 'react'
import MainLayout from '../core/MainLayout'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProductService from '../services/product'

const validationSchema = Yup.object({
    product_code: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    product_name: Yup.string().required("Zorunlu alan. Boş Bırakılamaz!"),
    product_property: Yup.array().required("Zorunlu alan. Boş Bırakılamaz!"),
});


export default function Product() {

    const { setFieldValue, handleSubmit, handleChange, values, errors, isValid } = useFormik({
        initialValues: {
            product_img_array: [],
            product_code:'',
            product_name:'',
            product_property:[],
            product_property_item: ''
        },
        validationSchema,
        onSubmit: () => {
            const formData = new FormData();
            for (let i = 0; i < product_img_array.length; i++) {
                formData.append('bride', product_img_array[i].file)                
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            formData.append('product_code', product_code);
            formData.append('product_name', product_name);
            formData.append('product_property', product_property);

            ProductService.saveProduct(formData, config)
            .then((response)=>{
                console.log(response)
                console.log("Product save successfully");
            })
            .catch((error) => {
                console.log(error.response.data.error);
            })
        }
    });
    


    const { product_img_array, product_code, product_name, product_property_item, product_property } = values;

    
    const handlePropertyItem = (e, setFieldValue) => {
        setFieldValue('product_property_item', e.target.value);
    }

    const removePhoto = (url, setFieldValue) => {
        for (let i = 0; i < product_img_array.length; i++) {
            const index = product_img_array[i].url.indexOf(url);
            if(index > -1){
                product_img_array.splice(i, 1);
            }
            setFieldValue(product_img_array);
        }
    }

    
    const handleFileItem = (e, setFieldValue) => {
        setFieldValue('product_img', e.target.files[0])
        setFieldValue('product_img_array', [...product_img_array, {
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        }]);
        
    }

    const handleKeyDown = (e, setFieldValue) => {
        if (e.key === 'Enter') {
            setFieldValue('product_property_item', '')
            setFieldValue('product_property', [...product_property, product_property_item]);
        }
    }

    const getProperty = (item, setFieldValue) => {
        setFieldValue('product_property_item', item);
    }

    const removeProperty = (item, index, setFieldValue) => {
        for (let i = 0; i < product_property.length; i++) {
            const indexOf = product_property.indexOf(item);
            if(indexOf > -1) {
                product_property.splice(index, 1);
            }
            setFieldValue(product_property)
        }
    }


    return (
        <MainLayout>
                <div className="flex flex-col mt-16 mx-auto mx-20 max-w-sm">
                    <div className="flex items-center justify-center relative border border-4 h-20 rounded-md border-white border-dashed text-white mb-2 bg-gradient-to-r from-blue-500 to-blue-600">
                        <input onChange={e=>handleFileItem(e, setFieldValue)} multiple className="absolute h-20 w-full" type="file" name="bride" id=""/>
                        <div className="flex flex-col items-center">
                            <p className="font-bold">RESİM SEÇİNİZ</p>
                            <p className="font-light text-sm">Lütfen yayınlamak istediğiniz resimleri seçiniz</p>
                        </div>
                    </div>   
                    <div className="flex overflow-x-auto">
                        { 
                            product_img_array.map((image, index)=>(
                                <div key={index} className="w-24 h-30 flex-none p-1 mr-5 my-3 relative">
                                    <img className="flex rounded-md border border-blue-300" src={image.url} alt=""/>
                                    <button onClick={()=>{removePhoto(image.url, setFieldValue)}} className="absolute top-0 right-0 -mr-2 p-1 focus:outline-none rounded-full bg-blue-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    
                    <input type="text" className="form-control mb-2" name="product_code" value={product_code} onChange={handleChange} placeholder="Ürün Kodu"/>
                    { errors.product_code ? <p className="error-message">{errors.product_code}</p> : null}
                    <input type="text" className="form-control mb-2" name="product_name" value={product_name} onChange={handleChange} placeholder="Ürün Adı"/>
                    { errors.product_name ? <p className="error-message">{errors.product_name}</p> : null}
                    <textarea className="form-control resize-none" onKeyDown= {e=>{handleKeyDown(e, setFieldValue)}} name="product_property_item" value={product_property_item} onChange={e=>handlePropertyItem(e, setFieldValue)} placeholder="Ürün Özellikleri"></textarea>
                    <p className="font-light text-sm"><span className="font-bold">Enter</span> tuşu ile ekleme yapabilirsiniz.</p>
                    
                    <div className="flex overflow-x-auto">

                        { 
                            product_property.map((item,index)=>{
                                return <button onClick={()=>getProperty(item, setFieldValue)} onDoubleClick={()=>removeProperty(item, index, setFieldValue)} className="flex items-center mr-3 mt-3 justify-center focus:outline-none bg-blue-600 p-5 rounded-md text-white w-5 h-5" key={index}>
                                    {index}
                                </button>
                            })
                        }

                    </div>
                    
                    <button disabled={!isValid} className="btn btn-primary mt-5"onClick={handleSubmit}>Kaydet</button>

                </div>
        </MainLayout>
    )
}
