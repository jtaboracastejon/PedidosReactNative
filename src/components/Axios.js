import axios from "axios";

const Axios = axios.create({
	baseURL: 'http://192.168.31.158:3001/api/',
	timeout: 10000,
	headers: {'Content-Type': 'application/json'}
});

export default Axios;