import React,{Component} from 'react';
import Login from './models/login'
import Menu from './models/menu'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import Register from './models/register'
import {Dialog} from 'primereact/dialog';
import loginin from './services/loginservice';
import Ssm from './models/ssm'
import Map from './models/maps'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useParams
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     user:{role:"",email:"",password:"",logged:false,loggin:this.handleSubmit,logouts:this.logout,register:this.register},
     modalvisible:false,
     register:false,
     datamenu:[]
      }
  }
  
  menuHandler = (event) => {
console.log("menu click")
window.location.href = "http://www.w3schools.com";
  }

  selogger = event => {
  console.log("se logger ")
  this.setState({modalvisible: true})

  }

  logout = event => {
  
    this.setState({user : { logged : false }}) 
    localStorage.removeItem("token"); 
    localStorage.removeItem("username"); 
  }
  register = (event,pwd,email) => {
    console.log(pwd + ' '+ email)
    event.preventDefault();
    console.log("register")
    this.setState({register:true})
  }

  componentDidMount() {
    fetch(`http://`+process.env.REACT_APP_URL_HOST+`/site`)
      .then(res => res.json())
      .then(json => {

        this.setState({ datamenu: json })
      }
        );
  }


  handleSubmit = (event,pwd,email) => {
    console.log(pwd.pwd + ' '+ email.email)
    event.preventDefault();
    this.setState({modalvisible: false})
     loginin(pwd.pwd,email.email).then(() => 
    this.setState({user : {email: localStorage.getItem("username"),  logged :true }}));
  }

  render() { 
   
    return (  
      <div className="alert-info">
         <Router>
           
          <Menu user={this.state.user} menuHandler={this.menuHandler} menu={this.state.datamenu}>
              {!this.state.user.logged? (<div><Button label="login" icon="pi pi-check" onClick={this.selogger} iconPos="right" /> <Button label="Register" icon="pi pi-user" className="p-button-success" onClick={this.register} iconPos="right" /></div>):<Button label="logout" icon="pi pi-user" onClick={this.logout} iconPos="right" />}
          </Menu>  
          
            <Dialog header="login" visible={this.state.modalvisible} style={{width: '50vw'}} modal={true} onHide={() => this.setState({modalvisible: false})}>
          <div><Login loggin= {this.handleSubmit}/></div>
          </Dialog>

          <Dialog header="register" className="rounded" visible={this.state.register}  style={{width: '50vw'}} modal={true} onHide={() => this.setState({register: false})}>
          <div><Register register= {this.register}/></div>
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
      <div className="content center ">

      <div  >
      {renderSwitchmenu(id)}
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

function renderSwitchmenu(id) {

  switch(id) {
    case 'maps':
     
    return <Map par={id}/>;

    case 'home':
     
    return <Home urlpath={id}  />;
    case 'about':
     
      return <About urlpath={id}/>;
    default:
  console.log(`Sorry, we are out of ${id}.`);
  }
}


function renderSwitchcontent(id) {

  switch(id) {
    case 'maps':
     
    return <Map par={id}/>;

    case 'home':
     
    return <Home1 urlparam={id}  />;
    case 'about':
     
      return <About1 urlparam={id}/>;
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

  
  
  function Home(props) {
   const id= props.urlpath
   
    return (
      <div>
        <h2>Home</h2>

        <h3>ID: {id}</h3>
     
      </div>
    );
  }
  
  function About(props) {
  const params =props.urlpath
  
    return (
      <div>
        <h2>About ---{params}</h2>
      </div>
    );
    

   }

   //content

   function Home1(props) {
    const id= props.urlparam
    
     return (
       <div>
         <h2>Home</h2>
 
         <h3>ID: {id}</h3>
      
       </div>
     );
   }
   
   function About1(props) {
   const params =props.urlparam
  
     return (
       <div>
         <h2>About ---{params}</h2>
       </div>
     );
     
 
    }

      

export default App;