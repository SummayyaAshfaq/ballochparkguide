import React, { useRef,useState,useEffect }from "react";
import { Text, SafeAreaView, View,TouchableOpacity,TouchableWithoutFeedback,Keyboard,
  KeyboardAvoidingView,} from "react-native";
 import { TextInput,Avatar } from 'react-native-paper';
  ////////////////app components////////////////
import CustomButton from "../Button/CustomButton";
import CamerBottomSheet from "../CameraBottomSheet/CameraBottomSheet";
import ReviewsAddedBottomSheet from "./ReviewAdded";

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

const ReviewsBottomSheet= (props) => {
  console.log('here props:',props)

    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

        //ReviewAdded state and funnction
        const refRBSheetReviewAdded = useRef();    

    //camera state and funnction
    const refRBSheet = useRef();    

    
///////////picker state/////////
const[image,setImage]=useState('')
const[shownimage,setShownImage]=useState('')

 //////////////////////cameraimage//////////////////
 const takePhotoFromCamera = () => {

  ImagePicker.openCamera({
    compressImageMaxWidth: 300,
    compressImageMaxHeight: 300,
    cropping: true,
    compressImageQuality: 0.7
  }).then(image => {
   
    console.log(image);
    setShownImage(image.path);
    let newfile = {
      uri: image.path,
      type: image.mime,
      name: image.path.substring(image.path.lastIndexOf('/') + 1)
    }
    setImage(newfile);
    refRBSheet.current.close()
  });
  }
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: true,
    compressImageQuality: 0.7
  }).then(image => {
    console.log(image);
    setShownImage(image.path);
    //setImage(image);
    let newfile = {
      uri: image.path,
      type: image.mime,
      name: image.path.substring(image.path.lastIndexOf('/') + 1)
    }
    setImage(newfile);
    refRBSheet.current.close()
  });
  }


  ///////////////data states////////////////////
  const [username, setUserName] = React.useState();
  const [ReviewDesc,  setReviewDesc] = React.useState();

 //////////////////////Api Calling/////////////////
 const AddReviews = async() => {
  var user= await AsyncStorage.getItem('Userid')
  console.log("userid:",user,image)
  let newfile = {
    uri: 'image',
    type: 'mime',
    name: 'noimage'
  }
  var data = new FormData();
  data.append('user_id', user);
  data.append('location_id', props.LOCID);
  data.append('name', username);
  data.append('review', image === ''?'no '+ReviewDesc:ReviewDesc);
  data.append('picture', image); 
  console.log("userid data:",data)
  var config = {
    method: 'post',
    url: BASE_URL+ 'reviews/createReview',
    headers: {
      'Content-Type': `multipart/form-data`,
  },
    data : data
  };
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    refRBSheetReviewAdded.current.open()
  })
    // axios({
    //   method: 'POST',
    //   url: BASE_URL + 'reviews/createReview',
    //   data: data,
    // })
    //   .then(function (response) {
    //     console.log("Reviews Api response here", JSON.stringify(response.data))
    //     // refRBSheetReviewAdded.current.open()
    //   })
      .catch(function (error) {
        console.log("error", error)
      })
  }
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
            height: hp(80),
            backgroundColor: theme ===false? 'white':'black'
        }
        }}

      >


         <View style={{flexDirection:'column', marginHorizontal:20,marginVertical:20}}>
         <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
         {/* <View >
          <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        placeholderTextColor={'grey'}

      />
          </View> */}
        <TouchableOpacity onPress={()=> refRBSheet.current.open()}
      style={{
      alignItems: 'center',justifyContent:'center',width:wp(30),alignSelf:'center',borderRadius:wp(14)
      }}
      >
        <Avatar.Image
            source={{uri:shownimage}}
          style={{backgroundColor:'white',borderColor:'grey',borderWidth:0.7}}
          size={120}
        />
  
          <Ionicons
          name='camera'
          color={Colors.Appthemecolorprimary}
          size={25}
          //onPress={() => refRBSheet.current.open()}
          style={{position:'absolute'}}
        />
      </TouchableOpacity>
     {/* { theme === true? 
              <TextInput
              //label="Enter Your Name"
              onChangeText={setUserName}
              style={[styles.paperinput,{  backgroundColor: 'rgba(52, 52, 52, 0.5)'}]}
              mode={'outlined' }
              outlineColor={Colors.Appthemecolorprimary}
              activeOutlineColor={Colors.Appthemecolorprimary}
              placeholder="Enter Your Name"
              placeholderTextColor={"white"}
              theme={{color: 'white'}}
              // value={text}
              // onChangeText={text => setText(text)}
            />:
            <TextInput
            //label="Enter Your Name"
            onChangeText={setUserName}
            style={[styles.paperinput,{  backgroundColor: theme === false? 'white':'rgba(52, 52, 52, 0.5)'}]}
            mode={'outlined' }
            outlineColor={Colors.Appthemecolorprimary}
            activeOutlineColor={Colors.Appthemecolorprimary}
            placeholder="Enter Your Name"
            placeholderTextColor={'white'}
            theme={{color: 'white'}}
            // value={text}
            // onChangeText={text => setText(text)}
          />
    } */}
         <TextInput
      //label="Enter Your Name"
      onChangeText={setUserName}
      style={[styles.paperinput,{  backgroundColor: theme === false? 'white':'rgba(52, 52, 52, 0.5)'}]}
      mode={'outlined' }
      outlineColor={Colors.Appthemecolorprimary}
      activeOutlineColor={Colors.Appthemecolorprimary}
      placeholder="Enter Your Name"
      placeholderTextColor={ theme === false?"black":'white'}
      // value={text}
      // onChangeText={text => setText(text)}
    />
<View style={styles.textAreaContainer} >
    <TextInput
    onChangeText={setReviewDesc}
      style={[styles.papertextArea,{  backgroundColor: theme === false? 'white':'rgba(52, 52, 52, 0.5)',
      color: theme === false? 'white':'rgba(52, 52, 52, 0.5)'}]}
      color={ theme === false? 'white':'rgba(52, 52, 52, 0.5)'}
      mode={'outlined' }
      outlineColor={Colors.Appthemecolorprimary}
      activeOutlineColor={Colors.Appthemecolorprimary}
      placeholder="Add Your Review"
      placeholderTextColor={ theme === false?"black":'white'}
      numberOfLines={10}
      multiline={true}
    />
  </View>
  <View style={styles.button}>
            <CustomButton
              title={'Add'}
              widthset={'80%'}
              iscolor={'here'}
            //   loading={loading}
            //   disabled={disable}
            onPress={()=>{
              AddReviews()
            }}
            /></View> 
      </TouchableOpacity>
          </View>
          <CamerBottomSheet
              refRBSheet={refRBSheet}
              onClose={() => refRBSheet.current.close()}
              title={'Gallery'}
              takePhotoFromCamera={takePhotoFromCamera}
              choosePhotoFromLibrary={choosePhotoFromLibrary}
            />
                    <ReviewsAddedBottomSheet
              refRBSheet={refRBSheetReviewAdded}
              onClose={() => {refRBSheetReviewAdded.current.close(),props.refRBSheet.current.close()}}
              onCloseReviewBTM={()=> props.refRBSheet.current.close()}
              title={'Review Added'}
            />

      </RBSheet>

    // </View>
  );
};


export default ReviewsBottomSheet;