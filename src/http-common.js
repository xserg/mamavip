import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://api.xn--80axb4d.online/v1/`,
	// baseURL: 'http://jsonplaceholder.typicode.com/',
	// headers: { X-XSRF-TOKEN: `${token}`}, 
	headers: {
    Authorization: 'Bearer 1|S5UQcrN2vnXSUfc8KoNh5xgEeipB2gyobh5Ms7IO'
  }
})