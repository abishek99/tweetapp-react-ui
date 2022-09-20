import axios from "axios";
import jwt_decode from "jwt-decode";


export function loginUser(username,password){
    return axios.post(`http://34.238.161.93:8095/api/v1.0/tweets/login`,{
       "userName":username,
       "password":password
    })
}

export function registerUser(firstName,lastName,email,loginId,password,confirmPassword,contactNumber,roles,secretKey){
   return axios.post(`http://34.238.161.93:8095/api/v1.0/tweets/register`,
    {
        "firstName":firstName,
        "lastName":lastName,
        "email":email,
        "loginId":loginId,
        "password":password,
        "confirmPassword":confirmPassword,
        "contactNumber":contactNumber,
        "roles":roles,
        "secretKey":secretKey
    })
}

export function getUserDetail(){
    const token = sessionStorage.getItem("token")
    const decodeToken = jwt_decode(token); 
    return axios.get(`http://34.238.161.93:8095/api/v1.0/tweets/user/search/${decodeToken.sub}`,{
        headers: {
            Authorization: `Bearer ${token}` 
          }
    });

}
    
export function getAllTweets(){
    return axios.get(`http://34.238.161.93:8095/api/v1.0/tweets/all`);
}

export function getUserTweets(){
    const token = sessionStorage.getItem("token")
    const decodeToken = jwt_decode(token); 
    return axios.get(`http://34.238.161.93:8095/api/v1.0/tweets/${decodeToken.sub}`,{
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
}


export function likeTweet(tweetId){
    const token = sessionStorage.getItem("token")
    const decodeToken = jwt_decode(token); 
    return axios.put(`http://34.238.161.93:8095/api/v1.0/tweets/${decodeToken.sub}/like/${tweetId}`,{},{
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
}

export function postTweet(userTweetId,tweet,tag){
    const token = sessionStorage.getItem("token")
    const decodeToken = jwt_decode(token); 
    return axios.post(`http://34.238.161.93:8095/api/v1.0/tweets/${decodeToken.sub}/add`,{
        "tweet":tweet,
        "userTweetId":userTweetId,
        "tag":tag,
        "replyVo":null,
        "like":0
    },{
         headers: {
            Authorization: `Bearer ${token}` 
          }
     });
}


export function replyTweet(tweetId,reply){
     const token = sessionStorage.getItem("token")
     const decodeToken = jwt_decode(token); 
     return axios.post(`http://34.238.161.93:8095/api/v1.0/tweets/${decodeToken.sub}/reply/${tweetId}`,{"replied":reply},{
         headers: {
            Authorization: `Bearer ${token}` 
          }
     });
}



export function deleteTweet(tweetId){
    const token = sessionStorage.getItem("token")
    const decodeToken = jwt_decode(token);
    return axios.delete(`http://34.238.161.93:8095/api/v1.0/tweets/${decodeToken.sub}/delete/${tweetId}`,{
        headers: {
           Authorization: `Bearer ${token}` 
         }
    });
}


export function updateTweet(tweet,tag){
    const token = sessionStorage.getItem("token")
    const decodeToken = jwt_decode(token);
    const tweetId = sessionStorage.getItem("updateId");
    return axios.put(`http://34.238.161.93:8095/api/v1.0/tweets/${decodeToken.sub}/update/${tweetId}`,{
        "updatedTweet":tweet,
        "tag":tag
    },{
        headers: {
            Authorization: `Bearer ${token}` 
        }  
    })
}


export function getUserByUserName(){
    const token = sessionStorage.getItem("token")
    const userName = sessionStorage.getItem("userName");
    return axios.get(`http://34.238.161.93:8095/api/v1.0/tweets/user/search/${userName}`,{
        headers: {
            Authorization: `Bearer ${token}` 
        }  
    })
}


export function forgetPassword(userName,changePassword,secret){
    return axios.post(`http://34.238.161.93:8095/api/v1.0/tweets/${userName}/forgot`,{
        "userName":userName,
        "changePassword":changePassword,
        "secret":secret
    })
}



