import React, { useRef,useState,useEffect }from "react";
import { Text, SafeAreaView, View} from "react-native";
 import { TextInput,Avatar } from 'react-native-paper'

  ////////////////app components////////////////
import CustomButton from "../Button/CustomButton";
import AddedtosaveBottomSheet from "./AddtoSave";

/////////////////app pakages//////////////
import RBSheet from "react-native-raw-bottom-sheet";

//////////////////app pakages////////////
import {Snackbar } from 'react-native-paper';

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

const FindingsBottomSheet= (props) => {

    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

        //ReviewAdded state and funnction
        const refRBSheetSaveAdded = useRef();  

           ///////////////button states/////////////
   const [loading, setloading] = useState(0);
   const [disable, setdisable] = useState(0);
   const [visible, setVisible] = useState(false);
   const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
   const onDismissSnackBar = () => setVisible(false);
        
///////////////Data states/////////
        const [Findings,  setFindings] = React.useState('');
 //////////////////////Api Calling/////////////////
 const AddFindings = async() => {
  var user= await AsyncStorage.getItem('Userid')
  console.log("userid:",user,props.LocationID)
 
    axios({
      method: 'POST',
      url: BASE_URL + 'findings/addFindings',
      data: {
        location_id: props.LocationID,
        userId: user,
        findings: Findings
      },
    })
      .then(function (response) {
        console.log("response", JSON.stringify(response.data))
        setloading(0);
        setdisable(0);
        refRBSheetSaveAdded.current.open()

      })
      .catch(function (error) {
        console.log("error", error)
      })
  }
  //Api form validation
const formValidation = async () => {
  // input validation
  if (Findings == '') {
    setsnackbarValue({value: "Please Enter Findings", color: 'red'});
    setVisible('true');
  }
  else{
    setloading(1);
    setdisable(1);
    AddFindings()
  }
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
          onChangeText={setFindings}
      style={[styles.papertextArea,{backgroundColor: theme === false? 'white':'rgba(52, 52, 52, 0.5)',
      //color:theme === false? 'white':'rgba(52, 52, 52, 0.5)',
   // color: theme === false? ''
    }]}
      mode={'outlined'}
      outlineColor={Colors.Appthemecolorprimary}
      activeOutlineColor={Colors.Appthemecolorprimary}
      placeholder="Add Your Findings"
      numberOfLines={10}
      multiline={true}
      placeholderTextColor={ theme === false?"black":'white'}
      theme={{ colors }}
      //textColor={theme === false?"black":'white'}
      //theme={{ color: 'grey'}}
    />
  </View>
  <View style={styles.button}>
            <CustomButton
              title={'Add'}
              widthset={'80%'}
              iscolor={'here'}
              loading={loading}
              disabled={disable}
            onPress={()=>{
              formValidation()
         
            }}
            /></View> 
      
          </View>

                    <AddedtosaveBottomSheet
              refRBSheet={refRBSheetSaveAdded}
              onClose={() => {refRBSheetSaveAdded.current.close(),props.refRBSheet.current.close()}}
              title={'Findings Added to Sucessfully'}
            />
                  <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom:'20%',
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>
      </RBSheet>

  );
};


export default FindingsBottomSheet;