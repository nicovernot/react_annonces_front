import React,{useState} from 'react';
import { Editor } from 'primereact/editor';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { RadioButton } from 'primereact/radiobutton';
const CreaAnnonceForm = (props) => {

    const [ editorval, setEditval] = useState("");
    const [titre,setTitre] = useState("")
    const [adr,setAdr] = useState("")
    const [prix,setPrix] = useState(0)
    console.log(localStorage.getItem("userid"))
    const valide = (event) =>{
      if(titre && editorval && adr && prix ){
      axios({

          url: `http://`+process.env.REACT_APP_URL_HOST+`/graphql`,
          method: 'post',
          headers: {'Authorization': 'Bearer '+localStorage.getItem('token')},
          data: {
            query: `
            mutation {createAnnonce
              (input:{data:
            {titre: "${titre.titre}",
            adress: "${adr.adr}", 
            description: "${editorval.editorval}",
            tarif_heure:${prix.prix},
            userpublisher: "${localStorage.getItem("userid")}" 
            } 
            })
            {annonce{id}}
            }`
          }
        }).then((result) => {
         console.log(result)
         //props.user.updaterole(event,result.data.data.updateUser.user.role.id)
         //setRoleupt(true)
        // setRolid(result.data.data.updateUser.user.role.id)
        });
        
           console.log("click")
       
      } 
        }
        const test  = e => {
          console.log("test")
        }


    return ( 
        <form>
          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input type="text" className="form-control" onChange={(e)=> setTitre({titre:e.target.value})} id="titre" placeholder="Titre" />
          </div>
          <div className="form-group">
            <label htmlFor="descripion">Description</label>
            <Editor style={{height:'320px'}} value={editorval} onTextChange={(e) => setEditval({editorval:e.htmlValue})} />
          </div>
          {props.user.adresses.map((adr,key)=>
                      <div key={key} className="form-group">
                      <RadioButton value={adr.id} icon='' name="adresse" onChange={(e) => setAdr({adr:e.value})} checked={adr === adr.id} />
                      <label htmlFor="adresse"><i className="pi pi-map-marker"></i> {adr.numvoie} {adr.typevoie} {adr.nomvoie} {adr.ville}</label>
                    </div>
          )}              
           
           <div className="form-group">
            <label htmlFor="prix">Tarif/heure</label>
            <input type="number" className="form-control" onChange={(e)=> setPrix({prix:e.target.value})} id="prix" placeholder="Tarif" />
          </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Example label</label>
              <Button onClick={(e)=> valide(e)}>Créer une annonce</Button>
            </div>

          
          
        </form>
        
     );
}
 

export default CreaAnnonceForm;