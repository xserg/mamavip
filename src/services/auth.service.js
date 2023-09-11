import axios from 'axios';

const API_URL = 'https://api.roddom15.ru/v1/user/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password,
				// headers: {
				// 	'Content-Type': 'application/json',
				// 	Accept: 'application/json',
				// 	Authorization: `Bearer 1|S5UQcrN2vnXSUfc8KoNh5xgEeipB2gyobh5Ms7IO`,
				// },
      },
			
			
			// {headers: { 'Authorization' : 'Bearer '+ api_token}}
			
			)
      .then(response => {
				// console.log('Проверка №103');
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();