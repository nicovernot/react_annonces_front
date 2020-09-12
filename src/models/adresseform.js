import React ,{useState,useEffect, } from 'react';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
const AdresseForm = (props) => {
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
       
      axios({
        url: `http://`+process.env.REACT_APP_URL_HOST+`/graphql`,
        method: 'post',
        headers: {'Authorization': 'Bearer '+localStorage.getItem('token')},
        data: {
          query: `
          mutation{createAdresse(
            input:{data:
            {nomvoie: "${nomvoie.nomvoie}",
            numvoie:${numvoie.numvoie},
            typevoie:${typevoie.typevoie},
            ville:"${nomville.nomville}",
            codepostal:"${codepostal.codepostal}",
            departement:"${departement.departement}",  
            user:"${localStorage.getItem("userid")}"}})
          {adresse{
            id, nomvoie, numvoie, typevoie, codepostal, ville
          
          }}
          }
            `
        }
      }).then((result) => {
        console.log(result.data)
       props.action(event,2,result.data.data.createAdresse.adresse)
       
      });
      
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
          <option key={key} value={de.id}>{de.nom}</option>
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
