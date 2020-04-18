import axios from 'axios';

const priceService = axios.create({
	baseURL: 'http://localhost:8080'
})

priceService.interceptors.request.use(
	request => {
		return request;
	},
	error => {
		console.log("Error on price-service request.", error)
		return Promise.reject(error);
	}
)

priceService.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		console.log("Error on price-service response.", error)
		return Promise.reject(error);
	}
)

export default priceService;