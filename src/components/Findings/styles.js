import {StyleSheet,Dimensions} from 'react-native';
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
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
color:'black'
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
  fontSize:hp(2),
      fontWeight:'400',
      marginTop:hp(1)
},
});
export default styles;
