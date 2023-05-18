import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 150;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const styles = StyleSheet.create({
    container: {
      flex: 1,
       // position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
        height:hp('100%'),
        width:wp('100%'),
        alignItems: 'center',
        //backgroundColor:'white',
        zIndex: 10
        //justifyContent: 'flex-end',
      },
      map: {
        flex: 1,
      },
      mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      marker: {
        height: hp(5),
        width: wp(5),
      },
      balancetext:
      {
        color: 'black',
        fontWeight: '600',
        fontSize: hp('3%'),
      },
      predefinedPlacesDescription: {
        color: '#1faadb',
      },
      listView: {
        elevation: 3,
        zIndex: 100,
        position: 'absolute',
        top: 70,
        width:wp(90),
        alignSelf:'center',
        color:"black"
      },
      desc:
      {
        color:"black",
        fontSize:hp('1.6%'),
        fontWeight:'500'
      },
      locationInput: {
      borderWidth: 1,
      borderColor: '#E8E8E8',
      margin: 5,
      //borderRadius:20,
      width:wp(90),
      marginHorizontal: 15,
      justifyContent: 'center',
      height:hp(2)
      },
      inputTextStyles: {
      color: 'black',
      fontFamily: 'Poppins-Regular',
      width: wp(80),
      textAlignVertical: 'center',
      paddingTop: 10
      },
      buttontext:
      {
        color: 'black',
        fontWeight: '600',
        fontSize: hp('2.5%'),
      },
      buttonview:
   
        {
          borderColor:'black',borderWidth:0,
          marginTop:wp('10%'),
          width:wp('40%'),
        alignItems:'center',
        alignSelf:'center',borderRadius:50,
        height:hp('6.5%'),
        justifyContent:'center',backgroundColor:Colors.Appthemecolor
        },
        searchBox: {
          position:'absolute', 
          marginTop: Platform.OS === 'ios' ? 40 : 20, 
          flexDirection:"row",
          backgroundColor: '#fff',
          width: '90%',
          alignSelf:'center',
          borderRadius: 5,
          padding: 10,
          shadowColor: '#ccc',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 10,
        },
        card: {
          flexDirection:'row',
          elevation: 2,
          backgroundColor: "#FFF",
          marginRight:wp(3),
          shadowColor: "#000",
          shadowRadius: 6,
          shadowOpacity: 0.5,
          shadowOffset: { x: 2, y: -2 },
          height: hp(10),
          width: wp(46),
          overflow: "hidden",
          borderRadius:wp(3)
        },
        cardImage: {
          flex: 1,
          width: wp(10),
          height: hp(10),
          alignSelf: "center",
  
        },
        textContent: {
          flex: 2,
          padding: 10,
        },
        cardtitle: {
          fontSize: hp(2),
          color:'black',
          // marginTop: 5,
          fontWeight: "bold",
        },
        cardDescription: {
          fontSize:hp(1.8),
          fontWeight:'500',
          color: "#444",
          width:wp(38),
          textAlign:'center'
        },
        lastView: {
          marginHorizontal: 10,
          position: "absolute",
          flexDirection:'row',
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: hp(3),
        },
        endPadding: {
          paddingRight: width - CARD_WIDTH,
        },
        titleText: {
          fontSize: 22,
          textAlign: 'center',
          fontWeight: 'bold',
        },
        textStyle: {
          textAlign: 'center',
          marginTop: 10,
        },
  });
  export default styles;
  