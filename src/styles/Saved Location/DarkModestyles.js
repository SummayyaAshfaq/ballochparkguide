import {StyleSheet,Dimensions,Platform} from 'react-native';

/////////////////app styles & colors/////////////
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const {width: screenWidth} = Dimensions.get('window');
const DarkModestyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'black'
    },
 
    card: {
      flexDirection:'row',
      elevation: 2,
      marginHorizontal: wp(7),
      shadowColor: "#000",
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: -2 },
      height: hp(20),
      width: wp(83),
      overflow:"visible",
      borderRadius:wp(2),
      marginBottom:hp(2),               
      alignSelf:'center',
      marginLeft:wp(12),
      backgroundColor:'rgba(52, 52, 52, 0.7)',
      // /marginLeft: -15
    },
    cardImage: {
 
      width: wp(35),
      height: hp(18),
      alignSelf: "center",
      borderRadius:10,
      marginLeft: wp(-8),
    },
    textContent: {
      flex: 2,
      padding: 10,

    },
    cardtitle: {
      fontSize: hp(2),
      color:'white',
      // marginTop: 5,
      fontWeight: "bold",
    },
    cardDescription: {
     
      color: "white",
      width:wp(46),
      height:hp(10),
      textAlign:'left',
      fontSize:hp(1.6),
      marginTop:hp(1)
    },
  });
export default DarkModestyles;
