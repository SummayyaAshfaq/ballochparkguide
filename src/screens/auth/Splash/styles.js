import { 
    StyleSheet
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
import Colors from '../../../utils/Colors';

 const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal:'5%'
    },
    imageview:
    {
        height:hp(60),
        width:wp(100),
    },
    image: {
        height:hp(60),
        width:wp(100),
       // backgroundColor:"red"
    },
    maintextview: {
   alignItems:"center",
   marginTop:wp(18)
    },
    maintext: {
        color:Colors.Appthemecolor,
        fontSize:hp(3.5),
        fontWeight:"bold",
        fontFamily:"Sen"
         },
         subtextview: {
            alignItems:"center",
            marginTop:wp(2),
            width:wp(70),
            alignSelf:"center"
             },
             subtext: {
                 color:Colors.Appthemecolor,
                 fontSize:hp(1.6),
                 fontWeight:"400",
                 fontFamily:"Poppins",
                 textAlign:'center'
                  },
                  buttonview:
                  {
          marginBottom:wp(5)
                    //marginTop: hp('0.5%'),
                  },
                  outlinebuttonview:
                  {
                marginBottom:wp(5)
                    //marginTop: hp('0.5%'),
                  },
  });
  export default styles;