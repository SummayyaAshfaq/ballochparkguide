import React from 'react';
import {
  StyleSheet,

} from 'react-native';
import Colors from '../../Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';


const Inputstyles = StyleSheet.create({

  inputview:
  {
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: "white",
    alignContent:"center",
    justifyContent:'center',
    marginTop:wp(12),
  marginBottom:wp(20),
  },
  input:
  {
    backgroundColor: 'white',
     width: '88%', 
     alignSelf: 'center', 
     color: Colors.dargrey ,
    borderRadius: 10,
    fontWeight:'500',
    marginLeft:wp(2)
  },
  action: {
    flexDirection: 'row',
    marginTop:wp(2),
    marginBottom: wp(4),
    borderWidth:1,
    borderColor: Colors.inputbordercolor,
    backgroundColor: 'white',
    width: wp('80%'),
    height: wp('14%'),
    alignSelf: 'center',
    borderRadius: 10,
    paddingLeft: wp('2%'),
    alignItems: 'center'
  },




});
export default Inputstyles;
