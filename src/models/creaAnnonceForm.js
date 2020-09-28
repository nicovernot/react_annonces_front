import React,{useState,useEffect,} from 'react';
import { Editor } from 'primereact/editor';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { RadioButton } from 'primereact/radiobutton';
import {InputSwitch} from 'primereact/inputswitch';

const CreaAnnonceForm = (props) => {

    const [ editorval, setEditval] = useState("");
    const [titre,setTitre] = useState("")
    const [adr,setAdr] = useState("")
    const [prix,setPrix] = useState(0)
    const [data,setData] = useState({ hits: [] })
    const [wifi, setWifi] = useState(false)
    const [cafetiere, setCafe] = useState(false)
    const [clim, setClim] = useState(false)
    const [chauffage, setChauf] = useState(false)

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
            equipement:{
              wifi: ${wifi.wifi ? wifi.wifi : false}
              clim: ${clim.clim ? clim.clim:false}
              cafetiere: ${cafetiere.cafetiere ? cafetiere.cafetiere :false}
              chauffage : ${chauffage.chauffage ? chauffage.chauffage: false}
            }
            } 
            })
            {annonce{
              id
              titre
              createdAt
              tarif_heure 
            }}
            }`
          }
        }).then((result) => {
         console.log(result.data.data)
         props.user.ajoutAnnonce(event,result.data.data.createAnnonce.annonce)
         props.visible(false)

         //setRoleupt(true)
        // setRolid(result.data.data.updateUser.user.role.id)
        });
        
           console.log("click")
       
      } 
        }

        useEffect(() => {
      
          const fetchData = async () => {
            const result = await axios({
                url: `http://`+process.env.REACT_APP_URL_HOST+`/graphql`,
                method: 'post',
                data: {
                  query: `
                  query {
                    listechamps: __type(name: "AnnonceInput") {
                      inputFields {
                        name
                        type {
                          name
                         kind
                        }
                      }
                    }
                    equip_champs: __type(name: "ComponentEquipementEquipementInput")
                    {
                    inputFields{
                      name
                      type{name}
                    }
                    }
                  
                  }
                    `
                }
              });
              const json = await result.data.data.equip_champs.inputFields
              setData(json);
            
            }
            fetchData()
            }, []);
       
            const equip = Array.from(data)
            console.log(equip)
           
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
          <h6>Choix adresse</h6>
          {props.user.adresses.map((adr,key)=>
                      <div key={key} className="form-group">
                      <RadioButton name="adresse" value={adr.id} onChange={(e) => setAdr({adr:e.value})} checked={adr === adr.id} />
                      <label htmlFor="adresse"><i className="pi pi-map-marker"></i> {adr.numvoie} {adr.typevoie} {adr.nomvoie} {adr.ville}</label>
                    </div>
          )}              
           
           <div className="form-group">
            <label htmlFor="prix">Tarif/heure</label>
            <input type="number" className="form-control" onChange={(e)=> setPrix({prix:e.target.value})} id="prix" placeholder="Tarif" />
          </div>
       
            <div className="form-group">

            <h5>Wifi</h5>
            <InputSwitch  checked={wifi} name="Wifi" onChange={(e) =>setWifi({wifi:e.target.value})}/>
            </div>

            <div className="form-group">

            <h5>Clim</h5>
            <InputSwitch  checked={clim} name="Wifi" onChange={(e) => setClim({clim:e.value})}/>
            </div>
            <div className="form-group">

              <h5>Machine à café</h5>
              <InputSwitch  checked={cafetiere} name="cafetiere" onChange={ (e) => setCafe({cafetiere:e.value})}/>
            </div>

            <div className="form-group">

            <h5>Chauffage</h5>
            <InputSwitch  checked={chauffage} name="Wifi" onChange={ (e) => setChauf({chauffage:e.value})}/>
            </div>
     
            <div className="form-group">
              
              <Button id="valide" onClick={(e)=> valide()}>Créer une annonce</Button>
            </div>

          
          
        </form>
        
     );
}
 

export default CreaAnnonceForm;