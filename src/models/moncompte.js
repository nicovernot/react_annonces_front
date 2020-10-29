import React ,{useState, } from 'react';
import {
Redirect
 } from "react-router-dom";
import { Button } from 'primereact/button';
import ListeLocations from './listelocations';
import ListeAnnonces from './listeAnnonces';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import ModifAdr from './modifadresse'

const MonComte = (props) => {

const [displayConfirmation, setdisplayConfirmation] = useState(false)

  const efface = (event,id) =>{
   
      
     axios({
       url: process.env.REACT_APP_URL_HOST+`/graphql`,
       method: 'post',
       headers: {'Authorization': 'Bearer '+localStorage.getItem('token')},
       data: {
         query: `
         mutation {deleteAdresse(
          input:{where:{id:"${id}"}}){
            adresse{id}}}
           `
          },
     }).then((result) => {

       props.user.effacerAdresse(event,id)
      
     });
    }
 const modifadr = (id) => {
   setdisplayConfirmation(id)
 }

 const closemodal = () => {
   setdisplayConfirmation("")
 }
 const statusBodyTemplate = (rowData)=> {
    return <span className={`badge badge-secondary`}>{rowData.active ? <i className="pi pi-check p-mr-2"></i> :""}</span>;
}
    return (
      <div>

      {props.user.email? 
        <div>

          <div className="row">

      <div className="col-sm-6 ">
        <div className="card">
      <h2 className="badge badge-secondary">      Mon Compte </h2>
      <ul className="list-group">
      <li className="list-group-item"><p className="badge badge-secondary">Usename:</p> {props.user.username}</li>
      <li className="list-group-item"><p className="badge badge-secondary">Email:</p> {props.user.email}</li>
      </ul>
      <Button label="Modifier" icon="pi pi-pencil" />
      </div>
      </div>
      <div className="col-sm-6 ">
            {props.user.adresses.length >0? 
                  <div className="card ml-1">
                    <h2 className="badge badge-secondary">      Mes Adresses </h2><br/>
                    <ul className="list-group">
                    {props.user.adresses.map((adr,key)=>(
                    <li key={key} className="list-group-item">
                    <Dialog header="Modification Adresse" visible={displayConfirmation===adr.id} style={{ width: '50vw' }}  onHide={() => setdisplayConfirmation("")}>
                       <ModifAdr adrid={adr} action={props.user.modfifAdresse} closemodal={closemodal}/>
                   </Dialog> 
                     {adr.numvoie} {adr.typevoie} {adr.nomvoie} {adr.codepostal} {adr.ville}
                      <br/> 
                    
                    <Button label="Modifier" icon="pi pi-pencil" onClick={(e)=> modifadr(adr.id)} />
                    <Button label="Effacer" icon="pi pi-trash" onClick={(e)=> efface(e,adr.id)} className="p-button-warning" /> 
                    </li> 
                    ))}
                    </ul>
                    <br/>

                    <Button label="Ajouter adresse" icon="pi pi-plus" onClick={(e)=>props.user.addadresse(e,1)} className="p-button-success"/>
                  </div>
                  :
                  <div>
                    <Button label="Ajouter adresse" icon="pi pi-plus" onClick={(e)=>props.user.addadresse(e,1)} className="p-button-success"/>
                  </div>
                  }
      </div>
  
                
                <div className="col-sm-12 card mt-1">
                  <div className="card ml-1">
                <ListeLocations user={props.user} />
                </div>
                <div className="card ml-1">
                <ListeAnnonces user={props.user} />
                <div>
                <div className="card">
                    <DataTable value={props.user.annonces} className="p-datatable-striped">
                        <Column field="titre" header="Titre"></Column>
                        <Column field="createdAt" header="Date"></Column>
                        <Column field="tarif_heure" header="Tarif"></Column>
                        <Column field="active" header="Actif" body={statusBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
                </div>
                </div>  
  
      </div>
                </div>
        :
        <Redirect
        to={{
          pathname: "/",
          state: { from: "moncompte" }
        }}
        />
      }
      </div> 
       
     );
}
 
export default MonComte;