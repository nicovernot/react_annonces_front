import React ,{ useState, } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';

const Contact = () => {
    const [nom, setNom] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [objet, setObjet] = useState(""); 
    const [message, setMessage] = useState(""); 
    const [valide, setValide] = useState(false); 
    const validation= (event) => {
    if(nom && email && objet && message ){
    setValide({valide:true})
    if(valide) console.log(email)
      axios({
        url: process.env.REACT_APP_URL_HOST+`/graphql`,
        method: 'post',
        data: {
          query: `
          mutation{
            createContactmessage
            (input:{data:{nom:"${nom.nom}",objet:"${objet.objet}",mail:"${email.email}",message:"${message.message}"}})
          {contactmessage{id}}
          }
            `
        }
      }).then((result) => {
        console.log(result.data)
       
       window.location.href = "/";
      });
    }
    }
    return (  
        <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" placeholder="Nom" onChange={(e) => setNom({nom: e.target.value})}/>
        </Form.Group>
        <Form.Group controlId="formBasicObjet">
        <Form.Label>objet</Form.Label>
          <Form.Control type="text" placeholder="objet" onChange={(e) => setObjet({objet: e.target.value}) } />
        </Form.Group>
        <Form.Group controlId="formBasicMessage">
        <Form.Label>Message </Form.Label>
        <br/>
        <InputTextarea rows={5} cols={80}  onChange={(e) => setMessage({message: e.target.value}) }/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail({email: e.target.value}) }/>
        {valide? 
                  <Form.Text className="text-muted">
                  Merci d'avoir rempli la fiche on vour contactera prochainement.
                </Form.Text>
                :
                ""    
        } 
        </Form.Group>
      

        <Button variant="primary" onClick={(e)=>validation(e)}>
          Envoyer
        </Button>
      </Form>   
    );
}
 
export default Contact;