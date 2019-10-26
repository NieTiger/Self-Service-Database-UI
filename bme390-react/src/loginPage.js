import React, {Component} from 'react';
import './loginPage.css';
import CuteDog from "./images/cute_dog.png";


class LoginPage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
          username : "",
          password : ""
        }
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        }

    updateEmail(event){
        this.setState({username : event.target.value})
    }

    updatePassword(event){
        this.setState({password : event.target.value})
    }

    handleLogin(){
        console.log('Your email value is: ' + this.state.username)
        console.log('Your password value is: ' + this.state.password)
    }

    render() {
    
    return (
        <div class = "backgroundDiv">
        <div class="container"> 
            <div class="box"> 
            <div class="box-row"> 
                <div class="box-cell box1"> 
                <img src={CuteDog}/> 
                </div> 
                <div class="box-cell box2"> 
                <h1 class="welcomeBack">Welcome Back!</h1>
                <input class="emailDiv" type="email" placeholder="Enter Email Address..." onChange={this.updateEmail}/>
                <input class="passwordDiv" type="password" placeholder="Password" onChange={this.updatePassword}/>
                <input class="checkBox" type="checkbox"/>
                <h1 class="rememberMe">Remember Me</h1>
                <button class="login " onClick={this.handleLogin}>Login</button>
                <button class="google">Login With Google</button>
                <button class="facebook">Login With Facebook</button>
                </div> 
            </div> 
            </div> 
        </div>
        </div>
        );
    }
}

export default LoginPage;