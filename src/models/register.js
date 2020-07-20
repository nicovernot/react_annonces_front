// @flow
import * as React from 'react';
import 'primeflex/primeflex.css';
import {Password} from 'primereact/password';
import {InputText} from 'primereact/inputtext';

export function Register(props) {

   
  return (<div className="p-fluid">
  <div className="p-field">
  <label htmlFor="pwdfield">Mdp</label>
  <Password id="pwfield"  />
  <label htmlFor="pwdfield">refaire Mdp</label>
  <Password id="pwfield"  />
  </div>
  <div className="p-field">
  <label htmlFor="fieldId">Email</label>
    <InputText id="fieldId" type="text"/>
    {props.children}
  </div>
</div>

  );
};

export default  Register;