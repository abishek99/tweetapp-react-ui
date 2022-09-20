import {Component} from "react";

class TokenSessionStorage extends Component{

    loginSuccessful(token) {
        sessionStorage.setItem("token",token);
    }

    logout(){
        sessionStorage.removeItem("token");
    }

    addreplyTweetId(id){
        sessionStorage.setItem("replyingId",id);
    }
    
    removeReplyId(){
        sessionStorage.removeItem("replyingId");
    }

    addUpdateTweetStoreId(id){
        sessionStorage.setItem("updateId",id);
    }

    removeUpdateTweetStoreId(id){
        sessionStorage.removeItem("updateId");
    }

    searchUser(userName){
        sessionStorage.setItem("userName",userName);
    }
}



export default new TokenSessionStorage()