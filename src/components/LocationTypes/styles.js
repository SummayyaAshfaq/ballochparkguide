import {StyleSheet,Dimensions} from 'react-native';
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({
  container:
  {
    backgroundColor:'white',
    flex:1,
    paddingVertical:wp('10%'),
    paddingHorizontal:wp('5%'),
  },

  input: {
    height:hp('7%'),
    width:wp('90%'),
    padding: 10,
    borderRadius:wp(2),
    marginTop:15,
    marginBottom:10,
    color:'black',
    borderColor:'whitesmoke',
    borderWidth:2,
backgroundColor:'white'
  },
  paperinput: {
    height:hp('5%'),
    width:wp('90%'),
    padding: 10,
    borderRadius:wp(2),
    marginTop:15,
    marginBottom:10,
    color:'black',
backgroundColor:'white'
  },

  maintext:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    fontFamily: "Montserrat Bold",
  },

  mainview:{
    flexDirection:'row',
    justifyContent: 'space-between' ,
    marginBottom:40,
   
  },
  textAreaContainer: {
    //borderColor:'grey',
    // /borderWidth: 1,
    padding: 5
  },
  textArea: {
    height:hp(20),
    width:wp(90),
    justifyContent: "flex-start",
    borderColor:'whitesmoke',
    borderWidth:2,
backgroundColor:'white',
borderRadius:wp(2),
  },
  papertextArea: {
    height:hp(25),
    width:wp(90),
    justifyContent: "flex-start",
backgroundColor:'white',
borderRadius:wp(5),
  },
  button:
  {

alignSelf:'center',
  marginBottom:wp(6),
    marginTop: hp(6),
  },
  belowtext:
{ 
  color:'white',
  fontSize:hp(1.8),
      fontWeight:'400'
},
Topicsview:{
 marginTop:hp(3),
 flexDirection:'row',
 justifyContent: 'space-between' ,
 marginLeft:wp(3),
 alignItems:"center",
 marginBottom:hp(2),
// paddingVertical:hp(1)
},
SeeView:
{
 borderRadius:25,
 justifyContent:'center',
alignItems:'center',
 // /margin:wp('1.8%'),
 //backgroundColor:'white',
 //borderWidth:1,
 //borderColor:'grey'
},
Seetext:
{
 color:'rgba(53, 53, 53, 1.9)',
 fontSize:hp(1.7),
 //fontFamily: fontFamily.Poppins_SemiBold,
 marginLeft:wp(4.5),
 marginRight:wp(4.5),
 marginBottom:wp(1),
 marginTop:wp(1),
 textAlign:'center'

},
sidetext:{
  fontSize:hp(2.3),
  fontWeight:'bold',
  color:Colors.Appthemecolorprimary,
  fontFamily:fontFamily.Gibson_Bold,
  //fontFamily:fontFamily.Poppins_Medium
},
flatlistmainview:
{
  marginBottom:hp(0),
  marginHorizontal:wp(1),
  alignItems:'center' ,
  borderColor:Colors.greylight,
  borderWidth:1,
  borderRadius:wp(3),
 // backgroundColor:Colors.Appthemecolorprimary
},
textview:
{
  backgroundColor: Colors.Appthemecolorprimary,
  width: wp(28),
  //position: 'absolute',
  bottom:hp(0.1),
  paddingLeft:wp(2),
  padding:wp(1),
  borderBottomLeftRadius:wp(2),
  borderBottomRightRadius:wp(2),
},
flatlisttitletext:
{
   color: 'white',
   width:wp(20),
                    // /fontWeight:'bold',
                    marginTop:hp(0),
                  //  / position:'absolute',
                    bottom:hp(0.2),
                   // textShadowOffset: {width: 5, height: 2},
                    //textShadowRadius: 5,
                    //textShadowColor: 'black'
                    },
                    flatlistsubtitletext:
{
   color: 'white',
   width:wp(20),
                    fontWeight:'400',
                    marginTop:hp(1),
                    position:'absolute',
                    bottom:hp(2.5),
                    textShadowOffset: {width: 2, height: 2},
                    textShadowRadius: 10,
                    textShadowColor: Colors.Appthemecolorprimary,
                    },
                    flatlistimgesview:
                    {
                      height:hp(18),width:wp(26),borderRadius:wp(3)},
                      flatlistimage:
{
  borderTopLeftRadius:wp(2),
  borderTopRightRadius:wp(2),
                       // borderRadius: 15,
                         borderWidth: 1,
                        //borderColor: 'black', 
                        //padding: 10
                      }
});
export default styles;
