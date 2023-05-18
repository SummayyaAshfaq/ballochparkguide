import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const LightModestyles = StyleSheet.create({
  container:
  {
    flex: 1,
backgroundColor:'white',
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
    //justifyContent:'space-between',
    //alignItems:"center",
    marginHorizontal:wp('0%'),

  },
  borderview:
  {
    marginTop:hp(0.2),
    marginBottom:hp(2),
    alignSelf:'center',
    width:wp(85),
      borderBottomWidth:0.5,
      borderBottomColor:Colors.AppgreyColor
  },
  useritemtext:
  {
    color: 'black',
    fontWeight: '400',
    fontSize: hp('1.8%'),
    marginBottom:hp(1)
  },
  itemtext:
  {
    color:'black',
    fontWeight: '400',
    fontSize: hp('1.5%'),
    width:wp(74)
  },
  cardtext:
  {
    color:'black',
     fontFamily:'Poppins',
     fontSize:wp('3%'),
     marginRight:10,
  },
  button:
  {
    position:'absolute',
alignSelf:'center',
  marginBottom:wp(10),
    marginTop: hp(90),
  },

});
export default LightModestyles;
