import React, { Component } from "react";
import '../../../bootstrap.css';
import '../../css/user/RegisterComponent.css';
import { registerUser } from "../RestApiComponent";

export default class RegisterComponent extends Component{

constructor(props){
    super();
    this.state = {
        firstName:'',
        lastName:'',
        email:'',
        loginId:'',
        password:'',
        confirmPassword:'',
        contactNumber:'',
        roles:['USER'],
        secretKey:'',
        invalidDataFound:false,
        invalidAttributeName:''
    };
    this.handleEventChange = this.handleEventChange.bind(this);
    this.registerClick = this.registerClick.bind(this);
}

handleEventChange(event) {
    this.setState({
      [event.target.name]:event.target.value,
    })
}

registerClick(){
    if(this.state.firstName===""){
      this.setState({
        invalidDataFound:true,
      })
    }else if(this.state.lastName===""){
      this.setState({
        invalidDataFound:true,
      })
    } else if(this.state.email===""){
      this.setState({
        invalidDataFound:true,
      })
    } else if(this.state.password===""){
      this.setState({
        invalidDataFound:true
      })
    } else if(this.state.confirmPassword===""){
      this.setState({
        invalidDataFound:true
      })
    } else if(this.state.password!==this.state.confirmPassword){
      this.setState({
        invalidDataFound:true
      })
    } else if(this.state.contactNumber===""){
      this.setState({
        invalidDataFound:true
      })
    } else{
      this.setState({
        invalidDataFound:false
      })
       registerUser(this.state.firstName,
       this.state.lastName,
       this.state.email,
       this.state.loginId,
       this.state.password,
       this.state.confirmPassword,
       this.state.contactNumber,
       this.state.roles,
       this.state.secretKey).then((response) => {
         if(response.status===200){
          this.props.navigate("/login")
         }
        },(error) => {
          if(error.statusCode==="LOGIN_ID_PRESENT"){
            this.setState({
              invalidDataFound:true
            })
          }else{
            console.log("Something Went Wrong");
          }
        });
    }
  }

  render(){
    return (
        <div className="RegisterComponent">
        <form className="Auth-form"> 
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Register</h3>
            {this.state.invalidDataFound ? <h3>Invalid Credentials</h3> : ""}
            <div className="form-group mt-3">
            <label>FirstName</label>
            <input type="text" className="form-control mt-1" name="firstName" placeholder="Enter FirstName" onChange={this.handleEventChange} required={true} />
            </div>
            <div className="form-group mt-3">
              <label>LastName</label>
              <input type="text" className="form-control mt-1"name="lastName" placeholder="Enter Lastname" onChange={this.handleEventChange} required={true} />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input type="text" className="form-control mt-1" name="email" placeholder="Enter Email" onChange={this.handleEventChange} required={true}/>
            </div>
            <div className="form-group mt-3">
              <label>LoginId</label>
              <input type="text" className="form-control mt-1" name="loginId" placeholder="Enter LoginId" onChange={this.handleEventChange} required={true}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input type="password" className="form-control mt-1" name="password" placeholder="Enter password" onChange={this.handleEventChange} required={true}/>
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input type="password" className="form-control mt-1" name="confirmPassword" placeholder="re-enter the password" onChange={this.handleEventChange} required={true}/>
            </div>
            <div className="form-group mt-3">
              <label>Phone Number</label>
              <input type="type" className="form-control mt-1"  name="contactNumber" placeholder="Enter phoneNumber" onChange={this.handleEventChange} required={true}/>
            </div>
            <div className="form-group mt-3">
              {/* <label>Phone Number</label> */}
              <input type="type" className="form-control mt-1"  name="roles" hidden={true}/>
            </div>
            <div className="form-group mt-3">
              <label>Secret Key</label>
              <input type="type" className="form-control mt-1"  name="secretKey" placeholder="Enter SecretKey" onChange={this.handleEventChange} required={true}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={this.registerClick}> 
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

