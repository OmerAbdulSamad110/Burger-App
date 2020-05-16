import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-5e555.firebaseio.com'
});

export default instance;