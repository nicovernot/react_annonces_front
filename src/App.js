import React,{Component} from 'react';
import Login from './models/login'
import Menu from './models/menu'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import Register from './models/register'
import Contact from './models/contact'
import {Dialog} from 'primereact/dialog';
import Ssm from './models/ssm'
import Map from './models/maps'
import MonCompte from './models/moncompte'
import { css } from 'emotion'
import Home from './models/home'
import EspaceEntreprise from './models/espaceentreprise'
import axios from 'axios';
import EspaceHote from './models/espacehote'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useParams,

} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     user:{
          role:"",
          email:localStorage.getItem("username") ? localStorage.getItem("username"):"",
          password:"",
          logginerror:false,
          logged:localStorage.getItem("token") ? true:false,
          loggin:this.handleSubmit,
          logouts:this.logout,
          register:this.register
        },
     modalvisible:false,
     register:false,
     datamenu:[]
     
      }
  }
  

  selogger = event => {
  console.log("se logger ")
  this.setState({modalvisible: true})

  }

  logout = event => {
  
    this.setState({user : { logged : false }}) 
    localStorage.removeItem("token"); 
    localStorage.removeItem("username"); 
    window.location.href = "/";
  }

  register = (event,pwd,email,username) => {
    console.log(pwd + ' '+ email)
    event.preventDefault();
    axios
  .post('http://localhost:1337/auth/local/register', {
    username: username,
    email: email,
    password: pwd,
  })
  .then(response => {
    // Handle success.
   
    this.setState({register:false})
    console.log('Well done!');
    localStorage.setItem("username", email); 
    localStorage.setItem("token", response.data.jwt); 
    this.setState({modalvisible: false})
    this.setState({user : {email: email,  logged :true }})
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
    console.log("register")
    this.setState({register:true})
  }


  componentDidMount() {

    fetch(`http://`+process.env.REACT_APP_URL_HOST+`/menus?_sort=ordre:ASC`)
      .then(res => res.json())
      .then(json => {
     
        this.setState({ datamenu: json })
      }
        );
  }



  handleSubmit = (event,pwd,email) => {
        
    event.preventDefault();
    if(pwd && email){

      axios.post(`http://`+process.env.REACT_APP_URL_HOST+`/auth/local`, { "identifier":email.email,"password":pwd.pwd })
      .then(res => {
          if(res.data.jwt){
          
          this.setState({user:{logginerror:false}})
   
          localStorage.setItem("username", email.email); 
          localStorage.setItem("token", res.data.jwt); 
          this.setState({user : {email: res.data.user.email,  logged :true }})
          this.setState({modalvisible: false})
         
        } 
      }).catch((error) => {
        console.log(error)
        this.setState({user:{logginerror:true}})
       
    })

  }
      
      
    
   
  }

  render() { 
   
    return (  
      <div >
         <Router>
           
          <Menu user={this.state.user} menuHandler={this.menuHandler} menu={this.state.datamenu}>
              {!this.state.user.logged? (
              <div 
               className="text-left"
             >
               <Button label="Login" icon="pi pi-check" onClick={this.selogger} iconPos="right" /> 
               <Button   icon="pi pi-user" label="S'inscrire" className="p-button-success ml-1" onClick={this.register} iconPos="right"/>
               </div>):
              <div className="text-left"><Button  label="Deconnexion" icon="pi pi-user" onClick={this.logout} iconPos="right" /></div>}
          </Menu>  
         
            <Dialog header="login" visible={this.state.modalvisible} style={{width: '50vw'}} modal={true} onHide={() => this.setState({modalvisible: false})}>
          <div><Login usererr={this.state.user.logginerror} loggin= {this.handleSubmit}/></div>
          </Dialog>

          <Dialog header="register" className="rounded" visible={this.state.register}  style={{width: '50vw'}} modal={true} onHide={() => this.setState({register: false})}>
          <div><Register register= {this.register}/></div>
          </Dialog>
           <div className="container">
             <br/>
          <Switch>
              <Route path="/:id"  children={<Child user={this.state.user.email} />} />
              <Route path="/"  children={<Home user={this.state.user.email} />} />
          </Switch>  
           </div>

         </Router>

      </div>
    );
  }
}

function Child(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
  <div>
      <div className="content center ">

      <div  >
      {renderSwitchmenu(id,props.user)}
      </div>

      <div >
        <Router>
          <QueryParams path={id} />
        </Router>
      </div>
      

      
      </div>
      
    
  </div>
  );
}

function renderSwitchmenu(id,user) {

  switch(id) {
    case 'maps':
     
    return <Map par={id}/>;

    case 'home':
     
    return <Home urlpath={id}  />;

    case 'moncompte':
     
    return <MonCompte user={user} urlpath={id}  />;

    case 'espaceentreprise':
     
      return <EspaceEntreprise urlpath={id}  />;
    case 'contact':
     
        return <Contact urlpath={id}  />;  
    case 'espacehote':
     
        return <EspaceHote urlpath={id}  />;  
    case 'register':
     
      return <Register urlpath={id}  />;

    default:
  console.log(`Sorry, we are out of ${id}.`);
  }
}


function renderSwitchcontent(id) {

  switch(id) {
    case 'maps':
     
    return <Map par={id}/>;

    case 'home':
     
    return <Home urlparam={id}  />;

    default:
  console.log(`Sorry, we are out of ${id}.`);
  }
}



function useQuery() {
  return new URLSearchParams(useLocation().search);
}
//sousmenu - page 
function QueryParams() {
  
  let query = useQuery();
 const testf = () => {
    console.log("test")
  }
  return (
    <div>
      <div>
       {query.get('name') ? 
       (
        <div>
        <Ssm testf={testf}/>
        <h2>{query.get("name")}</h2>
        <Childname name={query.get("name")} />
        </div> 
        )
        :""
       }
      </div>
    </div>
  );
}

function Childname({ name }) {
  
    return (
      <div>
        {name ? (
          renderSwitchcontent(name)
        ) : (
          <h3>There is no name in the query string</h3>

        )}
      </div>
    );
  }

  
 



      

export default App;