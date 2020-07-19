import React,{Component} from 'react';
import Login from './models/login'
import {Card} from 'primereact/card';
import Menu from './models/menu'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import axios from 'axios';
import {Dialog} from 'primereact/dialog';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     user:{role:"",email:"",password:"",logged:false,loggin:this.selogger,logouts:this.logout,openlogin:false,register:this.register},
     modalvisible:false

      }
  }
  
  selogger = event => {
  console.log("se logger ")
  this.setState({user:{openlogin:true}})
  this.setState({modalvisible: true})

  }

  logout = event => {
    console.log("log out")
    this.setState({user : { logged : false }}) 
    localStorage.removeItem("token"); 
  }
  register = event => {
    console.log("register")
  
  }




  handleSubmit = event => {
    event.preventDefault();
  this.setState({user:{openlogin:false}})
  this.setState({modalvisible: false})
  
   
    const  username= "admin@admin.com"
    const  password= "najvnajv"
   

    axios.post(`http://localhost:8002/api/login_check`, { username,password })
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
       {this.state.user.openlogin? (<div><Login><button onClick={this.handleSubmit}>onClick </button></Login></div>):"" }
       </Dialog>
        <Switch>
          <Route path="/:id" children={<Child />} />
        </Switch>  
         </Router>
      
        <Card title="Title" subTitle="SubTitle">
         
          
        </Card>
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
      <h3>ID: {id}</h3>
    </div>
  );
}
export default App;