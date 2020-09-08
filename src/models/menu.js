import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {
   
    Link
  } from "react-router-dom";

const Menu = (props) => {
    const logged = props.user.logged

    const menulist = props.menu.filter(men => men.visible === true).map((men,key)=>
    <li key={key} className="nav-item">
      {logged && !men.public ? 
      <Link  className={men.className} to={men.url}><i className={men.icon} style={{'fontSize': '1em'}}></i>{men.label}</Link>
      : 
      ''
      }
      {!logged && men.public ? 
      <Link  className={men.className} to={men.url}><i className={men.icon} style={{'fontSize': '1em'}}></i>{men.label}</Link>
      : 
      ''
      }
    
      {logged && men.public ? 
      <Link  className={men.className} to={men.url}><i className={men.icon} style={{'fontSize': '1em'}}></i>{men.label}</Link>
      : 
      ''
      }
    </li>
    ) 
  
    return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
  <Link className="navbar-brand" to="/">Redma</Link>
  <Navbar.Collapse  id="responsive-navbar-nav">
    <Nav className="mr-auto">
     {menulist}

    </Nav>
    

  </Navbar.Collapse>
  {props.children}
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
</Navbar>
       
         

    );
};

export default Menu;