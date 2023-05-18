import React, { useRef,useState,useEffect }from "react";
import { Text, SafeAreaView, View,TouchableOpacity,
  KeyboardAvoidingView,} from "react-native";
 import { TextInput,Avatar } from 'react-native-paper';

 import { useNavigation  } from '@react-navigation/native';

  ////////////////app components////////////////
import CustomButton from "../Button/CustomButton";
import CamerBottomSheet from "../CameraBottomSheet/CameraBottomSheet";
import AddedtosaveBottomSheet from "./AddtoSave";

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

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from "../../utils/ApiRootUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditFindingsBottomSheet= (props) => {
    const navigation = useNavigation();
    
    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

        //ReviewAdded state and funnction
        const refRBSheetSaveAdded = useRef();  
        
///////////////Data states/////////
        const [Findings,  setFindings] = React.useState(props.findingtext);
 //////////////////////Api Calling/////////////////
 const EditFindings = async() => {
  var user= await AsyncStorage.getItem('Userid')
  console.log("userid:",user,props.LocationID,props.findingID)
 
    axios({
      method: 'PUT',
      url: BASE_URL + 'findings/updateFindings',
      data: {
        location_id: props.LocationID,
        userId: user,
        findings: Findings,
        findingsId : props.findingID,
      },
    })
      .then(function (response) {
        console.log("response", JSON.stringify(response.data))
        refRBSheetSaveAdded.current.open()

      })
      .catch(function (error) {
        console.log("error", error)
      })
  }

  const colors = {
    text: theme === false ?'black' :'white' , // set text color here
    primary: '#6200ee',
    background: '#ffffff',
  };
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
            height: hp(50),
            backgroundColor: theme ===false? 'white':'black'
        }
        }}

      >

         <View style={{flexDirection:'column', marginHorizontal:20,marginVertical:20}}>

<View style={styles.textAreaContainer}>
    <TextInput
          onChangeText={(text)=>setFindings(text)}
          value={Findings}
      style={[styles.papertextArea,,{  backgroundColor: theme === false? 'white':'rgba(52, 52, 52, 0.5)',  
          //color:theme === false? 'white':'rgba(52, 52, 52, 0.5)',
        }]}
      mode={'outlined' }
      color={theme === false? 'white':'rgba(52, 52, 52, 0.5)'}
      outlineColor={Colors.Appthemecolorprimary}
      activeOutlineColor={Colors.Appthemecolorprimary}
      placeholder={props.findingtext}
      numberOfLines={10}
      multiline={true}
      placeholderTextColor={ theme === false?"black":'white'}
      //textColor={theme === false?"black":'white'}
      theme={{ colors }}
     // theme={{ color: 'grey'}}
    />
  </View>
  <View style={styles.button}>
            <CustomButton
              title={'Edit'}
              widthset={'80%'}
              iscolor={'here'}
            //   loading={loading}
            //   disabled={disable}
            onPress={()=>{
              EditFindings()
         
            }}
            /></View> 
      
          </View>

                    <AddedtosaveBottomSheet
              refRBSheet={refRBSheetSaveAdded}
              onClose={() => {refRBSheetSaveAdded.current.close(),props.refRBSheet.current.close(),
              navigation.navigate("LocationDetail")}}
              title={'Findings Edit Sucessfully'}
            />
      </RBSheet>

  );
};


export default EditFindingsBottomSheet;