import React from "react";


export const getUserData = async (querry: String, apiKey: String) =>{
    const response = fetch(`https://api.github.com/search/users?q=${querry}`,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        }
    })
    const json = await response;
    return json.json();
    }
    
export const getReposData = async (querry: String, apiKey: String) =>{
    const response = fetch(`https://api.github.com/search/repositories?q=${querry}`,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        }
    })
    const json = await response;
    return json.json();
}

