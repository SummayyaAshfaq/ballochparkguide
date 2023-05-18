import React, { useEffect, useState,useRef } from 'react';
import {
FlatList,
   View, Text, SafeAreaView,
} from 'react-native';
import {
    Avatar,Divider
} from 'react-native-paper';

////////////////app components///////////////
 import CustomButton from '../../../../components/Button/CustomButton';
 import CustomHeader from '../../../../components/Header/CustomHeader';
import ReviewsBottomSheet from '../../../../components/Reviews/ReviewsBottomSheet';

////////////////////app icons////////////////
import Icon from 'react-native-vector-icons/Ionicons';

///////////////app naviagtion////////////////
import { useIsFocused } from '@react-navigation/native';

/////////////////app redux states////////////
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../../../redux/actions';

/////////////app styles////////////
import LightModestyles from '../../../../styles/Reviews/LightModestyles';
import DarkModestyles from '../../../../styles/Reviews/DarkModestyles';
import Colors from '../../../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  ////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../utils/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Reviews = ({ navigation,route}) => {

      ////////////isfocused//////////
      const isfocussed = useIsFocused()

///////////previous data/////////////
const[predata]=useState(route.params)

  ////////////////redux////////////
  const { theme,locationid,routeid } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
    
  //camera state and funnction
    const refRBSheet = useRef();

    ///////////api get reivews state///////////
    const[data,setdata]=useState([])
    //get GetSignalsCategories api calling
    const GetReviews = async () => {
      var user= await AsyncStorage.getItem('Userid')
      console.log("userid:",user,locationid)
        axios({
            method: 'GET',
            url: BASE_URL + 'reviews/getReviewsByLocation/?location_id='+predata.LocationID,
        })
            .then(async function (response) {
                console.log("response", JSON.stringify(response.data))
setdata(response.data.result.reverse())
//setdata([...data.reverse()])
            })
            .catch(function (error) {
                console.log("error", error)
            })
    }

    useEffect(() => {
      if (isfocussed) {
        GetReviews()
      }
      //setdata([...data.reverse()])
            // const msgs = [...messages];
        // msgs.push({ fromSelf: true, message:message });
        // setMessages(msgs.reverse());
      //ssetdata(...data.reverse());
    }, [isfocussed,data]);
  return (

    <SafeAreaView style={theme === false? LightModestyles.container:DarkModestyles.container}>
                  {/* <View style={{flexDirection:'row',paddingTop:20,
           alignItems:"center",
           //marginHorizontal:wp(0)
            }}> */}

                                   <CustomHeader
headerlabel={'Reviews'}
iconPress={() => {navigation.goBack()}}
icon={"chevron-back" }
/>
          {/* </View> */}
          {data.length === 0?
                    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                                <Icon name={"chatbubble-ellipses-outline"} size={50} 
          color= {Colors.Appthemecolorprimary}
           onPress={() => {navigation.goBack()}} />
                    <Text style={{color:theme === false? 'black':'white',fontWeight:'bold'}}>
                      Please Add Your Reviews Here 
                    </Text>
                  </View>
        :
        <View style={{
          marginTop:hp(3),
          marginBottom:hp(6)
                              // /backgroundColor:"yellow"
                              }}>
                          <FlatList
        data={data}
        renderItem={({ item, index, separators }) => (                   
          <View>
          <View style={LightModestyles.card}>
          <View style={{flexDirection:'row',
          //justifyContent:'space-around',
          // borderBottomWidth:1,borderColor:'grey',width:wp(80),alignSelf:"center",
          //alignItems:'center',
          paddingHorizontal:wp(3)}}>
            {item.review.substring(0,3)=== 'no '?
              <Avatar.Text size={45} label={item.name.substring(0,2)}
              style={{backgroundColor:Colors.Appthemecolorprimary}}
               />
            : 
          <Avatar.Image 
                                 source={{uri:item.review.substring(0,3)=== 'no '?null: item.picture.userPicUrl}}
                                  size={45}
                                  style={{backgroundColor:Colors.Appthemecolorprimary}}
                              />
            }
                              <View style={{justifyContent:"center",alignContent:'center',
                          marginLeft:wp(4)}}>
          <Text style={theme === false? LightModestyles.useritemtext:DarkModestyles.useritemtext}>{item.name}</Text>
          <Text style={theme === false?LightModestyles.itemtext:DarkModestyles.itemtext}>{item.review}</Text>
          </View>
          </View>
       
      </View>
     <View style={theme === false? LightModestyles.borderview:DarkModestyles.borderview}>
     </View>
     </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      </View>
        }


    <View style={LightModestyles.button}>
            <CustomButton
              title={'Add Review'}
              widthset={'80%'}
              iscolor={'here'}
            //   loading={loading}
            //   disabled={disable}
            onPress={()=>{
              refRBSheet.current.open()
            }}
            /></View> 
<View>
<ReviewsBottomSheet
              refRBSheet={refRBSheet}
              onClose={() => refRBSheet.current.close()}
              title={'Gallery'}
              LOCID={predata.LocationID}
            />
</View>

    </SafeAreaView>

  )
};

export default Reviews;