import axios from 'axios';

const baseURL = 'http://localhost:8000/api/costumer/';

const saveCostumer = async ( values ) => {
    const {
            name_surname,
            primary_phone,
            secondary_phone,
            address,
            wedding_date,
            henna_date,
            engagement_date,
            product_code,
            new_status,
            sale_status,
            test_date,
            package_going_date,
            package_return_date,
            payer,
            total,
            down_payment,
            remaining,
            sendSms,
            worker } = values;

    const response = await axios.post(baseURL + 'costumer-save', { 
            
            name_surname,
            primary_phone,
            secondary_phone,
            address,
            wedding_date,
            henna_date,
            engagement_date,
            product_code,
            new_status,
            sale_status,
            test_date,
            package_going_date,
            package_return_date,
            payer,
            total,
            down_payment,
            remaining,
            sendSms,
            worker
    });
    return response.data;
}

const listCostumer = async () => {
    const response = await axios.get(baseURL + 'costumer-list') ;
    return response.data;
}

const detailCostumer = async (id) => {
    const response = await axios.get(baseURL + `${id}`) ;
    return response.data;
}

const getRemainingAmount = async (id) => {
    const response = await axios.get(baseURL + 'make-pay/' + `${id}`) ;
    return response.data.remaining;
}

const makePay = async (values, id) => {
    const { payer, amount } = values;
    console.log(payer, amount)
    const response = await axios.put(baseURL + 'make-pay/' + `${id}`, { payer, amount}) ;
    return response.data;
}

const cancelMakePay = async (id, amount) => {
    const response = await axios.put(baseURL + 'make-pay-cancel/' + `${id}`, { amount: amount}) ;
    return response.data;
}

const deleteCostumer = async (id) => {
    const response = await axios.delete(baseURL + 'costumer-delete/' + `${id}`) ;
    return response.data;
}

const getPaymentData = async () => {
    const response = await axios.get(baseURL + 'payment-data') ;
    return response.data;
}

const getEarningChart = async () => {
    const response = await axios.get(baseURL + 'earning-chart') ;
    return response.data;
}

const getDamageChart = async () => {
    const response = await axios.get(baseURL + 'damage-chart') ;
    return response.data;
}

const addDamage = async (values) => {
    const { process_type, process_amount }  = values;
    const response = await axios.post(baseURL + 'damage-add', { process_type: process_type, process_amount: process_amount}) ;
    return response.data;
}

const findWorker = async () => {
    const response = await axios.get(baseURL + 'find-worker') ;
    return response.data;
}

const costumer = { saveCostumer, listCostumer, detailCostumer, getRemainingAmount, makePay, cancelMakePay, deleteCostumer, getPaymentData, addDamage, getEarningChart, getDamageChart, findWorker };

export default costumer;
