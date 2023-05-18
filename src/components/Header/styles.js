import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utils/Colors';
const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

const styles = StyleSheet.create({



  
    //Header
    headerView: {
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems:'center',
      //justifyContent:'center',
      height: Height * 0.07,
      width: Width ,
      paddingHorizontal:wp(3),
        shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  
  elevation: 6,
    },
    iconview:
    { 
        justifyContent: 'center', 
        marginRight: wp(5)
     },
    labelView: {
      marginHorizontal: wp(5),
      //width: Width * 0.7,
  justifyContent:"center"
    },

label:
{ 
    color: Colors.Appthemecolorprimary,
     fontSize: hp(2.2), 
     fontWeight: "bold", 
     //marginTop:hp(2.5)
    }

  });
  
  
  export default styles;
  