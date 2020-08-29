// @flow
import  React,{ useState, } from 'react';
import 'primeflex/primeflex.css';
import {Password} from 'primereact/password';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';

export function Login(props) {
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  //const  username= "admin@admin.com"
  //const  password= "najvnajv"
   
  return (<div className="p-fluid">
  <div className="p-field">
  <label >Label</label>
<Password  onChange={(e) => setPwd({pwd: e.target.value}) }/>
  </div>
  <div className="p-field">
  <label>Label</label>
    <InputText keyfilter="email"  onChange={(e) => setEmail({email: e.target.value}) }/>
    <Button onClick={(e)=> props.loggin(e,pwd,email)}  label="Save" />
    
  </div>
</div>

  );
};

export default  Login;