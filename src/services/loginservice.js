import axios from 'axios';

async function loginin(password,username) {
   
  console.log("loggin app")
 const resp = axios.post(`http://`+process.env.REACT_APP_URL_HOST+`/auth/local`, { 'identifier':username,'password':password })
     return await resp;
}

export default loginin;
