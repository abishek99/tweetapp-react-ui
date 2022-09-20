import React, { Component } from "react";
import '../../../bootstrap.css';
import '../../css/Tweet/PostTweetComponent.css';
import { postTweet } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";



export default class PostTweetComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      userTweetId: '',
      tweet: '',
      tag: '',
      like: 0,
      replyVo: [],
      likedBy: [],
      invalidCredentials: false
    };
    this.handleEventChange = this.handleEventChange.bind(this);
    this.postClick = this.postClick.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.myTweetView = this.myTweetView.bind(this);
    this.addTweet = this.addTweet.bind(this);
  }

  handleEventChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  postClick() {
    if (this.state.userTweetId === "" || this.state.tweet === "" || this.state.tag === "") {
      this.setState({ invalidCredentials: true })
    } else {
      this.setState({ invalidCredentials: false })
      postTweet(this.state.userTweetId, this.state.tweet, this.state.tag).then((response) => {
        if (response.status === 200) {
          this.props.navigate("/dashboard")
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
        <div className="PostTweetComponent">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Post Tweet</h3>
              {this.state.invalidCredentials ? <h3>Invalid Credentials</h3> : ""}
              <div className="form-group mt-3">
                <label>userTweetId</label>
                <input type="text" className="form-control mt-1" name="userTweetId" placeholder="Enter userTweetId" onChange={this.handleEventChange} required={true} />
              </div>
              <div className="form-group mt-3">
                <label>Tweet</label>
                <input type="text" className="form-control mt-1" name="tweet" placeholder="Enter tweet" onChange={this.handleEventChange} required={true} />
              </div>
              <div className="form-group mt-3">
                <label>tag</label>
                <input type="text" className="form-control mt-1" name="tag" placeholder="Enter tag" onChange={this.handleEventChange} />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={this.postClick}>
                  post
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    )
  }

}