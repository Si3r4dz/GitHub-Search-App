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
import RepoSvg from './src/assets/Vector.svg'
import StarSvg from './src/assets/star.svg'
import gitColors from './colors.json'



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchText, setSearchText] = useState(String)
  const [usersList, setUsersList ] = useState([])
  const [reposList, setReposList ] = useState([])
  const [totalItemsCount, setTotalItemsCount] = useState(String) 
  const apiKey = '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 '

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  interface ApiRepoItem {
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
    stargazers_count: String,
    id: Number,
    has_issues: boolean,
    open_issues: Number
  }
  interface ApiUserItem {
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
    stargazers_count: String,
    id: Number,
    has_issues: boolean,
    open_issues: Number
  }

  interface GitData {
    total_count : number,
    items:[],
    incomplete_results: boolean,
  }

  const mixResults = () => {
    const oneArray = usersList.concat(reposList)
    console.log(oneArray)
    return 0;
  }

  const calculateDate = (date: Date) => {
    const lastUpdateDate = new Date(date)
    const now = new Date()
    const difference = now.getTime() - lastUpdateDate.getTime()
    const result = Math.ceil(difference / (1000 * 3600 * 24))
    return result
  }
  
  const getLanguageColor = (lang: String) => {
    let colorHex
    Object.entries(gitColors).filter( ([ key,value ]) =>{ if(key === lang) colorHex = value.color })
    return colorHex
  }
  
  const fetchData = async (querry: String = "Si3r4dz") =>{
      const reposResponse: GitData = await getReposData(querry, apiKey)
      const usersResponse: GitData = await getUserData(querry, apiKey)
      setTotalItemsCount((usersResponse?.total_count + reposResponse?.total_count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      if(usersResponse.items.length > 0) setUsersList(usersResponse.items)
      if(reposResponse.items.length > 0) setReposList(reposResponse.items)
      mixResults()
  }

  useEffect(() => { 
    fetchData()
  }, [])

  

  useEffect(() => {
    const fetchTimeOut = setTimeout(() => {
        if (searchText.length > 2){
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
            {reposList.map( (repo: ApiRepoItem) => {
              const daysSinceUpdate = calculateDate(repo.updated_at)
              const langColor = getLanguageColor(repo.language)
                return(
                  <TouchableOpacity 
                    style={{ 
                      minHeight:70,
                      borderBottomWidth:1,
                      borderBottomColor:'#C4C4C4',
                      borderBottomLeftRadius:25,
                      borderBottomRightRadius:25,
                    }}
                  > 
                  <View style={{
                    flexDirection:'row',
                    padding:10,
                  }}>

                    <View style={{
                      width:30,
                      height:30,
                      margin: 5,
                      justifyContent:'flex-start',
                      alignItems:'center',
                    }}>
                      <RepoSvg />
                    </View>

                    <View style={{ justifyContent:'center', width:'90%'}}>  

                        <Text style={styles.repoFullName}>
                          {repo.full_name}
                        </Text>

                        <Text style={styles.repoDescription}>
                          {repo.description}
                        </Text>

                        <View style={{
                            flexDirection:'row',
                            width:'95%',
                            flexWrap:'wrap'
                          }}
                        >  
                          <View style={{ flexDirection:'row', alignItems:'center', maxWidth:'15%', marginRight:'2%'}}>
                            <StarSvg /> 
                            <Text style={styles.repoInfoText}>
                              {repo.stargazers_count}
                            </Text>
                          </View>

                          {repo?.language?.length > 0 ? 
                            <View style={{ flexDirection:'row', marginRight:'2%', alignItems:'center', maxWidth:'50%'}}>
                              <View style={{...styles.dot, backgroundColor:langColor, }} />
                              <Text style={styles.repoInfoText}>
                                {' '}{repo.language} 
                               </Text>
                            </View>
                            :
                            <></>
                          }
                          
                          {repo.license?.name?.length > 0 ?
                            <View style={{ flexDirection:'row', marginRight:'1%', alignItems:'center'}}>
                              <Text style={styles.repoInfoText}>
                                {repo.license.name}
                              </Text>
                            </View>
                            :
                            <></>
                          }

                          <View style={{ flexDirection:'row', marginRight:'1%', alignItems:'center', }}>
                            <Text style={styles.repoInfoText}>
                              {'Updated '}{daysSinceUpdate} {'days ago'}
                            </Text>
                          </View>

                          {repo.open_issues > 0 ? 
                            <View style={{ flexDirection:'row', marginRight:'1%', alignItems:'center', }}>
                              <Text style={styles.repoInfoText}>
                                {repo.open_issues.toString()} {'issues need help'}
                              </Text>
                            </View> 
                            : <></>
                          }
                        </View>
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
