// @flow
import  React,{ useState, } from 'react';
import 'primeflex/primeflex.css';
import {Password} from 'primereact/password';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { css } from 'emotion'

export function Login(props) {
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [err,setErr] = useState(false)
 // const validation= (event) => {
 //   event.preventDefault();
 //     } 
 
  return (
  <div className="p-fluid">
    <div className="p-field">
    <label>Email</label>
      <InputText type="email"  onChange={(e) => setEmail({email: e.target.value}) }/>
      
    </div>
    <div className="p-field">
    <label >Mot de passe</label>
  <Password  onChange={(e) => setPwd({pwd: e.target.value}) }/>
    </div>
    {err? <p css={css` backgroundColor: red`}>formulaire mal rempli</p>:""}
    {props.usererr? <p css={css` backgroundColor: red`}>error authentification</p>:""}
      <Button onClick={(e)=> pwd && email ? props.loggin(e,pwd,email): setErr({err:true})}  label="Valider" />
</div>

  );
};

export default  Login;