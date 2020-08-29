
import React ,{ useState, } from 'react';
import 'primeflex/primeflex.css';
import {Password} from 'primereact/password';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
export function Register(props) {
  const [pwd, setPwd] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [email, setEmail] = useState(""); 
  const [isvalid, setIsvalid] = useState(false); 
  const [labelvalid, setLabelvalid] = useState(false);

  let validation= (event) => {
    event.preventDefault();
    if(pwd1.pwd1===pwd.pwd && email.email !=="" && pwd.pwd !=="" && pwd1.pwd1 !=="" ){
      setIsvalid({isvalid:true})
      props.register(event,pwd.pwd,email.email)
      console.log(isvalid)
    } 
   
      setLabelvalid({labelvalid:false})
 
  }
  return (<div className="p-fluid">
  <div className="p-field">
  <label >Mdp</label>
  <Password  onChange={(e) => setPwd({pwd: e.target.value}) } required />
  <label >refaire Mdp</label>
  <Password onChange={(e) => setPwd1({pwd1: e.target.value})} required/>
  </div>
  <div className="p-field">
  <label >Email</label>
    <InputText type="text" onChange={(e) => setEmail({email: e.target.value}) } required />
    {!labelvalid? '': <h3>le formulaire n'est pas correctement rempli</h3> }
    <Button onClick={(e) =>{validation(e) }}  label="Save" />
  </div>
</div>

  );
};

export default  Register;