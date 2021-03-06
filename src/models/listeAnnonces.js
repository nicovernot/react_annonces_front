import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import CreaAnnonceForm from './creaAnnonceForm';
const ListeAnnonces = (props) => {
    
    const [displayBasic, setDisplayBasic] = useState(false)
    return ( 
        <div>
              
                <div className="container">
                    <h1>      Liste Annonces</h1>
                    <Button label="Ajout Annonce" icon="pi pi-external-link" onClick={(e) => setDisplayBasic({displayBasic:true})} />
                    <br/>
                    <Dialog header="Creation annonce" visible={displayBasic} style={{ width: '80vw' }}  onHide={(e) => setDisplayBasic(false)}>
                        <CreaAnnonceForm visible={setDisplayBasic} user={props.user}/>
                    </Dialog>
                </div>
             
        </div>
     );
}
 
export default ListeAnnonces;