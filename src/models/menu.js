import React from 'react';
import {
   
    Link
  } from "react-router-dom";

const Menu = (props) => {
    
    const menulist = props.menu.filter(men => men.visible === true).map((men,key)=>
    <li key={key} className="nav-item"><Link  className={men.className}
    to={men.url}><i className={men.icon} style={{'fontSize': '1em'}}></i>{men.label}</Link>
    </li>
    ) 
  
    return (
      <div>

      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
  <a className="navbar-brand" href="/">Redma</a>


  
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav">
     {menulist}
    </ul>
  </div>
        {props.children}
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
</nav> 
      </div>
       
         

    );
};

export default Menu;