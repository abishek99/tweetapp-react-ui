import React, { Component } from 'react';
import '../../bootstrap.css';
import './../css/ErrorComponent.css';

export default class ErrorComponent extends Component{


    render(){
        return(
            <div className="ErrorComponent">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <p className="text-success">Something Went Wrong</p>
                        <p> Please Try After Sometime </p>
                        <p><a href="/login" className="text-primary">Login</a></p>
                    </div>
                </div>
            </div>
        )
    }



}