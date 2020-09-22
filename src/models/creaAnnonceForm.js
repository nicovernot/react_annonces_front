import React,{useState} from 'react';
import { Editor } from 'primereact/editor';
import { Calendar } from 'primereact/calendar'; 
import { Button } from 'primereact/button';

const CreaAnnonceForm = (props) => {
  console.log(props)
    const [ editorval, setEditval] = useState("");
    const [ dates, setDates] = useState({dates:new Date()});
    const [ datesf, setDatesf] = useState({dates:new Date()});

    return ( 
        <form>
          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input type="text" className="form-control" id="titre" placeholder="Titre" />
          </div>
          <div className="form-group">
            <label htmlFor="descripion">Description</label>
            <Editor style={{height:'320px'}} value={editorval} onTextChange={(e) => setEditval({editorval:e.htmlValue})} />
          </div>
          <div className="form-group">
              <label htmlFor="formGroupExampleInput">Example label</label>
              <Calendar value={dates} onChange={(e) => setDates({dates:e.value})}></Calendar>
           </div>
           <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Another label</label>
              <Calendar value={datesf} onChange={(e) => setDatesf({datesf:e.value})}></Calendar>
           </div>
          
         
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Example label</label>
              <Button label="Info" className="p-button-info" />
            </div>

          
          
        </form>
        
     );
}
 

export default CreaAnnonceForm;