import React,{ useState } from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


const Alerte = () => {
    const [show, setShow] = useState(true);
    return (
        <div>

        <Alert show={show} variant="danger">
        <Alert.Heading>Merci d'ajouter une adresse</Alert.Heading>
        <p>
          Vous n'avez pas d'adresse !
        </p>
        <Link to="moncompte" onClick={(e) => setShow(false)}>Mon Compte</Link>
        <hr />
        <div className="d-flex justify-content-end">
        <Button onClick={(e) => setShow(false)} variant="outline-success">
            Fermer
          </Button>
        </div>
        </Alert>
        
        </div>
      );
}
 
export default Alerte;
