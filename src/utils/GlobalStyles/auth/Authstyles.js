import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Authstyles = StyleSheet.create({
 

    maintextview:
    {
      justifyContent: 'center',
      marginTop: wp(15),
      marginLeft:wp(10)
    },
    maintext:
    {
      color: Colors.Appthemecolor,
      fontWeight: 'bold',
      fontSize: hp(3.2),
      fontFamily: 'Sen',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    subtextview:
    {
      justifyContent: 'center',
      marginLeft:wp(10),
      marginBottom:wp(5),
      marginTop: wp(2),
    },
    subtext:
    {
      color: Colors.Appgreencolor,
      fontWeight: 'bold',
      fontSize: hp(2),
      fontFamily: 'Sen',
      width: wp(72),
    },
    toptext:
    {
      color: Colors.Appthemecolor,
      fontWeight: 'bold',
      fontSize: hp(3),
      fontFamily: 'Sen',
    },
 
});
export default Authstyles;
