import React, {useState} from 'react';
import {View, TouchableOpacity,Text} from 'react-native';
import {TextInput, Avatar} from 'react-native-paper';

////////////////app components////////////////
import CustomButton from '../Button/CustomButton';

/////////////////app pakages//////////////
import RBSheet from 'react-native-raw-bottom-sheet';

////////////////app redux///////////
import {useSelector,useDispatch} from 'react-redux';
import { setCarColor,setCarPlate,setCarParkingStatus } from '../../redux/actions';

////////////app styles///////////////
import styles from './styles';
import Colors from '../../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utils/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FindMyCarBottomSheet = props => {
  ////////////////////redux/////////////////////
  const {theme} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  /////////////data states///////////////
  const [platenumber, setPlateNumber] = useState();
  const [carcolor, setCarColor] = useState();

  //////////////////////Api Calling/////////////////
  const AddCarParking = async () => {
    var user = await AsyncStorage.getItem('Userid');

    const now = new Date();
    const isoDateTimeString = now.toISOString();
    console.log(isoDateTimeString);
    console.log("here in parking details",user,isoDateTimeString,platenumber,props.Location_Title,props.Location_Desc,props.LocationID,carcolor)
    axios({
      method: 'POST',
      url: BASE_URL + 'parking/parkVehicle',
      data: {
        userId: user,
        parkTime: isoDateTimeString,
        plateNumber: platenumber,
        lane_number: "1",
        parkingDetails:props.Location_Desc,
        parking_id: props.LocationID,
        carColor: carcolor,
      },
    })
      .then(function (response) {
        console.log("here in parking details",response.data)
        props.onpressdone()
        //dispatch(setCarParkingStatus(true))
        props.refRBSheet.current.close();
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const colors = {
    text: theme === false ?'black' :'white' , // set text color here
    primary: '#6200ee',
    background: '#ffffff',
  };

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
        draggableIcon: {
          backgroundColor: theme === false ? 'white' : 'black',
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: hp(45),
          backgroundColor: theme === false ? 'white' : 'black',
        },
      }}>
      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: wp(5),
          marginVertical: hp(1),
        }}>
          {/* <Text style={{color:'white',fontSize:14}}>{theme}</Text> */}
        <TextInput
          //label="Enter Your Name"
          //value={platenumber}
          onChangeText={setPlateNumber}
          style={[
            styles.paperinput,
            {
              backgroundColor:
                theme === false ? 'white' : 'rgba(52, 52, 52, 0.5)',
               // color: theme === false ?'black' : 'white',
            },
          ]}
          mode={'outlined'}
          outlineColor={Colors.Appthemecolorprimary}
          activeOutlineColor={Colors.Appthemecolorprimary}
          placeholder="Car Plate Number "
          placeholderTextColor={theme === false ? 'black' : 'white'}
          theme={{ colors }}
          //textColor={theme === false ?'white':'black'}
          //theme={{color: theme === false ? 'white':'black' }}
        />
          <TextInput
            //label="Enter Your Name"
            //value={carcolor}
            onChangeText={setCarColor}
            style={[
              styles.paperinput,
              {
                backgroundColor:
                  theme === false ? 'white' : 'rgba(52, 52, 52, 0.5)',
                color: theme === false ? 'white' : 'rgba(52, 52, 52, 0.5)',
              },
            ]}
            mode={'outlined'}
            color={theme === false ? 'white' : 'rgba(52, 52, 52, 0.5)'}
            outlineColor={Colors.Appthemecolorprimary}
            activeOutlineColor={Colors.Appthemecolorprimary}
            placeholder="Car Color"
            placeholderTextColor={theme === false ? 'black' : 'white'}
            textColor={theme === false ? 'black' : 'white'}
            theme={{ colors }}
            //theme={{color: 'grey'}}
          />
        <View style={styles.button}>
          <CustomButton
            title={'Add'}
            widthset={'80%'}
            iscolor={'here'}
            //   loading={loading}
            //   disabled={disable}
            onPress={()=>{AddCarParking(),props.onpressdone()}}
          />
        </View>
      </View>
    </RBSheet>

    // </View>
  );
};

export default FindMyCarBottomSheet;
