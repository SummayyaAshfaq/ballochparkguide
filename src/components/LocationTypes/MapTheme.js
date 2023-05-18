import React, { useRef,useState,useEffect }from "react";
import { Text, SafeAreaView, View,TouchableOpacity,FlatList,
  KeyboardAvoidingView,} from "react-native";
 import { TextInput,Avatar } from 'react-native-paper';
  ////////////////app components////////////////
import CustomButton from "../Button/CustomButton";

/////////////////app pakages//////////////
import RBSheet from "react-native-raw-bottom-sheet";

//////////////////pickers///////////////
import ImagePicker from 'react-native-image-crop-picker';

////////////app icons///////////////
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'

////////////app styles///////////////
import styles from "./styles";
import Colors from "../../utils/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

////////////////app redux///////////
import { useSelector, useDispatch } from 'react-redux';
import { setMapTheme } from "../../redux/actions";

const MapThemeBottomSheet= (props) => {

    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();  

  return (
      <RBSheet
         //sstyle={{flex:1}}
         ref={props.refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.9)',
          },
          draggableIcon: 
          {
             backgroundColor: theme ===false? 'white':'black'
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius:20,
            height: hp(30),
            backgroundColor: theme ===false? 'white':'black'
        }
        }}
      >
<View style={{flexDirection:'row'}}>
<TouchableOpacity onPress={()=> dispatch(setMapTheme('standard'))}>
      <View style={styles.Topicsview}>
      <View style={styles.SeeView}>
      <Text style={styles.Seetext} onPress={()=>navigation.navigate('SeeAll',{catname:'Popular'})}>View All</Text>
      </View>
      <Text style={styles.sidetext}>Default</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> dispatch(setMapTheme('satellite'))}>
      <View style={styles.Topicsview}>
      <View style={styles.SeeView}>
      <Text style={styles.Seetext} onPress={()=>navigation.navigate('SeeAll',{catname:'Popular'})}>View All</Text>
      </View>
      <Text style={styles.sidetext}>Satellite</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> dispatch(setMapTheme('terrain'))}>
      <View style={styles.Topicsview}>
      <View style={styles.SeeView}>
      <Text style={styles.Seetext} onPress={()=>navigation.navigate('SeeAll',{catname:'Popular'})}>View All</Text>
      </View>
      <Text style={styles.sidetext}>Terrain</Text>
      </View>
      </TouchableOpacity>
</View>
      </RBSheet>

  );
};


export default MapThemeBottomSheet;