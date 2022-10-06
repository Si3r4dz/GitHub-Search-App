import React from "react";
import {fetchUserData, fetchReposData, fetchUserDetailsData} from './gitApi'
import { API_KEY } from "@env"

interface GitData {
  total_count : number,
  items:[],
  incomplete_results: boolean,
}

export const getUserData = async (querry: string, signal?: AbortSignal) =>{
      const usersResponse = await fetchUserData(querry, API_KEY, signal)
      if(usersResponse?.message === 'Bad credentials' || usersResponse?.message === 'Not Found'){
        return {error: true, message:'Error with fetching users'}
      }
      else{
        let i = 0
        for(let value of usersResponse.items){
          const userDetails = await fetchUserDetailsData(value.url, API_KEY, signal)
          value = {
            ...value,
            name: userDetails.name,
            bio: userDetails.bio,
            location: userDetails.location,
            following : userDetails.following,
            followers: userDetails.followers
          }
          usersResponse.items[i] = value
          i++
        }
        return usersResponse
      }
  }

export const getReposData = async (querry: string,  signal?: AbortSignal) =>{
      const reposResponse = await fetchReposData(querry, API_KEY, signal)
      if(reposResponse.message === 'Bad credentials' || reposResponse.message === 'Not Found'){
        return {error: true, message:'Error with fetching repos'}
      }
      else{
        return reposResponse
      }
  }