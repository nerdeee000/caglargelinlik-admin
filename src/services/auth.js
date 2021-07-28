import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

const signinWithUsername = async (username, password) => {
    const response = await axios.post(baseURL + 'signin-username', { username: username, password: password});
    return response.data;
}

const auth = { signinWithUsername };

export default auth;
