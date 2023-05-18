import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const DarkModestyles = StyleSheet.create({
    container:
    {
      flex: 1,
  backgroundColor:'black',
    },
    toptext:
    {
      color: Colors.Appthemecolorprimary,
      fontWeight: '400',
      fontSize: hp('2.2%')
    },
    card:
    {
      margin:wp('2%'),
      borderRadius:10,
      flexDirection:'row',
     width: wp('95%'),
      alignSelf:'center',
      justifyContent:'space-between',
      alignItems:"center",
      marginHorizontal:wp('0%'),

    },
    borderview:
    {
        marginTop:hp(2),
        marginBottom:hp(2),
        alignSelf:'center',
        width:wp(85),
        borderBottomWidth:0.5,
        borderBottomColor:'white'
    },
    useritemtext:
    {
      color: 'white',
      fontWeight: '400',
      fontSize: hp('1.8%'),
      marginBottom:hp(1)
    },
    itemtext:
    {
      color:'white',
      fontWeight: '400',
      fontSize: hp('1.5%'),
      width:wp(74)
    },
    cardtext:
    {
      color:'white',
       fontFamily:'Poppins',
       fontSize:wp('3%'),
       marginRight:10,
    },
  
});
export default DarkModestyles;
