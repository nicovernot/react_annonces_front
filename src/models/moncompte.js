import React from 'react';
import {
Redirect
 } from "react-router-dom";

const MonComte = (props) => {

    return (
      <div>

      {props.user? 
        <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
      <h1>      Mon Compte{props.user}</h1>
            <p>ici on aura l'espace Mon Compte</p>
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