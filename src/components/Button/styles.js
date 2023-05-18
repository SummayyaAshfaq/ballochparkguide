import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    container:
    {
alignSelf:'center',
    },
buttoncontent:
{
    height: hp('6.2%'),
    backgroundColor:Colors.Appthemecolorsecondary,
    padding:0,
    color:Colors.Appthemecolorsecondary
},
button:
{
    borderRadius:6,
    height: hp('6.2%'),
    alignItems:'center',
    backgroundColor:Colors.Appthemecolorsecondary,
},
label:
{
    color:Colors.Appthemecolorprimary,
    width:hp('100%'),
    fontSize: hp('2%') ,
    fontWeight:'bold',
    backgroundColor:Colors.Appthemecolorsecondary,
},
buttoncontent1:
{
    height: hp('6.2%'),
    padding:0,
    color:'white',
},
button1:
{
    borderRadius:6,
    height: hp('6.2%'),
    alignItems:'center',
    borderWidth:1,
    borderColor:Colors.Appthemecolorprimary,
    color:'white'
},
label1:
{
    color:Colors.Appthemecolorprimary,
    fontSize: hp('2%') ,
    fontWeight:'bold',
}
  });
  export default styles;
  