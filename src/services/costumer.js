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

const costumer = { saveCostumer };

export default costumer;
