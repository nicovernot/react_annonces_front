import React,{useState,useEffect,} from 'react';
import { Editor } from 'primereact/editor';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { RadioButton } from 'primereact/radiobutton';
import {InputSwitch} from 'primereact/inputswitch';
import Upload from './upload'


const ModifAnnonceForm = (props) => {
 
    const [ editorval, setEditval] = useState(props.annonce.description);
    const [titre,setTitre] = useState(props.annonce.titre)
    const [adr,setAdr] = useState(props.annonce.adress.id ? props.annonce.adress.id:props.annonce.adress )
    const [prix,setPrix] = useState(props.annonce.tarif_heure)
    const [data,setData] = useState({ hits: [] })
    const [wifi, setWifi] = useState(props.annonce.equipement.wifi? props.annonce.equipement.wifi:false)
    const [cafetiere, setCafe] = useState(props.annonce.equipement.cafetiere? props.annonce.equipement.cafetiere:false)
    const [clim, setClim] = useState(props.annonce.equipement.clim ? props.annonce.equipement.clim:false)
    const [chauffage, setChauf] = useState(props.annonce.equipement.chauffage ? props.annonce.equipement.chauffage:false)
    const [idAnnonce,setIdAnnonce] = useState("")
    const   formatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }); 
   
    const valide = (event) =>{
      const tq ="updateAnnonce"
      if(titre && editorval && adr && prix ){
      axios({

          url: process.env.REACT_APP_URL_HOST+`/graphql`,
          method: 'post',
          headers: {'Authorization': 'Bearer '+localStorage.getItem('token')},
          data: {
            query: `
            mutation { ${tq}
              (input:{
                where:
                { id: "${props.annonce.id}"}
                data:
            {titre: "${titre}",
            adress: "${adr}", 
            description: "${editorval}",
            tarif_heure:${prix},
            userpublisher: "${localStorage.getItem("userid")}" 
            equipement:{
              wifi: ${wifi ? wifi : false}
              clim: ${clim ? clim:false}
              cafetiere: ${cafetiere ? cafetiere :false}
              chauffage : ${chauffage ? chauffage: false}
            }
            } 
            })
            {annonce{
              id
              titre
              description
              createdAt
              updatedAt
              tarif_heure 
              photos { id formats }
              adress { id }
              equipement { wifi cafetiere clim chauffage }
            }}
            }`
          }
        }).then((result) => {
       
         props.user.modifAnnonce(event,result.data.data.updateAnnonce.annonce)
         setIdAnnonce({idAnnonce:result.data.data.updateAnnonce.annonce.id})
         
         //setRoleupt(true)
        // setRolid(result.data.data.updateUser.user.role.id)
        });
        
           console.log("click")
       
      } 
        }

        useEffect(() => {
      
          const fetchData = async () => {
            const result = await axios({
                url: process.env.REACT_APP_URL_HOST+`/graphql`,
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
      <div>
       { !idAnnonce ?
        <form>
          <div className="alert-info border-primary rounded">
          <h6>crée le {formatter.format(Date.parse(props.annonce.createdAt))}</h6>
          <h6>Modifié le {formatter.format(Date.parse(props.annonce.updatedAt))}</h6>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input type="text" value={titre} className="form-control" onChange={(e)=> setTitre(e.target.value)} id="titre" placeholder="Titre" />
          </div>
          <div className="form-group">
            <label htmlFor="descripion">Description</label>
            <Editor style={{height:'320px'}} value={editorval} onTextChange={(e) => setEditval(e.htmlValue)} />
          </div>
          <h6>Choix adresse</h6>
          {props.user.adresses.map((adr,key)=>
                      <div key={key} className="form-group">
                      <RadioButton name="adresse" value={adr.id} onChange={(e) => setAdr(e.value)} checked={adr === adr.id} />
                      <label htmlFor="adresse"><i className="pi pi-map-marker"></i> {adr.numvoie} {adr.typevoie} {adr.nomvoie} {adr.ville}</label>
                    </div>
          )}              
           
           <div className="form-group">
            <label htmlFor="prix">Tarif/heure</label>
            <input type="number" className="form-control" value={prix} onChange={(e)=> setPrix(e.target.value)} id="prix" placeholder="Tarif" />
          </div>
       
            <div className="form-group">

            <h5>Wifi</h5>
            <InputSwitch  checked={wifi} value={wifi} name="Wifi" onChange={(e) =>setWifi(e.target.value)}/>
            </div>

            <div className="form-group">

            <h5>Clim</h5>
            <InputSwitch  checked={clim} value={clim} name="Wifi" onChange={(e) => setClim(e.value)}/>
            </div>
            <div className="form-group">

              <h5>Machine à café</h5>
              <InputSwitch  checked={cafetiere} value={cafetiere} name="cafetiere" onChange={ (e) => setCafe(e.value)}/>
            </div>

            <div className="form-group">

            <h5>Chauffage</h5>
            <InputSwitch  checked={chauffage} value={chauffage} name="Wifi" onChange={ (e) => setChauf(e.value)}/>
            </div>
     
            <div className="form-group">
              
              <Button id="valide" onClick={(e)=> valide()}>Modifier l'annonce</Button>
            </div>
          
        </form>
            :

            <Upload idannonce={idAnnonce.idAnnonce} visible={props.visible}/>
            
            }

          </div>
        
     );
}
 

export default ModifAnnonceForm;