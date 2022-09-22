/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import GitLogo from './src/assets/logo.svg'



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchText, setSearchText] = useState(String)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log(searchText)
  }, [searchText])

  const fetchData = async() =>{
      fetch()
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
        translucent={false}
        hidden={false}
      />
      <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#24292F',
            justifyContent: 'space-between',
            alignItems:'center',
            flexDirection:'row',
            paddingLeft:'2.5%',
            paddingRight:'2.5%',
          }}
        >
          <View style={{width:'5%', marginLeft:'1%'}}>
            <GitLogo />
          </View>
          
          <View style={{width:'85%'}}>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#D0D7DE',
                width: '80%',
                alignSelf: 'flex-end',
                paddingLeft: '2.5%',
                margin: 5,
                color:"#fff",
              }}
              placeholder="Search"
              placeholderTextColor={'#D0D7DE'}
              onChangeText={setSearchText}
            />
          </View>
          
        </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
