import React, { Component } from 'react';
import '../../../bootstrap.css';
import { getUserDetail } from '../RestApiComponent';
import TokenSessionStorage from '../TokenSessionStorage';
import './../../css/user/UserProfileComponent.css'



export default class UserProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userProfile: {}
        }
        this.logoutClick = this.logoutClick.bind(this);
        this.profileView = this.profileView.bind(this);
        this.myTweetView = this.myTweetView.bind(this);
        this.addTweet = this.addTweet.bind(this);
    }


    profileView() {
        this.props.navigate("/dashboard");
    }
    myTweetView() {
        this.props.navigate("/mytweets");
    }
    logoutClick() {
        TokenSessionStorage.logout();
        this.props.navigate("/logout");
    }

    addTweet() {
        this.props.navigate("/posttweet")
    }

    componentDidMount() {
        getUserDetail().then((response) => {
            if (response.status === 200) {
                this.setState({
                    userProfile: response.data
                })
            }
        }, (error) => {
            if (error.code === "ERR_NETWORK") {
                this.props.navigate("/error")
            } if (error.code === "ERR_BAD_REQUEST") {
                TokenSessionStorage.logout();
                this.props.navigate("/logout")
            } else {
                console.log(error.code);
            }
        });
    }


    render() {
        return (
            <div>
                <nav id="navigation" className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
                    <div id="navbar-container" className="container">
                        <div id="profile">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.profileView()}>Home</button>
                        </div>
                        <div id="myprofile-tweet">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.myTweetView()}>MyTweet</button>
                        </div>
                        <div id="logoutbutton">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.logoutClick()}>Logout</button>
                        </div>
                        <div id="addtweet">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.addTweet()}>AddTweet</button>
                        </div>
                    </div>
                </nav>
                <div className="UserProfileComponent">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">User Details</h5>
                            <p className="card-text">First Name:{this.state.userProfile.firstName}</p>
                            <p className="card-text">Last Name:{this.state.userProfile.lastName}</p>
                            <p className="card-text">UserID:{this.state.userProfile.loginId}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}