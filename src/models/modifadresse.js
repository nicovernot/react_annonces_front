import React, { useEffect,useState } from 'react';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import Button from 'react-bootstrap/Button'

const MofifAdresse = (props) => {
    const [data, setData] = useState({ hits: [] });
    const [nomvoie, setNomvoie] = useState(props.adrid.nomvoie);
    const [typevoie, setTypvoie] = useState(props.adrid.typevoie);
    const [departement, setDepartement] = useState(props.adrid.departement);
    const [numvoie, setNumvoie] = useState(props.adrid.numvoie);
    const [nomville, setVille] = useState(props.adrid.ville);
    const [codepostal, setCodepostal] = useState(props.adrid.codepostal);
    const [errrempli, setErrRempli] = useState(false);
  
    const valide = (event) =>{
     if(nomvoie && typevoie && departement && numvoie && nomville && codepostal){
       
      axios({
        url: process.env.REACT_APP_URL_HOST+`/graphql`,
        method: 'post',
        headers: {'Authorization': 'Bearer '+localStorage.getItem('token')},
        data: {
          query: `
          mutation{updateAdresse(
            input:{
              where:
              { id: "${props.adrid.id}"}
              data:
            {
            nomvoie: "${nomvoie}",
            numvoie:${numvoie},
            typevoie:${typevoie},
            ville:"${nomville}",
            codepostal:"${codepostal}",
            departement:"${departement}",  
            user:"${localStorage.getItem("userid")}"}})
          {adresse{
            id, nomvoie, numvoie, typevoie, codepostal, ville , departement { id nom }
          
          }}
          }
            `
        }
      }).then((result) => {
      props.action(event,result.data.data.updateAdresse.adresse)
       props.closemodal()
      });
      
         console.log("click")
     }else{
         setErrRempli(true)
     }
    }
    useEffect(() => {
      
      const fetchData = async () => {
        const result = await axios({
            url: process.env.REACT_APP_URL_HOST+`/graphql`,
            method: 'post',
            data: {
              query: `
              query{
                departements{nom code id}
              }
                `
            }
          });
          const json = await result.data.data.departements
          setData(json);
        }
        fetchData()
        }, []);
     
const dept1 = Array.from(data)
    return ( 
        <div >
        <Form>
         
  <Form.Group controlId="formBasicnomvoie">
    <Form.Label>Nom voie</Form.Label>
    <Form.Control type="text" value={nomvoie} placeholder="Entrez le nom de la voie" onChange={(e) => setNomvoie( e.target.value)}/>
  </Form.Group>
  <Form.Group controlId="form.Selectypevoie">
    <Form.Label>Type voie</Form.Label>
    <Form.Control as="select" custom value={typevoie} onChange={(e) => setTypvoie( e.target.value)}>
      <option value=""></option>
      <option value="rue">rue</option>
      <option value="avenue">avenue</option>
      <option value="chemin">chemin</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="form.Selectdep">
  <Form.Label>Departement</Form.Label>
  <Form.Control as="select" custom value={departement}  onChange={(e) => setDepartement( e.target.value)}>
      <option value=""></option>
      {dept1.map((de,key)=>(
          <option key={key} value={de.id}>{de.nom}</option>
      ))}
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="formBasicnumvoie">
    <Form.Label>Numero voie</Form.Label>
    <Form.Control type="number" value={numvoie} placeholder="Entrez le numerom de la voie" onChange={(e) => setNumvoie( e.target.value)}/>
  </Form.Group>

  <Form.Group controlId="formBasicville">
    <Form.Label>Ville</Form.Label>
    <Form.Control type="text" value={nomville} placeholder="Entrez le nom de la ville" onChange={(e) => setVille(e.target.value)}/>
  </Form.Group>
  <Form.Group controlId="formBasicp">
    <Form.Label>Code Postal</Form.Label>
    <Form.Control type="text" value={codepostal} placeholder="Entrez le code postal de la ville" onChange={(e) => setCodepostal( e.target.value)}/>
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
 
export default MofifAdresse;