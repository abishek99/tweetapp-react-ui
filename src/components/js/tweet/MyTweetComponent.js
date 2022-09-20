import React, {Component} from "react";
import '../../../bootstrap.css';
import './../../css/Tweet/MyTweetComponent.css'
import { deleteTweet, getUserTweets } from "../RestApiComponent";
import TokenSessionStorage from "../TokenSessionStorage";



export default class MyTweetComponent extends Component{

    constructor(props) {
        super(props);
        this.state={
            userTweet:[]
        }
    this.deleteClicked = this.deleteClicked.bind(this)
    this.editTweet = this.editTweet.bind(this)
    this.logoutClick = this.logoutClick.bind(this);
    this.profileView = this.profileView.bind(this);
    this.addTweet = this.addTweet.bind(this);
    }


    componentDidMount(){
        getUserTweets().then((response) => {
            if (response.status === 200) {
                this.setState({
                    userTweet:response.data
                })
            }
        }, (error) => {
            if (error.status === 500) {
                this.props.navigate("/error")
            } if (error.status === 400) {

            } else {
                console.log("Something Went Wrong");
            }
        });
    }

    editTweet(id){
        TokenSessionStorage.addUpdateTweetStoreId(id);
        this.props.navigate("/edit")
    }

    deleteClicked(tweetId){
        deleteTweet(tweetId).then((response) => {
            if (response.status === 200) {
               
            }
        }, (error) => {
            if (error.status === 500) {
                this.props.navigate("/error")
            } if (error.status === 401) {
                TokenSessionStorage.removeUpdateTweetStoreId("updateId");
                TokenSessionStorage.logout();
                this.props.navigate("/logout")
            } else {
                console.log("Something Went Wrong");
            }
        });
    }

    profileView() {
        this.props.navigate("/userprofile");
    }

    myTweetView() {
        this.props.navigate("/dashboard");
    }

    logoutClick() {
        TokenSessionStorage.logout();
        this.props.navigate("/logout");
    }

    addTweet() {
        this.props.navigate("/posttweet")
    }

    render(){
        return(
        <div>
                <nav id="navigation" className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
                    <div id="navbar-container" className="container">
                        <div id="profile">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.profileView()}>Profile</button>
                        </div>
                        <div id="myprofile-tweet">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.myTweetView()}>Home</button>
                        </div>
                        <div id="logoutbutton">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.logoutClick()}>Logout</button>
                        </div>
                        <div id="addtweet">
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.addTweet()}>AddTweet</button>
                        </div>
                    </div>
                </nav>
        <div className="MyTweetComponent">
            <div className="container">
                {this.state.userTweet.map(
                    postedTweet =>
                    <div className="tweet-card" key={postedTweet.tweetId}>
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Tweet Posted By {postedTweet.userTweetId}</h5>
                                <p className="card-text">{postedTweet.tweet}</p>
                                <div className ="reply-block">
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
                                    <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.deleteClicked(postedTweet.tweetId)}>Delete</button>
                                    <button type="button" className="btn btn-outline-secondary btn-lg px-4" onClick={() => this.editTweet(postedTweet.tweetId)}>Update</button>
                                </div>
                            </div>
                        </div>
                        <br></br>
                    </div>
                )}
            </div>
        </div>
        
        </div>
        )
    }


}