import React,{Component} from 'react';
import Login from './models/login'
import Menu from './models/menu'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import axios from 'axios';
import Register from './models/register'
import {Dialog} from 'primereact/dialog';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     user:{role:"",email:"",password:"",logged:false,loggin:this.selogger,logouts:this.logout,register:this.register},
     modalvisible:false,
     register:false
      }
  }
  
  selogger = event => {
  console.log("se logger ")
  this.setState({modalvisible: true})

  }

  logout = event => {
    console.log("log out")
    this.setState({user : { logged : false }}) 
    localStorage.removeItem("token"); 
  }
  register = event => {
    console.log("register")
    this.setState({register:true})
  }




  handleSubmit = event => {
    event.preventDefault();
  this.setState({modalvisible: false})
  
   
    const  username= "admin@admin.com"
    const  password= "najvnajv"
   

    axios.post(`http://40.114.148.140/api/login_check`, { username,password })
      .then(res => {
        console.log(res);
        console.log(res.data.token);
        if(res.data.token){
          this.setState({user : { username:username, logged :true }})
          localStorage.setItem("token", res.data.token); 
        } 
      }).catch((error) => {
        console.log(JSON.stringify(error))
    })
  }

  render() { 
    return (  
      <div className="alert-info">
         <Router>
           
        <Menu user={this.state.user}>
          {!this.state.user.logged? (<div><Button label="login" icon="pi pi-check" onClick={this.selogger} iconPos="right" /> <Button label="Register" icon="pi pi-user" className="p-button-success" onClick={this.register} iconPos="right" /></div>):<Button label="logout" icon="pi pi-user" onClick={this.logout} iconPos="right" />}
        </Menu>  
        <Dialog header="login" visible={this.state.modalvisible} style={{width: '50vw'}} modal={true} onHide={() => this.setState({modalvisible: false})}>
       <div><Login><button onClick={this.handleSubmit}>onClick </button></Login></div>
       </Dialog>
       <Dialog header="register" className="rounded" visible={this.state.register} style={{width: '50vw'}} modal={true} onHide={() => this.setState({register: false})}>
       <div><Register><button onClick={this.register}>onClick </button></Register></div>
       </Dialog>
        <Switch>
          <Route path="/:id" children={<Child />} />
        </Switch>  
         </Router>
      
      
         
          

      </div>
    );
  }
}
function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
    <div class="p-grid ">
    <div class="p-col-4">
      <Router>
        <QueryParams path={id} />
      </Router>
    </div>

    <div class="p-col-8"><h3>ID: {id}</h3>
    </div>
    
</div>
      
    
    </div>
  );
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParams(props) {
  let query = useQuery();
  let path = props.path
  return (
    <div>
      <div>
        <h2>Accounts</h2>
        <ul>
  
        <li>
            <Link 
             to={{
              pathname: path? path :"",
              search: "?name=zillow-group",
                           
            }}
            
           > link </Link>
          </li>
          <li>
            <Link 
             to={{
              pathname: path? path :"",
              search: "?name=yahoo",
                           
            }}
            
           > yahoo</Link>
          </li>
          <li>
            <Link to="/{path}?name=zillow-group">Zillow Group</Link>
          </li>
          <li>
            <Link to="/{path}?name=yahoo">Yahoo</Link>
          </li>
          <li>
            <Link to="/account?name=modus-create">Modus Create</Link>
          </li>
        </ul>

        <Childname name={query.get("name")} />
      </div>
    </div>
  );
}

function Childname({ name }) {
  return (
    <div>
      {name ? (
        <h3>
          The <code>name</code> in the query string is &quot;{name}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}
export default App;