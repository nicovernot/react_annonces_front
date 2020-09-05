import axios from 'axios';

async function registerin(password,email,username) {


  const response = await axios.post(`http://localhost:1337/auth/local/register`, {"email":email,"username":username,"password":password })
      .then(res => {
         console.log(username)
     
        console.log(res.data);
       
      }).catch((error) => {
        console.log(JSON.stringify(error))
    })
}

export default registerin;
