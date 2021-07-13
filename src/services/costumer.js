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
            test_date,
            package_going_date,
            package_return_date,
            payer,
            total,
            down_payment,
            remaining,
            sendSms } = values;

    const response = await axios.post(baseURL + 'costumer-save', { 
            
            name_surname,
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
            total,
            down_payment,
            remaining,
            sendSms
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


const costumer = { saveCostumer, listCostumer, detailCostumer, getRemainingAmount };

export default costumer;
