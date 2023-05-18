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



const ParkCars = ({ navigation }) => {

        ////////////isfocused//////////
        const isfocussed = useIsFocused()

  ////////////////redux////////////
  const { theme } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
    
    //camera state and funnction
    const refRBSheet = useRef();

  ////////////////findingslocations state//////////
  const[findingslocations,setfindingslocations]=useState()

//////////////// location data state///////////
const [ParkingDetail, setParkingDetail] = useState();
const [ParkingID, setParkingID] = useState();
const [ParkingTime, setParkingTime] = useState();
const [count, setcount] = useState(1);
//const count =0
  //////////////Api Calling////////////////////
const GetUser=async() => {
  var user= await AsyncStorage.getItem('Userid')
  console.log("userid:",user,count)
  axios({
  method: 'GET',
  url: BASE_URL+'user/getUser/'+user,
  })
  .then(async function (response) {
  console.log("response here in get useer detail", JSON.stringify(response.data.userDetails[0].user_parkings))
  setParkingDetail(response.data.userDetails[0].user_parkings[0].isParked)
  setfindingslocations(response.data.userDetails[0].user_parkings)
  setParkingID(response.data.userDetails[0].user_parkings[0]._id)
  setParkingTime(response.data.userDetails[0].user_parkings[0].parkTime)
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
        GetUser()
    }
  }, [isfocussed]);
  return (

    <SafeAreaView style={theme === false? LightModestyles.container:DarkModestyles.container}>
                  <View style={{flexDirection:'row',paddingTop:20,
           alignItems:"center",marginHorizontal:wp(8)
            }}>
                                       <CustomHeader
headerlabel={'Car Parked Locations'}
iconPress={() => {navigation.toggleDrawer()}}
icon={"menu"}
/>
          </View>
        
                        <View style={{
        marginTop:hp(3),
        marginBottom:hp(18),
                            }}>
             <FlatList
              data={findingslocations}
              renderItem={({ item, index, separators }) => (
  
         <View style={theme === false ? LightModestyles.card:DarkModestyles.card}>
         {/* <Image 
                 source={{uri:item.location_id.images.length === 0 ?null:item._id}}
                 style={DarkModestyles.cardImage}
                 resizeMode="cover"
               /> */}
           <View style={LightModestyles.textContent}>
             <Text numberOfLines={1} style={theme === false ?LightModestyles.cardtitle:DarkModestyles.cardtitle}>
                {item.title}</Text>
             <View style={{flexDirection:"row"}}>
             <Text numberOfLines={5} style={theme === false ?LightModestyles.cardDescription:DarkModestyles.cardDescription}>
                 {item.description}</Text>
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
              )}
              //keyExtractor={item => item.id}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
    </View>

    </SafeAreaView>

  )
};

export default ParkCars;