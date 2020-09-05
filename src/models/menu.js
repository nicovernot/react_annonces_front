import React from 'react';
import { css } from 'emotion'
import {
   
    Link
  } from "react-router-dom";

const Menu = (props) => {
    
    const menulist = props.menu.filter(men => men.visible === true).map((men,key)=>
    <Link key={key} className={men.className}
    to={men.url}>{men.label}</Link>
    ) 
  
    return (
        <ul  className={css`
       
        background-color: lawngreen;
        font-size: 24px;
        border-radius: 4px;
        
      `}>
       {menulist}
        {props.children}
       
         

       
        </ul>
    );
};

export default Menu;