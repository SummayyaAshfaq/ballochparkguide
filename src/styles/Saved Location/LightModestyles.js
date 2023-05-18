import {StyleSheet,Dimensions,Platform} from 'react-native';

/////////////////app styles & colors/////////////
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const {width: screenWidth} = Dimensions.get('window');
const LightModestyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white'
    },
    item: {
      width: screenWidth - 60,
      height: screenWidth - 60,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    renderviews:
    {
        width:wp(12),
            height:hp(6),
            backgroundColor:Colors.Appthemecolorprimary,
     borderRadius:wp(3)
    },
    card: {
      flexDirection:'row',
      elevation: 2,
      backgroundColor: "#FFF",
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
      marginLeft:wp(12.5),
      // /marginLeft: -15
    },
    cardImage: {
//position:'absolute',
width: wp(35),
height: hp(18),
alignSelf: "center",
borderRadius:10,
marginLeft: wp(-8)

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

      color: "#444",
      width:wp(46),
      height:hp(10),
      textAlign:'left',
      fontSize:hp(1.6),
      marginTop:hp(1)
    },
  });
export default LightModestyles;
