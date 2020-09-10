import React,{Component} from 'react';
import Login from './models/login'
import ErrorPage from './models/erropage'
import Menu from './models/menu'
import loggiin from './services/loginservice'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AdresseFrom from './models/adresseform'
import { Button } from 'primereact/button';
import Register from './models/register'
import Contact from './models/contact'
import {Dialog} from 'primereact/dialog';
import Ssm from './models/ssm'
import Map from './models/maps'
import MonCompte from './models/moncompte'
import Home from './models/home'
import EspaceEntreprise from './models/espaceentreprise'
import axios from 'axios';
import EspaceHote from './models/espacehote'
import Alert from './models/alert'
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
          email:localStorage.getItem("email") ? localStorage.getItem("email"):"",
          username:localStorage.getItem("username") ? localStorage.getItem("username"):"",
          password:"",
          logginerror:false,
          adresses:localStorage.getItem("adresses") ? JSON.parse(localStorage.getItem("adresses")):[],
          annonces:[],
          logged:localStorage.getItem("token") ? true:false,
          loggin:this.handleSubmit,
          logouts:this.logout,
          register:this.register,
          addadresse: this.ajoutAdresse,
        },
     modalvisible:false,
     register:false,
     modaladresse:false,
     datamenu:[]
     
      }
  }
  getData = event => {
    const data =  loggiin("najvnajv","toto@aol.com")
    data.then(resp =>{
      console.log(resp)
    })
    console.log(data)
  }
  
  ajoutAdresse = event => {
    console.log("ajout adresse")
    this.setState({modaladresse: true})
  }
  
  ajoutLocation = event => {
    console.log("ajout location")
  }
  ajoutAnnoce = event => {
    console.log("ajout annonce")
  }

  effacerAdresse = event => {
    console.log("effacer adresse")
  }
  
  effacerLocation = event => {
    console.log("effacer location")
  }
  effacerAnnoce = event => {
    console.log("effacer annonce")
  }

  modifAdresse = event => {
    console.log("modif adresse")
  }
  
  modifLocation = event => {
    console.log("modif location")
  }
  modifAnnoce = event => {
    console.log("modif annonce")
  }

  selogger = event => {
  console.log("se logger ")
  this.setState({modalvisible: true})

  }

  logout = event => {
  
    this.setState({user : { logged : false }}) 
    localStorage.removeItem("token"); 
    localStorage.removeItem("email");
    localStorage.removeItem("username"); 
    localStorage.removeItem("adresses"); 
    localStorage.removeItem("userid"); 
    window.location.href = "/";
  }

  register = (event,pwd,email,username) => {
    console.log(pwd + ' '+ email)
    event.preventDefault();
    axios
  .post(`http://`+process.env.REACT_APP_URL_HOST+`/auth/local/register`, {
    username: username,
    email: email,
    password: pwd,
  })
  .then(response => {
    // Handle success.
   
    this.setState({register:false})
    console.log('Well done!');
    localStorage.setItem("username", response.data.user.username); 
    localStorage.setItem("email", response.data.user.email); 
    localStorage.setItem("token", response.data.jwt); 
    localStorage.setItem("adresses", response.data.adresses); 
    localStorage.setItem("userid", response.data.user._id);
    this.setState({user : {email: email, adresses: response.data.user.adresses, logged :true }})
    this.setState({modalvisible: false})

  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
    console.log("register")
    this.setState({register:true})
  }


  componentDidMount() {
console.log(this.state.user.adresses)
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
          localStorage.setItem("adresses", JSON.stringify(res.data.user.adresses));  
          localStorage.setItem("email", res.data.user.email); 
          localStorage.setItem("username", res.data.user.username); 
          localStorage.setItem("token", res.data.jwt); 
          localStorage.setItem("userid", res.data.user._id);
          this.setState({user : {email: res.data.user.email,adresses: res.data.user.adresses,  logged :true }})
          this.setState({modalvisible: false})
         console.log(res)
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

          <Dialog header="Ajout Adresse" visible={this.state.modaladresse} style={{width: '60vw'}} modal={true} onHide={() => this.setState({modaladresse: false})}>
          <div><AdresseFrom/></div>
          </Dialog>
           <div className="container">
             <br/>
             
           {this.state.user.logged && this.state.user.adresses.length === 0  ?   <Alert/>:""}
           
          <Switch>
              <Route path="/:id"  children={<Child user={this.state.user} />} />
              <Route path="/"  children={<Home user={this.state.user} />} />
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
  console.log(id)
  
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
      return <ErrorPage/>
  }
}


function renderSwitchcontent(id) {

  switch(id) {
    case 'maps':
     
    return <Map par={id}/>;

    case 'home':
     
    return <Home urlparam={id}  />;

    case 'login':
     
      return <Login urlparam={id}  />;

    default:
  return 
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