import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://api.roddom15.ru/v1/`,
	// baseURL: 'http://jsonplaceholder.typicode.com/',
	// headers: { X-XSRF-TOKEN: `${token}`}, 
	headers: {
    Authorization: 'Bearer 1|S5UQcrN2vnXSUfc8KoNh5xgEeipB2gyobh5Ms7IO'
  }
})