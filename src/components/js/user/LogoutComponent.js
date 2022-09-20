import React, {Component} from "react";
import '../../../bootstrap.css';
import './../../css/user/LogoutComponent.css';




export default class LogoutComponent extends Component{

    render(){
        return(
            <div className="LogoutComponent">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                     <p className="text-success">Logged Out</p>
                     <p> Your session has been ended </p>
                     <p><a href="/login" className="text-primary">Login</a></p>
                    </div>
                </div>
            </div>
        );
    }
}