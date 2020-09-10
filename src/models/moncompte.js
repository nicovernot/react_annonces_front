import React from 'react';
import {
Redirect
 } from "react-router-dom";
import { Button } from 'primereact/button';

const MonComte = (props) => {

   
    return (
      <div>

      {props.user.email? 
        <div>

          <div className="row">

      <div className="col-sm-6">
      <h2 className="badge badge-secondary">      Mon Compte </h2>
      <ul className="list-group">
      <li className="list-group-item">{props.user.email}</li>
      </ul>
      </div>
      <div className="col-sm-6">
      {props.user.adresses.length >0? 
            <div>
              <h3 className="badge badge-secondary">      Mes Adresses </h3><br/>
              <ul className="list-group">
              {props.user.adresses.map((adr,key)=>(
              <li key={key} className="list-group-item">
                {adr.numvoie} {adr.typevoie} {adr.nomvoie} {adr.codepostal} {adr.ville}
                <br/> 
              <Button label="Modifier" icon="pi pi-pencil" />
              <Button label="Effacer" icon="pi pi-trash" className="p-button-warning" /> 
              </li> 
              ))}
              </ul>
              <br/>

              <Button label="Ajouter" icon="pi pi-plus" onClick={props.user.addadresse} className="p-button-success"/>
            </div>
            :
            <div>
               <Button label="Ajouter" icon="pi pi-plus" onClick={props.user.addadresse} className="p-button-success"/>
            </div>
            }
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