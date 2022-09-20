import React, {Component} from "react";
import '../../../bootstrap.css';
import { loginUser } from "../RestApiComponent";
import './../../css/user/LoginComponent.css';
import TokenSessionStorage from './../TokenSessionStorage.js';

export default class LoginComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      userName: '',
      password: '',
      token: '',
      invalidCredentials: false
    };
    this.loginClick = this.loginClick.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
  }


  handleEventChange(event){
    this.setState({
      [event.target.name]:event.target.value,
    })
  }


  



  loginClick() {
    if(this.state.userName==="" || this.state.password===""){
      this.setState({
        invalidCredentials: true
      })
    }else{
      loginUser(this.state.userName,this.state.password).then((response) =>{
        if (response.status === 200) {
          this.setState({token: response.data.token,invalidCredentials: false})
          TokenSessionStorage.loginSuccessful(response.data.token)
          this.props.navigate("/dashboard");
        }
      },(error) => {
          if (error.response.status === 401) {
            this.setState({invalidCredentials: true})
          } 
          if(error.response.status === 500){
            this.setState({invalidCredentials: true})
            this.props.navigate("/error")
          }
        });
    }
  }





  render() {
    return (
      <div>
        <div className="LoginComponent">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              {this.state.invalidCredentials ? <h3>Invalid Credentials</h3> : ""}
              <div className="form-group mt-3">
                <label>Login Id</label>
                <input type="type" className="form-control mt-1" name="userName" placeholder="Enter LoginId" onChange={this.handleEventChange} required={true} />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input type="password" className="form-control mt-1" name="password" placeholder="Enter password" onChange={this.handleEventChange} required={true} />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={this.loginClick}>
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2"><a href='/register'>New Register</a></p>
              <p className="forgot-password text-right mt-2">
                Forgot <a href='/forgetpassword'>password?</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }


}
