import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Authtextstyles = StyleSheet.create({
 
    textview:
    {
      alignItems:'center',
     marginHorizontal:25,
     marginTop:hp('3%'),
  marginBottom:hp('9%'),
     //backgroundColor:'red',
   
     },
    images:
    {
  height:wp('22%'),
  width:wp('22%')
    },
    toptext:
    {
      color: Colors.Appthemecolor,
      fontWeight: 'bold',
      fontSize: hp('3%'),
     
    },
    subtextview:
    {
      marginTop:wp(5),
      marginLeft:wp(10),
      justifyContent: 'center',
    },
    subtext:
    {
      color: 'rgba(164, 164, 164, 1)',
      fontWeight: '400',
      fontSize: hp(1.6),
      width: wp(70),
      marginBottom:wp(8),
      marginTop:wp(2),
    },
 
});
export default Authtextstyles;
