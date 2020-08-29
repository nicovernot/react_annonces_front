import React from 'react';
import {Menubar} from 'primereact/menubar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';

const Menu = (props) => {
  
    return (
        <div>
        <Menubar className="bg-info" onClick={(e)=> props.menuHandler}  model={props.menu}>
        {props.children}
        </Menubar>   

       
        </div>
    );
};

export default Menu;