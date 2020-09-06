import axios from 'axios';

async function loginin(password,username) {



   

  const response = await axios.post(`http://localhost:1337/auth/local`, { "identifier":username,"password":password })
      .then(res => {
         console.log(username)
     
        console.log(res.data.jwt);
        if(res.data.jwt){
          localStorage.setItem("username", username); 
          localStorage.setItem("token", res.data.jwt); 
          console.log("loggin app")
          return  response ;
        } 
      }).catch((error) => {
       return error.name
    })
}

export default loginin;