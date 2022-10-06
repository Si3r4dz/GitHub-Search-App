import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,     
} from "react-native";

interface Props {
    resultsCount?: String,
    item: ApiUserItem
    onPress?: () => void
}

interface ApiUserItem {
    login: string,
    avatar_url: string,
    name: string,
    id: number,
    location: string,
    bio: string,
  }

const UserListElement = (props: Props) => {
    return(
        <TouchableOpacity 
            style={{ 
                minHeight:70,
                borderBottomWidth:1,
                borderBottomColor:'#C4C4C4',
                borderBottomLeftRadius:25,
                borderBottomRightRadius:25,
            }}
            onPress={props.onPress}
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
                <Image
                source={{
                    uri:`${props.item?.avatar_url}`
                }}
                style={{
                    width:20,
                    height:20,
                }}
                ></Image>
                </View>

                <View style={{ justifyContent:'center', width:'90%'}}>  

                    <Text style={styles.repoFullName}>
                    { props.item?.name !== null ? props.item.name : props.item.login}  
                    </Text>

                    <Text style={styles.repoDescription}>
                    {props.item.login}
                    </Text>
                    {props.item.bio !== null && 
                        <View style={{ flexDirection:'row', alignItems:'center', maxWidth:'95%', marginBottom:'1%'}}>
                            <Text style={styles.userBioText}>
                            {props.item.bio}
                            </Text>
                        </View>
                    }

                    {props.item.location !== null && 
                        <View style={{
                            flexDirection:'row',
                            width:'95%',
                            flexWrap:'wrap'
                        }}
                        > 
                            <View style={{ flexDirection:'row', alignItems:'center', maxWidth:'95%', marginRight:'2%'}}>
                                <Text style={styles.userInfoText}>
                                {props.item.location}
                                </Text>
                            </View>

                        </View>
                    } 
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  repoFullName: {
    color:'#166CD7',
    fontFamily:'Roboto',
    textAlign:'left'
  },
  repoDescription: {
    color:'#6F7781',
    fontFamily:'Roboto',
    fontWeight:'500',
    marginBottom:10
  },
  userInfoText: {
    fontFamily:'Segoe UI',
    marginLeft:2,
    fontSize:12,
    color:'#6F7781',
    fontWeight:'800'
  },
  userBioText: {
    fontFamily:'Segoe UI',
    marginLeft:2,
    fontSize:12,
    color:'#000',
    fontWeight:'800'
  },
  dot:{
    height:12,
    width:12,
    borderRadius:50,
  }
});

export default (UserListElement)
