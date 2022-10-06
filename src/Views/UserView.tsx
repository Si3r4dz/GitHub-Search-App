import React, { useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView
} from 'react-native';

import SearchBar from '../components/searchBar';
import FollowersSvg from '../assets/followers.svg'

const UserView = ({route}: {route: any}) => {

    const [searchText, setSearchText] = useState('')


    const handlerSearchTextchanged = (text: string) => {
        console.log(text)
    }

  return (
    <SafeAreaView style={{flex:1}}> 
        <SearchBar 
          placeholder='Search'
          onChangeInputText={handlerSearchTextchanged}
        />
        <ScrollView style={{flex:1}}>
            <View style={{
                width:'100%',
                height:'50%',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'column',
                marginTop:'22%'
            }}>
                <Image
                source={{
                        uri:`${route.params?.item.avatar_url}`
                    }}
                    style={{
                        width:300,
                        height:300,
                        borderRadius:150,
                    }}
                ></Image>
                <View style={{
                    marginTop:20,
                    width:'95%',
                    justifyContent:'center',
                    alignItems:'center',
                    
                    }}>
                        {route.params?.item.name !== null ? 
                            <Text style={styles.userNameText}>
                                    {route.params?.item.name}
                            </Text>
                        :
                            <Text style={styles.userNameText}>
                                    {route.params?.item.login}
                            </Text>
                        }
                        <Text style={styles.userLoginText}> 
                            {route.params?.item.login} 
                        </Text>
                        <View
                        style={{
                            width:'95%',
                            height:30, 
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center'
                        }} 
                        >
                            <Text style={{ marginRight:19}}>
                                <Text style={{marginRight:5}}> <FollowersSvg /> </Text>
                                {route.params?.item.followers} Followers
                            </Text>
                            <Text>
                                {route.params?.item.following} Following
                            </Text>
                        </View>
                </View>
            </View> 
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
  userNameText: {
    color:'black', 
    fontSize:26,
    fontFamily:'Roboto',
    fontWeight:'600',
  },
  userLoginText: {
    color:'#6F7781', 
    fontSize:20,
    fontFamily:'Roboto',
    fontWeight:'600',
    marginTop:5,
  },
});

export default UserView;
