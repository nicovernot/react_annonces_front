import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

const CreaEntrprise = () => {

    const userid = localStorage.getItem('userid')

    const valide = (event) =>{
        if(userid){
          
         axios({
           url: `http://`+process.env.REACT_APP_URL_HOST+`/graphql`,
           method: 'post',
           headers: {'Authorization': 'Bearer '+localStorage.getItem('token')},
           data: {
             query: `
             mutation{
                 updateUser(input:
                   {where:
                     {id:"${userid}"}
                     data:{role:"5f5c6b6b7f803318bae13a1a"}}){
                   user{id
                   role{name}
                   }
                   }
               
               }`
           }
         }).then((result) => {
           console.log(result.data)
        
          
         });
         
            console.log("click")
        }else{
           //else
        }
       }
    
    
    return ( 
    <div>
        <Button onClick={(e)=> valide()}>Créer compte Entreprise</Button>
    </div>

     );
}
 
export default CreaEntrprise;