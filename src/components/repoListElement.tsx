import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,     
} from "react-native";
import RepoSvg from '../assets/Vector.svg'
import StarSvg from '../assets/star.svg'
import gitColors from '../../colors.json'

interface Props {
    resultsCount?: String,
    item: ApiRepoItem
}

interface ApiRepoItem {
    name: string,
    full_name: string,
    owner:{
      login: string,
    },
    description: string,
    updated_at: Date,
    language: string,
    license:{
      name: string
    },
    stargazers_count: string,
    id: number,
    open_issues: number
  }

const RepoListElement = (props: Props) => {

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


    const daysSinceUpdate = calculateDate(props.item.updated_at)
    const langColor = getLanguageColor(props.item.language)

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
                    {props.item.full_name}
                    </Text>

                    <Text style={styles.repoDescription}>
                    {props.item.description}
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
                        {props.item.stargazers_count}
                        </Text>
                    </View>

                    {props.item?.language?.length > 0 ? 
                        <View style={{ flexDirection:'row', marginRight:'2%', alignItems:'center', maxWidth:'50%'}}>
                        <View style={{...styles.dot, backgroundColor: langColor, }} />
                        <Text style={styles.repoInfoText}>
                            {' '}{props.item.language} 
                        </Text>
                        </View>
                        :
                        <></>
                    }
                    
                    {props.item.license?.name?.length > 0 ?
                        <View style={{ flexDirection:'row', marginRight:'1%', alignItems:'center'}}>
                        <Text style={styles.repoInfoText}>
                            {props.item.license.name}
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

                    {props.item.open_issues > 0 ? 
                        <View style={{ flexDirection:'row', marginRight:'1%', alignItems:'center', }}>
                        <Text style={styles.repoInfoText}>
                            {props.item.open_issues.toString()} {'issues need help'}
                        </Text>
                        </View> 
                        : <></>
                    }
                    </View>
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

export default (RepoListElement)
