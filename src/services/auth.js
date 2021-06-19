import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

const signinWithPhone = async (phone) => {
    const response = await axios.post(baseURL + 'signin-phone', { phone: phone});
    return response.data;
}

const verifyAccount = async (token, activeCodeInput) => {
    const response = await axios.post(baseURL + 'verify-account', { token: token, activeCodeInput: activeCodeInput});
    return response.data;
}

const signinWithUsername = async (username, password) => {
    const response = await axios.post(baseURL + 'signin-username', { username: username, password: password});
    return response.data;
}

const auth = { signinWithPhone, verifyAccount, signinWithUsername };

export default auth;
