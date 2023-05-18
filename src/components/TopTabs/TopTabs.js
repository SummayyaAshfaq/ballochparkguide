import * as React from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const TabsBadgeView = (props) => {
  console.log('props',props)
    return(
<View style={styles.container}>
<View style={{
  //backgroundColor: theme === false? 'white':'rgba(52, 52, 52, 0.5)',
  //backgroundColor:props.state===true?Colors.Appthemecolorprimary:Colors.inputcolor,
                        alignItems:'center',height:wp('10%'),justifyContent:'center'
,                        //borderRadius:props.state===true?20:20,
width:wp(props.width)
}}>
                        <Text style={{color:props.state===true?Colors.Appthemecolorprimary:Colors.AppgreyColor,
                        fontWeight:props.state===true?"800":"400"}}>
                            {props.title}</Text>
                        </View>
  </View>
    )
};

export default TabsBadgeView;