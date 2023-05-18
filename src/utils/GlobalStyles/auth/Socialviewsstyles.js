import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Socialviewsstyles = StyleSheet.create({
 

    mainview:
    {
      marginHorizontal:wp(10),
      alignItems:"center",
      flexDirection:"row",
      justifyContent:"space-between",
      marginBottom:wp(10)
    },
 iconview:
    {
      borderRadius:40,
      borderColor:Colors.Appgreencolor,
      height:wp(14),
      width:wp(38),
      borderWidth:1,
      alignItems:'center',
      justifyContent:'center'
    },

socialicons:
{
  height:wp(8),
  width:wp(8),
}
 
});
export default Socialviewsstyles;
