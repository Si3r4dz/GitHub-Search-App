import React, { useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  BackHandler
} from 'react-native';



import SearchBar from '../components/searchBar';
import ResultsBar from '../components/resultsBar';
import RepoListElement from '../components/repoListElement';
import UserListElement from '../components/userListElement';
import { getUserData, getReposData } from '../utils/getData';


const Home = ( {navigation}: {navigation: any}) => {

  const [searchText, setSearchText] = useState('')
  const [usersList, setUsersList ] = useState([])
  const [reposList, setReposList ] = useState([])
  const [mixedList, setMixedList ] = useState([])
  const [isLoading, setIsLoading ] = useState(false)
  const [mixArrays, setMixArrays] = useState(false)
  const [totalItemsCount, setTotalItemsCount] = useState('0') 
  const exampleSearchText: string = 'Si3r4dz'

  interface element {
      id: number
  }

  const mixResults = () => {
    let oneArray = usersList.concat(reposList)
    oneArray = oneArray.sort((a: element, b: element) =>{
        return a.id - b.id;
    })
    setMixedList(oneArray)
    setMixArrays(false)
  }
  
  const getData = async (querry: string = exampleSearchText, signal?: AbortSignal )=>{
      setReposList([])
      setUsersList([])
      setMixedList([])
    const users = await getUserData(querry, signal)
    const repos = await getReposData(querry, signal)
    if(!repos.error && !users.error){
      console.log((users.total_count + repos.total_count))
      setTotalItemsCount((users.total_count + repos.total_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      if(users.total_count > 0) setUsersList(users.items)
      if(repos.total_count > 0) setReposList(repos.items)
    }
    setIsLoading(false)
    setMixArrays((current)=> !current)
  }
  

  useEffect(() => {
    setTotalItemsCount('0')
    getData()
  }, []) 
  
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (searchText.length > 2) {
            setIsLoading(true)
    }
    const fetchTimeOut = setTimeout(() => {
        if (searchText.length > 2){
          setTotalItemsCount('0')
          setReposList([])
          setUsersList([])
          setMixedList([])
          getData(searchText, signal)
      }
    }, 200)
    return () => {
      clearTimeout(fetchTimeOut)
      controller.abort()
    }
  }, [searchText])

  useEffect(()=>{
    if(mixArrays){
      mixResults()
    }
  },[mixArrays])

  useEffect(()=>{
    const backhandler = BackHandler.addEventListener('hardwareBackPress', (): boolean => {
        return false
    })
    return () => backhandler.remove()
  },[navigation])
  

  return (
    <SafeAreaView style={{flex:1}}> 
        <SearchBar 
          placeholder='Search'
          onChangeInputText={setSearchText}
        /> 
          <ResultsBar
           resultsCount={totalItemsCount} 
          />
          {!isLoading ? 
          <ScrollView>
            {mixedList.map( (el: any) => {
                
                return(
                  el.type !== undefined ?
                  <UserListElement 
                    item={el}
                    key={el.id}
                    onPress={()=> navigation.navigate('UserView', { item:el })}
                  />
                  :
                  <RepoListElement
                    item={el}
                    key={el.id}
                  />
                )
            } )}
          </ScrollView>
          :
         ( searchText.length === 0 ? 
          <View style={{ alignSelf:'center', marginTop: 10}}>
            <Text>Enter search text</Text>
          </View>
          :
          <View style={{ justifyContent:'center', alignItems:'center', flexDirection:'row', padding:10}}>
            {/* <Text style={{ marginRight: 5}}> Loading data </Text> */}
            <ActivityIndicator color={'#24292F'} size='large' />
          </View>
          
          )
          }
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

export default Home;
