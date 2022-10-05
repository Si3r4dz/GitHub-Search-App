import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {fetchUserData, fetchReposData} from './src/utils/gitApi'
import SearchBar from './src/components/searchBar';
import ResultsBar from './src/components/resultsBar';
import RepoListElement from './src/components/repoListElement';
import UserListElement from './src/components/userListElement';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchText, setSearchText] = useState('')
  const [usersList, setUsersList ] = useState([])
  const [reposList, setReposList ] = useState([])
  const [mixedList, setMixedList ] = useState([])
  const [totalItemsCount, setTotalItemsCount] = useState('0') 
  const apiKey = ''
  const exampleSearchText: string = 'elpassion'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  

  interface GitData {
    total_count : number,
    items:[],
    incomplete_results: boolean,
  }
  interface element {
      id: number
  }


  const mixResults = () => {
    let oneArray = usersList.concat(reposList)
    oneArray = oneArray.sort((a: element, b: element) =>{
        return a.id - b.id;
    })
    setMixedList(oneArray)
  }
  

  const getUserData = async (querry: String = exampleSearchText) =>{
      let userData: GitData
      const usersResponse = await fetchUserData(querry, apiKey)
      if(usersResponse === 'error'){
        console.log('Error with fetching users')
        setTotalItemsCount(totalItemsCount)
      }
      else{
        userData = usersResponse
        setTotalItemsCount((current) => (parseInt(current) + userData.total_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        if(usersResponse.items.length > 0) setUsersList(usersResponse.items)
        return true
      }
  }

  const getReposData = async (querry: String = exampleSearchText) =>{
      let reposData: GitData
      const reposResponse = await fetchReposData(querry, apiKey)
      if(reposResponse === 'error'){
        console.log('Error with fetching repos')
        setTotalItemsCount(totalItemsCount)
      }
      else{
        reposData = reposResponse
        setTotalItemsCount((current) => (parseInt(current) + reposData.total_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        if(reposResponse.items.length > 0) setReposList(reposResponse.items)
        return true
      }
  }

  useEffect(() => {
    setTotalItemsCount('0')
    getUserData()
    getReposData()
  }, []) 
  
  useEffect(() => {
    const fetchTimeOut = setTimeout(() => {
        if (searchText.length > 2){
          setTotalItemsCount('0')
          getUserData(searchText)
          getReposData(searchText)
      }
    }, 200)
    return () => clearTimeout(fetchTimeOut)
  }, [searchText])

  useEffect(()=>{
    if(usersList.length > 0 || reposList.length > 0){
      mixResults()
    }
  },[usersList, reposList])
  

  return (
    <SafeAreaView style={{flex:1}}> 
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
          translucent={false}
          hidden={false}
        />
        <SearchBar 
          placeholder='Search'
          onChangeInputText={setSearchText}
        /> 
          <ResultsBar
           resultsCount={totalItemsCount} 
          />
          <ScrollView>
            {mixedList.map( (element) => {
              
                return(
                  <UserListElement 
                    item={element}
                  />
                 
                )
            } )}
          </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  repoFullName: {
    color:'#166CD7',
    fontFamily:'Roboto',
    textAlign:'left'
  },
  repoDescription: {
    color:'##6F7781',
    fontFamily:'Roboto',
    fontWeight:'500',
    marginBottom:10
  },
  repoInfoText: {
    fontFamily:'Segoe UI',
    marginLeft:2,
    fontSize:12,
    color:'##6F7781',
    fontWeight:'800'
  },
  dot:{
    height:12,
    width:12,
    borderRadius:50,
  }
});

export default App;
