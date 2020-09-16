import React,{useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
const EntrepriseForm = (props) => {
    const [nom, setNom] = useState("");
    const [tel, setTel] = useState("");
    const [siren, setSiren] = useState("");
    const valide = (event) =>{
        console.log("valid")
        if(nom && tel && siren){
          
         axios({
           url: `http://`+process.env.REACT_APP_URL_HOST+`/graphql`,
           method: 'post',
           headers: {'Authorization': 'Bearer '+localStorage.getItem('token')},
           data: {
             query: `
             mutation{
                createEntreprise(input:{data:{
                 nom: "${nom.nom}",
                 siren: "${siren.tel}",
                 tel: "${tel.tel}",
                 actif: true,
                 contact: "${localStorage.getItem("userid")}",
                 emailcontact:"${localStorage.getItem("email")}"
               }})
                 {entreprise{id}}
               }
               `
           }
         }).then((result) => {
           console.log(result.data)
           props.user.updaterole(event,props.roid)
          
         });
        }
    }


    return ( 
        <div>
           <Form>
  <Form.Group controlId="formBasicNom">
    <Form.Label>Nom de l'entreprise</Form.Label>
    <Form.Control type="test" placeholder="entrez le nom de l'entreprise" onChange={(e) => setNom({nom: e.target.value})}/>
    
  </Form.Group>

  <Form.Group controlId="formBasicTel">
    <Form.Label>Telephone</Form.Label>
    <Form.Control type="test" placeholder="Numero de telephone" onChange={(e) => setTel({tel: e.target.value})}/>
  </Form.Group>

  <Form.Group controlId="formBasicSiren">
    <Form.Label>Siren</Form.Label>
    <Form.Control type="test" placeholder="Entres le N° siren" onChange={(e) => setSiren({siren: e.target.value})}/>
  </Form.Group>

  <Button variant="primary"  onClick={(e)=>valide(e)}>
    valider
  </Button>
</Form>
        </div>
     );
}
 
export default EntrepriseForm;