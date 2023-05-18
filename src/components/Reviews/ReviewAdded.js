import React, { useRef,useState,useEffect }from "react";
import { Text, SafeAreaView, View,TouchableOpacity,Image,
  KeyboardAvoidingView,} from "react-native";
 import { TextInput,Avatar } from 'react-native-paper';
  ////////////////app components////////////////
import CustomButton from "../Button/CustomButton";
import CamerBottomSheet from "../CameraBottomSheet/CameraBottomSheet";

/////////////////app pakages//////////////
import RBSheet from "react-native-raw-bottom-sheet";

//////////////////pickers///////////////
import ImagePicker from 'react-native-image-crop-picker';

////////////app icons///////////////
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons'


////////////////app redux///////////
import { useSelector } from 'react-redux';

////////////app styles///////////////
import styles from "./styles";
import Colors from "../../utils/Colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';


  

const ReviewsAddedBottomSheet= (props) => {

    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

  return (
    // <View style={[styles.container,{ backgroundColor: theme ===false? 'white':'black'}]}>
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
            height: hp(40),
            backgroundColor: theme ===false? 'white':'black'
        }
        }}

      >

         <View style={{flexDirection:'column', marginHorizontal:20,marginVertical:20}}>
     
         <View style={{alignItems:'center',
   justifyContent:'center',
   marginHorizontal:wp(0)}}>
             <Image 
                  source={require("../../assets/reviews/check-circle.png") }
                  style={{height:hp(16),width:wp(30)}}
                  resizeMode='contain'
                />
       <Text style={[styles.belowtext,{color:theme === false?'black':'white'}]}>{props.title}</Text>
   </View>

  <View style={styles.button}>
            <CustomButton
              title={'Go Back'}
              widthset={'80%'}
              iscolor={'here'}
            //   loading={loading}
            //   disabled={disable}
            onPress={
              props.onClose
              //navigation.navigate('Reviews')
            }
            /></View> 
      
          </View>

      </RBSheet>

    // </View>
  );
};


export default ReviewsAddedBottomSheet;