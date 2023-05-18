import * as React from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';
import Colors from '../../utils/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const CustomButton = ({
    icon,
    mode,
    title,
    onPress,
    loading,
    disable,
    widthset,
    iscolor
}) => {
    return(
<View style={styles.container}>
  <Button 
    uppercase={false}
  color={[iscolor==='splash'?Colors.Appthemecolorsecondary:Colors.Appthemecolorprimary]}
  icon={icon} 
  mode={mode}
  contentStyle={[styles.buttoncontent,{width:wp(widthset),
  backgroundColor:iscolor==='splash'?Colors.Appthemecolorsecondary:Colors.Appthemecolorprimary,
color:iscolor==='splash'?Colors.Appthemecolorsecondary:Colors.Appthemecolorprimary}]}
  style={[styles.button,{width:wp(widthset),
    backgroundColor:iscolor==='splash'?Colors.Appthemecolorsecondary:Colors.Appthemecolorprimary}]}
  labelStyle={[styles.label,{color:iscolor==='splash'?Colors.Appthemecolorprimary:Colors.Appthemecolorsecondary,
     backgroundColor:iscolor==='splash'?Colors.Appthemecolorsecondary:Colors.Appthemecolorprimary}]}
  onPress={onPress}
  disabled={disable}
  loading={loading}
  >
    {title}
    {/* {Loading ? (
    <ActivityIndicator color="white" />
  ) : (
    <Text>{title}</Text>
  )} */}
  </Button>
  </View>
    )
};

export default CustomButton;