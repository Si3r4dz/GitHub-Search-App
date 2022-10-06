import React from "react";

export const fetchUserData = async (querry: string, apiKey: string,  Signal?: AbortSignal) => {

    return fetch(`https://api.github.com/search/users?q=${querry}`,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        },
        signal: Signal
    })
    .then((res) => res.json())
    .catch((err) => 
    {
        if(err.name ==='AbortError'){
            console.log(err)
        }
        else{
            return 'error'
        }
    })
}

export const fetchUserDetailsData = async(url: string, apiKey: string, Signal?: AbortSignal) => {
    return fetch(url,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        },
        signal:Signal
    })
    .then((res) => res.json())
    .catch((err) => 
    {
        if(err.name ==='AbortError'){
            console.log(err)
        }
        else{
            return 'error'
        }
    })
}
    
export const fetchReposData = async (querry: string, apiKey: string, Signal?: AbortSignal) => {
    return fetch(`https://api.github.com/search/repositories?q=${querry}`,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        },
        signal: Signal
    })
    .then((res) =>  {return res.json()} )
    .catch((err) => 
    {
        if(err.name ==='AbortError'){
            console.log(err)
        }
        else{
            return 'error'
        }
    })
}

