import React, { Component } from "react";
import '../../../bootstrap.css';
import '../../css/user/SearchUserComponent.css';
import { getUserByUserName } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";

export default class SearchUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            userProfile:{}
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

    componentDidMount(){
        getUserByUserName().then((response) => {
            if (response.status === 200) {
                this.setState({
                    userProfile:response.data
                })
            }
        }, (error) => {
            if (error.status === 500) {
                this.props.navigate("/logout")
            } if (error.status === 400) {

            } else {
                console.log("Something Went Wrong");
            }
        });
    }

    render()
    {
        return(
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

                <div className="SearchUserComponent">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title">Search User Details</h5>
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