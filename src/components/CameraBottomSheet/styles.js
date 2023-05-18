import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    bottomtext:
    {
        color:'black',
        textAlign:'center',
         fontFamily:"Poppins",
         fontSize:15,
      },
      Subscriptiontext:
      {
          fontSize:hp(1.8),
          color:'white',
          fontFamily: "Montserrat Bold",
          fontWeight:'bold',
      },
      maintext:{
          fontSize:hp('2.5%'),
          fontWeight:'bold',
          color:Colors.Appthemecolorprimary,
          fontFamily: "Montserrat Bold",
        },
        modaltextview:
  {
    flexDirection:'row',
    justifyContent:'center',
    alignContent:"center",
    alignItems:"center",
    borderColor:Colors.Appthemecolorprimary,
        borderWidth:1,
        margin:hp(1),
        width:wp(60),
        borderRadius:wp(2),
        backgroundColor:Colors.Appthemecolorprimary
  },
  });
  export default styles;
  