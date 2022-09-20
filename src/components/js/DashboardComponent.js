import React, { Component } from 'react';
import '../../bootstrap.css';
import '../css/DashBoard.css';
import { getAllTweets, likeTweet } from './RestApiComponent';
import TokenSessionStorage from './TokenSessionStorage.js';



export default class DashboardComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            userName: '',
            noTweetsFound: false
        }
        this.likeClicked = this.likeClicked.bind(this);
        this.logoutClick = this.logoutClick.bind(this);
        this.profileView = this.profileView.bind(this);
        this.myTweetView = this.myTweetView.bind(this);
        this.replyClicked = this.replyClicked.bind(this);
        this.addTweet = this.addTweet.bind(this);
        this.searchClicked = this.searchClicked.bind(this);
        this.handleEventChange = this.handleEventChange.bind(this);
    }

    handleEventChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    searchClicked() {
        TokenSessionStorage.searchUser(this.state.userName)
        this.props.navigate("/searchuser")
    }

    componentDidMount() {
        getAllTweets().then(response => {
            this.setState({ tweets: response.data })
        })
    }

    likeClicked(id) {
        likeTweet(id).then((response) => {
            if (response.status === 200) {

            }
            else {
                this.props.navigate("/logout")
            }
        }, (error) => {
            if (error.status === 401) {
                this.props.navigate("/logout")
            } if (error.status === 400) {

            } if (error.status === 500) {
                this.props.navigate("/error")
            } else {
                console.log("Something Went Wrong");
            }
        });
    }
    addTweet() {
        this.props.navigate("/posttweet")
    }
    replyClicked(id) {
        TokenSessionStorage.addreplyTweetId(id)
        this.props.navigate("/reply");
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
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.addTweet()}>AddTweet</button>
                        </div>
                    </div>
                    <div id="search" className="form-group mx-sm-3 mb-2">
                        <input type="text" className="form-control" name="userName" placeholder="Search User" onChange={this.handleEventChange} />
                    </div>
                    <div id="search-button">
                        <button type="submit" className="btn btn-primary mb-2" onClick={() => this.searchClicked()}>Search</button>
                    </div>
                </nav>
                
                <div className="DashboardComponent">
                    <div className="container">
                        {this.state.tweets.map(
                            postedTweet =>
                                <div className="tweet-card" key={postedTweet.tweetId}>
                                    <div className="card" >
                                        <div className="card-body">
                                            <h5 className="card-title">Tweet Posted By {postedTweet.userTweetId}</h5>
                                            <p className="card-text">{postedTweet.tweet}</p>

                                            <div className="reply-block">
                                                {postedTweet.replyVo.map(
                                                    postedReply =>
                                                        <div key={postedReply.repliedDate}>
                                                            <div className="card-body" >
                                                                <p className="card-text">{postedReply.replied}</p>
                                                            </div>
                                                        </div>
                                                )}
                                            </div>
                                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                                                <button type="button" className="btn btn-lg btn-primary" onClick={() => this.likeClicked(postedTweet.tweetId, postedTweet.userTweetId)}>{postedTweet.like} likes</button>
                                                <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.replyClicked(postedTweet.tweetId)}>Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }



}