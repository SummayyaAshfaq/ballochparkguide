import {StyleSheet,Dimensions,Platform} from 'react-native';

/////////////////app styles & colors/////////////
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {

     backgroundColor:'white'
    },
    item: {
      width: screenWidth - 60,
      height: screenWidth - 20,
    },
    imageContainer: {
      height: screenWidth - 20,
      //marginBottom: Platform.select({ios: 0, android: 0}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 0,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
  
      resizeMode: 'cover',
    },
  });
export default styles;
