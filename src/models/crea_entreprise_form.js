import React,{useState,} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import EntrepriseForm from './entrepriseform'


const CreaEntreprise = (props) => {
   
    const userid = localStorage.getItem('userid')
    const [roleupd, setRoleupt] = useState(false);
    const [roleid, setRolid] = useState("");

    const valide = (event) =>{
        
          
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
                   role{id}
                   }
                   }
               
               }`
           }
         }).then((result) => {
          
          //props.user.updaterole(event,result.data.data.updateUser.user.role.id)
          setRoleupt(true)
          setRolid(result.data.data.updateUser.user.role.id)
         });
         
            console.log("click")
        
       }
    
    
    return ( 
    <div>




      {

              roleupd  ? 
          <EntrepriseForm user={props.user} roid={roleid}/>
           :
           <Button onClick={(e)=> valide()}>Créer compte Entreprise</Button>
           
      }
    </div>

     );
}
 
export default CreaEntreprise;