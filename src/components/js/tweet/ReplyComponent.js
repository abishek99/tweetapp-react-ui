import React, { Component } from 'react';
import '../../../bootstrap.css';
import '../../css/Tweet/ReplyComponent.css';
import { replyTweet } from '../RestApiComponent';
import TokenSessionStorage from '../TokenSessionStorage';

export default class ReplyComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      replied: ''
    }
    this.handleEventChange = this.handleEventChange.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.addTweet = this.addTweet.bind(this);
    this.replyingTweet = this.replyingTweet.bind(this);
  }

  handleEventChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  replyingTweet() {
    replyTweet(sessionStorage.getItem("replyingId"), this.state.replied).then((response) => {
      if (response.status === 200) {
        TokenSessionStorage.removeReplyId();
        this.props.navigate("/dashboard");
      }
    }, (error) => {
      if (error.status === 401) {
        TokenSessionStorage.removeUpdateTweetStoreId("updateId");
        TokenSessionStorage.logout();
        this.props.navigate("/logout")
      } if (error.status === 400) {

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
        <div className="ReplyComponent">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Replying to Tweet</h3>
              <div className="form-group mt-3">
                <label>reply Comments</label>
                <input type="text" className="form-control mt-1" name="replied" placeholder="Enter reply" onChange={this.handleEventChange} required={true} />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={() => this.replyingTweet()}> Add Reply </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

}