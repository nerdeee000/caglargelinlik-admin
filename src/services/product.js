import axios from 'axios';

const baseURL = 'http://localhost:8000/api/product/';

const saveProduct = async ( formData, config ) => {
        const response = await axios.post(baseURL + 'product-save', formData, config);
        return response.data;
}

const listProduct = async () => {
        const response = await axios.get(baseURL + 'product-list');
        return response.data;
}

const product = { saveProduct };

export default product;
