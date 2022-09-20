import React, { Component } from "react";
import '../../../bootstrap.css';
import './../../css/Tweet/EditTweetComponent.css'
import { updateTweet } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";



export default class EditTweetComponent extends Component {


  constructor(props) {
    super(props);
    this.state = {
      tweet: '',
      tag: ''
    }
    this.handleEventChange = this.handleEventChange.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.addTweet = this.addTweet.bind(this);
  }

  handleEventChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  updateClicked() {
    updateTweet(this.state.tweet, this.state.tag).then((response) => {
      if (response.status === 200) {
        TokenSessionStorage.removeUpdateTweetStoreId("updateId");
        this.props.navigate("/mytweets")
      }
    }, (error) => {
      if (error.code === "ERR_BAD_REQUEST") {
        TokenSessionStorage.removeUpdateTweetStoreId("updateId");
        TokenSessionStorage.logout();
        this.props.navigate("/logout")
      } if (error.status === 500) {
        this.props.navigate("/error")
      } else {
        console.log("Something Went Wrong");
      }
    });
  }


  profileView() {
    this.props.navigate("/userprofile");
  }

  myTweetView() {
    this.props.navigate("/mytweets");
  }

  logoutClick() {
    TokenSessionStorage.logout();
    this.props.navigate("/logout");
  }

  addTweet() {
    this.props.navigate("/dashboard")
  }

  render() {
    return (
      <div>
        <nav id="navigation" className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
          <div id="navbar-container" className="container">
            <div id="profile">
              <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.profileView()}>Profile</button>
            </div>
            <div id="myprofile-tweet">
              <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.myTweetView()}>MyTweet</button>
            </div>
            <div id="logoutbutton">
              <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.logoutClick()}>Logout</button>
            </div>
            <div id="addtweet">
              <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.addTweet()}>Home</button>
            </div>
          </div>
        </nav>
        <div className="EditTweetComponent">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Edit Tweet</h3>
              <div className="form-group mt-3">
                <label>Tweet</label>
                <input type="text" className="form-control mt-1" name="tweet" placeholder="Enter tweet" onChange={this.handleEventChange} />
              </div>
              <div className="form-group mt-3">
                <label>tag</label>
                <input type="text" className="form-control mt-1" name="tag" placeholder="Enter tag" onChange={this.handleEventChange} />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={() => this.updateClicked()}>
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    )
  }


}