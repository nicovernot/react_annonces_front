import React from 'react';
const Espace_entreprise = (props) => {
    return ( 
        <div>

{props.user.logged?
  <div className="jumbotron jumbotron-fluid">
  <div className="container">
<h1>      Espace Entreprise connecté  {props.user.username}</h1>
    <p>ici on aura l'espace entreprise</p>
  </div>
</div>:
<div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1>      Espace Entreprise</h1>
    <p>ici on aura l'espace entreprise</p>
  </div>
</div>
}
        </div>
     );
}
 
export default Espace_entreprise;