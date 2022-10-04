import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    resultsCount?: String,
}

const ResultsBar = (props: Props) => {


    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.resultsCount} results
            </Text>
          </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:86,
    justifyContent:'center',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#C4C4C4',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  text: {
    fontSize:21,
    fontFamily:'Roboto',
    fontWeight:'600',
    lineHeight:32,
    color:'black'
  }
});

export default (ResultsBar)