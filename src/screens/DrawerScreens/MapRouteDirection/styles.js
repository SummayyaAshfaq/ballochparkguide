import React from 'react';
import {StyleSheet} from 'react-native';

///////////////////////app color//////////////////
import Colors from '../../../utils/Colors';

////////////////app height and width///////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

///////////////////app fonts//////////////
import {fontFamily} from '../../../constant/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 10,
    height: hp(100),
    width: wp(100),
    zIndex: 10,
  },

  tripbtn: {
    width: wp(35),
    height: hp(6),
    backgroundColor: Colors.Appthemeorangecolor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
    flexDirection: 'row',
  },
  triptext: {
    fontSize: hp(1.6),
    color: 'white',
    fontFamily: fontFamily.Poppins_Regular,
    marginLeft: wp(3),
  },
  image: {
    height: wp(14),
    width: wp(14),
    borderRadius: 80,
  },
  canceltext: {
    fontSize: hp(1.6),
    color: '#797979',
    fontFamily: fontFamily.Poppins_Medium,
  },

  /////////////////route/////////////////
  container1: {
    flex: 1,
    backgroundColor: 'white',
  },
  // container: {
  // marginTop:'25%',
  // ...StyleSheet.absoluteFillObject,
  // height: hp('85%'),
  // width: wp(100),
  // justifyContent: 'flex-end',
  // alignItems: 'center',
  // backgroundColor: 'white',
  // },
  map: {
    ...StyleSheet.absoluteFillObject,
    //position:'absolute',
    //backgroundColor:'white'
  },
});
export default styles;
