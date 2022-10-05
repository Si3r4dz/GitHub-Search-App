import React from "react";


export const fetchUserData = async (querry: String, apiKey: String) =>{
    const response = fetch(`https://api.github.com/search/users?q=${querry}`,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        }
    })
    const json = await response;
    if(json.status === 200){
        return json.json()
    }
    else return 'error'
    }
    
export const fetchReposData = async (querry: String, apiKey: String) =>{
    const response = fetch(`https://api.github.com/search/repositories?q=${querry}`,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        }
    })
    const json = await response;
    if(json.status === 200){
        return json.json()
    }
    else return 'error'
}

