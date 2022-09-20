import React, { Component } from "react";
import '../../../bootstrap.css';
import '../../css/user/ForgetPasswordComponent.css';
import { forgetPassword } from "../RestApiComponent";


export default class ForgetPasswordComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      userName:'',
      secret:'',
      changePassword:'',
      invalidDataFound:'false'
    }
    this.handleEventChange = this.handleEventChange.bind(this);
    this.forgetPasswordClick = this.forgetPasswordClick.bind(this);
  }


  handleEventChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  forgetPasswordClick() {
    if(this.state.userName===""||this.state.changePassword===""||this.state.secret===""){

    }
    else{
      forgetPassword(this.state.userName,this.state.changePassword,this.state.secret).then((response) => {
      if(response.status===200){
       this.props.navigate("/login")
      }
     },(error) => {
       if(error.response.status===500){
          this.props.navigate("/error")
       }else{
         console.log(error.response.data.message);
       }
     });
    }
  }

  render() {
    return (
      <div className="ForgetPasswordComponent">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Change Password</h3>
            <div className="form-group mt-3">
              <label>Login Id</label>
              <input type="type" className="form-control mt-1" name="userName" placeholder="Enter loginId" value={this.state.loginId} onChange={this.handleEventChange} required={true} />
            </div>
            <div className="form-group mt-3">
              <label>Secret</label>
              <input type="type" className="form-control mt-1" name="secret" placeholder="Enter Secret" value={this.state.secretKey} onChange={this.handleEventChange} required={true} />
            </div>
            <div className="form-group mt-3">
              <label>Change Password</label>
              <input type="password" className="form-control mt-1" name="changePassword" placeholder="Enter password" value={this.state.changePassword} onChange={this.handleEventChange} required={true} />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={() => this.forgetPasswordClick()}>
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
                <a href='/login'>Go Back</a>
              </p>
          </div>
        </form>
      </div>
    )
  }


}