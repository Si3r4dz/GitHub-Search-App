import React from "react";

export const fetchUserData = async (querry: string, apiKey: string) => {

    return fetch(`https://api.github.com/search/users?q=${querry}`,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        }
    })
    .then((res) => res.json())
}

export const fetchUserDetailsData = async(url: string, apiKey: string) => {
    return fetch(url,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        }
    })
    .then((res) => res.json())
}
    
export const fetchReposData = async (querry: string, apiKey: string) => {
    return fetch(`https://api.github.com/search/repositories?q=${querry}`,{
        headers:{
            'Authorization':`Bearer ${apiKey}`
        }
    })
    .then((res) =>  {return res.json()} )
    .catch(() => {return 'error'} )
}

