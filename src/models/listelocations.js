import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
const ListeLocations = (props) => {
    
    const [displayBasic, setDisplayBasic] = useState(false)
    return ( 
        <div>
                <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1>      Liste Locations</h1>
                    <Button label="Show" icon="pi pi-external-link" onClick={(e) => setDisplayBasic({displayBasic:true})} />
                    <Dialog header="Header" visible={displayBasic} style={{ width: '50vw' }}  onHide={(e) => setDisplayBasic(false)}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </Dialog>
                </div>
                </div>
        </div>
     );
}
 
export default ListeLocations;