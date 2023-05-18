import {StyleSheet,Dimensions,Platform} from 'react-native';

/////////////////app styles & colors/////////////
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const {width: screenWidth} = Dimensions.get('window');

const DarkModestyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black',

    },
    drawerContent: {
        flex: 1,
        backgroundColor:'black'
    },
    contentmaintext:
    {
        color: 'white',
  
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
export default DarkModestyles;