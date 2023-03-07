export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

	// console.log('auth-header в работе');
  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken };
		// return { Authorization: 'Bearer 1|S5UQcrN2vnXSUfc8KoNh5xgEeipB2gyobh5Ms7IO' };
		return {};
  } else {
    return {};
		// return { Authorization: 'Bearer 1|S5UQcrN2vnXSUfc8KoNh5xgEeipB2gyobh5Ms7IO' };
  }
}


// Примечание. Для серверной части Node.js Express используйте заголовок x-access-token следующим образом:
// export default function authHeader() {
//   let user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.accessToken) {
//     // for Node.js Express back-end
//     return { 'x-access-token': user.accessToken };
//   } else {
//     return {};
//   }
// }