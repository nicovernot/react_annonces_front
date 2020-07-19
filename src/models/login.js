// @flow
import * as React from 'react';

import 'primeflex/primeflex.css';
import {Password} from 'primereact/password';
import {InputText} from 'primereact/inputtext';

export function Login(props) {
  return (<div className="p-fluid">
  <div className="p-field">
  <label htmlFor="pwdfield">Label</label>
<Password id="pwfield" />
  </div>
  <div className="p-field">
  <label htmlFor="fieldId">Label</label>
    <InputText id="fieldId" type="text"/>
    {props.children}
  </div>
</div>

  );
};

export default  Login;