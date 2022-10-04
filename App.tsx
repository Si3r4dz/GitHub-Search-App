import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import {getUserData, getReposData} from './src/utils/gitApi'
import SearchBar from './src/components/searchBar';
import ResultsBar from './src/components/resultsBar';



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchText, setSearchText] = useState(String)
  const [usersList, setUsersList ] = useState([])
  const [reposList, setReposList ] = useState([])
  const [totalItemsCount, setTotalItemsCount] = useState(String) 
  const apiKey = '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'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  interface ApiItem {
    name:String,
    full_name: String,
    owner:{
      login: String,
    },
    description: String,
    updated_at: Date,
    language: String,
    license:{
      name: String
    },
    stargazers_count: Number,
    id: Number
  }

  interface GitData {
    total_count : number,
    items:[],
    incomplete_results: boolean,
  }
  

  useEffect(() => {
    const fetchData = async () =>{
       const reposResponse: GitData = await getReposData('example', apiKey)
       const usersResponse: GitData = await getUserData('example', apiKey)
       setTotalItemsCount((usersResponse?.total_count + reposResponse?.total_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
       if(usersResponse.items.length > 0) setUsersList(usersResponse.items)
       if(reposResponse.items.length > 0) setReposList(reposResponse.items)
    }
    fetchData()
  }, [])

  

  useEffect(() => {
    const fetchData = async (querry: String) =>{
       const reposResponse: GitData = await getReposData(querry, apiKey)
       const usersResponse: GitData = await getUserData(querry, apiKey)
       setTotalItemsCount((usersResponse?.total_count + reposResponse?.total_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
       if(usersResponse.items.length > 0) setUsersList(usersResponse.items)
       if(reposResponse.items.length > 0) setReposList(reposResponse.items)
    }
    const fetchTimeOut = setTimeout(() => {
        if (searchText.length > 3){
          fetchData(searchText)
      }
    }, 200)
    
    
    return () => clearTimeout(fetchTimeOut)
  }, [searchText])

  

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
            {reposList.map( (repo: ApiItem) => {
                return(
                  <TouchableOpacity 
                    style={{ 
                      height: 110,
                      borderBottomWidth:1,
                      borderBottomColor:'#C4C4C4',
                      borderBottomLeftRadius:20,
                      borderBottomRightRadius:20,
                    }}
                  > 
                  <View style={{
                    flexDirection:'row',
                    padding:10
                  }}>
                    <View style={{
                      width:30,
                      height:30,
                      backgroundColor:'red',
                      margin: 5
                    }}>

                    </View>
                    <View style={{ backgroundColor:'yellow', justifyContent:'center'}}>  
                      <Text style={styles.repoFullName}>
                        {repo.full_name}
                      </Text>
                    </View>
                    
                  </View>
                     
                  </TouchableOpacity>
                 
                )
            } )}
          </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  repoFullName:{
    color:'#166CD7',
    fontFamily:'Roboto',
    textAlign:'left'
  },

});

export default App;
