import React, { useEffect, useState,useRef } from 'react';
import {
FlatList,
   View, Text, TouchableOpacity, ImageBackground,SafeAreaView,Image,
} from 'react-native';


////////////////app components///////////////
 import CustomHeader from '../../../../components/Header/CustomHeader';
import TabsBadgeView from '../../../../components/TopTabs/TopTabs';

/////////////////app navigation////////////////
import { useIsFocused } from '@react-navigation/native';

/////////////////app redux states////////////
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../../../redux/actions';

/////////////app styles////////////
import LightModestyles from '../../../../styles/Saved Location/LightModestyles';
import DarkModestyles from '../../../../styles/Saved Location/DarkModestyles';
import Colors from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

    ////////////////api////////////////
    import axios from 'axios';
    import { BASE_URL } from '../../../../utils/ApiRootUrl';
    import AsyncStorage from '@react-native-async-storage/async-storage';



const SavedLoctaion = ({ navigation }) => {

        ////////////isfocused//////////
        const isfocussed = useIsFocused()

  ////////////////redux////////////
  const { theme } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
    
    //camera state and funnction
    const refRBSheet = useRef();

      //status states
  const[savedloc,setSavedLoc]=useState(true)
  const[findings,setFindings]=useState(false)

  ////////////////savedlocation state//////////
  const[savedlocations,setsavedlocations]=useState()

//////////////Api Calling////////////////////
const GetSavedLocation=async(props) => {
  var user= await AsyncStorage.getItem('Userid')
  console.log("userid:",user)
  axios({
  method: 'GET',
  url: BASE_URL+'findings/getAllSavedLocIfFindingsNotExistByUserId/'+user,
  })
  .then(async function (response) {
  console.log("response here in get useer", JSON.stringify(response.data))
  setsavedlocations(response.data.result)
  })
  .catch(function (error) {
  if(error)
  {     console.log('Email or Password is incorrect')}
  //setModalVisible(true)
  
  console.log("error", error)
  })
  }
  ////////////////findingslocations state//////////
  const[findingslocations,setfindingslocations]=useState()

//////////////Api Calling////////////////////
const GetFindingsLocation=async(props) => {
  var user= await AsyncStorage.getItem('Userid')
  console.log("userid here in find location:",user)
  axios({
  method: 'GET',
  url: BASE_URL+'findings/getFindingsByUserId/'+user,
  })
  .then(async function (response) {
  console.log("response here in get useer", JSON.stringify(response.data))
  setfindingslocations(response.data.result)
  })
  .catch(function (error) {
  if(error)
  {     console.log('Email or Password is incorrect')}
  //setModalVisible(true)
  
  console.log("error", error)
  })
  }
  useEffect(() => {
    if(isfocussed){
      GetSavedLocation()
      GetFindingsLocation()
    }
  }, [isfocussed]);
  return (

    <SafeAreaView style={theme === false? LightModestyles.container:DarkModestyles.container}>
                  {/* <View style={{flexDirection:'row',
                  //paddingTop:20,
           alignItems:"center",
           //marginHorizontal:wp(8)
            }}> */}
                                       <CustomHeader
headerlabel={'Saved Findings'}
iconPress={() => {navigation.toggleDrawer()}}
icon={"menu"}
/>
          {/* </View> */}

          <View style={{flexDirection:'row',
         justifyContent:'space-between',
        marginHorizontal:wp(8),
        //backgroundColor:'red'
        }}>
          <TouchableOpacity onPress={()=>{setSavedLoc(true),setFindings(false)}}>
          <TabsBadgeView
             title={'Saved Locations'}
             width={'30%'}
             state={savedloc}
             type={'User'}
               />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setSavedLoc(false),setFindings(true)}}>
            <TabsBadgeView
             title={'Location Findings'}
             width={'32%'}
             state={findings}
             type={'Job name here'}
               />
            </TouchableOpacity>
          </View>
                        <View style={{
        marginTop:hp(3),
        marginBottom:hp(18),
                      // /backgroundColor:"yellow"
                            }}>
                              {savedlocations === ''?null:
                                     <FlatList
                                     data={ 
                                       savedloc=== true ?savedlocations:findingslocations}
                                     renderItem={({ item, index, separators }) => (
                             
                                       <TouchableOpacity onPress={()=>navigation.navigate('LocationDetail',{navplace:
                                         item.location_id.type==='parking'?'Car Parkings':
                                         item.location_id.type==='walking-route'?'Walking Routes':
                                         item.location_id.type==='toilet'?'Toilets':
                                         item.location_id.type==='dog-walk'?'Dogs Walk':null,
                                       locid:item.location_id._id})}>
                                <View style={theme === false ? LightModestyles.card:DarkModestyles.card}>
                                 {item.location_id.images.length ===0?null:
                                          <Image 
                                          source={{uri:item.location_id.images[0].image_url}}
                                          style={DarkModestyles.cardImage}
                                          resizeMode='stretch'
                                        />
                                 }
                       
                                  <View style={LightModestyles.textContent}>
                                    <Text numberOfLines={1} style={theme === false ?LightModestyles.cardtitle:DarkModestyles.cardtitle}>{item.location_id.title}</Text>
                                    <View style={{flexDirection:"row"}}>
                                    <Text numberOfLines={5} style={theme === false ?LightModestyles.cardDescription:DarkModestyles.cardDescription}>
                                        {item.location_id.description}</Text>
                                    <View style={{marginTop:hp(5)}}>
                                    <Image 
                                        source={require('../../../../assets/Home/save.png')}
                                        style={{width:wp(5),height:hp(5)}}
                                        resizeMode='contain'
                                      />
                                      </View>
                                  </View>
                                </View>
                       
                                </View>
                                       </TouchableOpacity>                    
                       
                                     )}
                                     //keyExtractor={item => item.id}
                                     keyExtractor={(item, index) => index.toString()}
                                     showsVerticalScrollIndicator={false}
                                     showsHorizontalScrollIndicator={false}
                                   />
                              }
      
    </View>

    </SafeAreaView>

  )
};

export default SavedLoctaion;