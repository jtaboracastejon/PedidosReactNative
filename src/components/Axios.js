import axios from "axios";

const Axios = axios.create({
	baseURL: 'http://192.168.1.2:3001/api/',
	timeout: 10000,
	headers: {'Content-Type': 'application/json'}
});
//Axios.defaults.baseURL= 'http://www.desofiw.xyz:3002/api';
//Axios.defaults.headers.post["Content-Type"]= "application/json";

export default Axios;