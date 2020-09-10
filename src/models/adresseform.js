import React ,{useState,useEffect, } from 'react';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
const AdresseForm = () => {
    const [data, setData] = useState({ hits: [] });
    const [nomvoie, setNomvoie] = useState("");
    const [typevoie, setTypvoie] = useState("");
    const [departement, setDepartement] = useState("");
    const [numvoie, setNumvoie] = useState(0);
    const [nomville, setVille] = useState("");
    const [codepostal, setCodepostal] = useState("");
    const [errrempli, setErrRempli] = useState(false);
    const valide = (event) =>{
     if(nomvoie && typevoie && departement && numvoie && nomville && codepostal){

         console.log("click")
     }else{
         setErrRempli(true)
     }
    }
    useEffect(() => {
      
      const fetchData = async () => {
        const result = await axios({
            url: `http://`+process.env.REACT_APP_URL_HOST+`/graphql`,
            method: 'post',
            data: {
              query: `
              query{
                departements{nom code}
              }
                `
            }
          });
          const json = await result.data.data.departements
          setData(json);
        }
        fetchData()
        }, []);
     
const dept = Array.from(data)
    

    return ( 
        <div >
        <Form>
  <Form.Group controlId="formBasicnomvoie">
    <Form.Label>Nom voie</Form.Label>
    <Form.Control type="text" placeholder="Entrez le nom de la voie" onChange={(e) => setNomvoie({nomvoie: e.target.value})}/>
  </Form.Group>
  <Form.Group controlId="form.Selectypevoie">
    <Form.Label>Type voie</Form.Label>
    <Form.Control as="select" custom onChange={(e) => setTypvoie({typevoie: e.target.value})}>
      <option value=""></option>
      <option value="rue">rue</option>
      <option value="avenue">avenue</option>
      <option value="chemin">chemin</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="form.Selectdep">
  <Form.Label>Departement</Form.Label>
  <Form.Control as="select" custom  onChange={(e) => setDepartement({departement: e.target.value})}>
      <option value=""></option>
      {dept.map((de,key)=>(
          <option key={key} value={de.code}>{de.nom}</option>
      ))}
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="formBasicnumvoie">
    <Form.Label>Numero voie</Form.Label>
    <Form.Control type="number" placeholder="Entrez le numerom de la voie" onChange={(e) => setNumvoie({numvoie: e.target.value})}/>
  </Form.Group>

  <Form.Group controlId="formBasicville">
    <Form.Label>Ville</Form.Label>
    <Form.Control type="text" placeholder="Entrez le nom de la ville" onChange={(e) => setVille({nomville: e.target.value})}/>
  </Form.Group>
  <Form.Group controlId="formBasicp">
    <Form.Label>Code Postal</Form.Label>
    <Form.Control type="text" placeholder="Entrez le code postal de la ville" onChange={(e) => setCodepostal({codepostal: e.target.value})}/>
  </Form.Group>

   {errrempli? "Formulaire mal rempli":""}
   <br/>
  <Button variant="primary" onClick={(e)=>valide(e)}>
    Valider
  </Button>
</Form>
        </div>
     );
}
 
export default AdresseForm;
