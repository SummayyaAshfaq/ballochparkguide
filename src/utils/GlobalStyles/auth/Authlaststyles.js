import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../Colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Authlaststyles = StyleSheet.create({
 
    lasttextview:
    { 
      flexDirection: 'row',
       alignContent:'center',
      justifyContent:'center',
     alignItems:'flex-end',
     marginTop:wp(0),
     marginBottom:wp(10),
    },
    lasttext:
    {
      color:Colors.Appthemecolor,
      fontWeight: '600',
      fontSize: hp(1.8),
    },
    lasttext1:
    {
      color: Colors.Appgreencolor,
      fontWeight: '800',
      fontFamily:"Rubik",
      fontSize: hp(1.8),
    },
 
});
export default Authlaststyles;
