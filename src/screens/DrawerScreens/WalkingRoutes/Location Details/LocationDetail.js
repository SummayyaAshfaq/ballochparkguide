import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

///////////////app naviagtion////////////////
import {useIsFocused} from '@react-navigation/native';

///////////app components////////////
import CustomButton from '../../../../components/Button/CustomButton';
import OutlineButton from '../../../../components/Button/OutlineButton';
import ImageSlider from '../../../../components/ImageSlider/ImageSlider';
import CustomHeader from '../../../../components/Header/CustomHeader';
import FindingsBottomSheet from '../../../../components/Findings/Findings';
import FindMyCarBottomSheet from '../../../../components/Findings/FindMyCar';
import EditFindingsBottomSheet from '../../../../components/Findings/EditFindings';
import AddedtosaveBottomSheet from '../../../../components/Findings/AddtoSave';

////////////app Api things////////////
import axios from 'axios';
import {BASE_URL} from '../../../../utils/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////app redux///////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setLOCID,
  setRoute,
  setCarParkingStatus,
} from '../../../../redux/actions';

//////////////app styles////////////////

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app styles///////////
import LightModestyles from '../../../../styles/LocationDetail/LightModestyles';
import DarkModestyles from '../../../../styles/LocationDetail/DarkModestyles';

const LocationDetail = ({navigation, route}) => {
  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  /////////////////prevoius data state////////
  const [predata] = useState(route.params);

  ////////////////////redux/////////////////////
  const {theme, car_plate, car_color, car_parking_status} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();

  //bottomsheets states
  const refRBSheet = useRef();
  const refRBSheetSaveAdded = useRef();
  const refRBSheetUnSaveAdded = useRef();
  const refRBSheetUnPark = useRef();
  const refRBSheetEditFindings = useRef();
  const refFindMyCarRBSheet = useRef();

  //sliderimages
  const [sliderimage, setsliderimage] = useState([]);

  //faltlist state
  const [data, setdata] = useState();
  const [LocationTitle, setLocationTitle] = useState();
  const [LocationDesc, setLocationDesc] = useState();
  const [LocationDistance, setLocationDistance] = useState();
  const [LocationTime, setLocationTime] = useState();
  const [LocationCoords_Lat, setLocationCoords_Lat] = useState();
  const [LocationCoords_Lng, setLocationCoords_Lng] = useState();
  const [findings, setfindings] = useState('');
  const [findingsid, setfindingsID] = useState('');
  const [findparkCarId, setfindParkCarID] = useState('');
  const [findparkCar, setfindParkCar] = useState('');
  const [parkCarTime, setParkCarTime] = useState('');
  const [findparkCarCoord, setfindParkCarCoord] = useState('');

  const [dataloader, setdataloader] = useState(true);

  //get data api calling
  const GetLocationDetail = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationById/' + predata.locid,
    })
      .then(async function (response) {
  
        setdata(response.data.data);
        setLocationTitle(response.data.data.title);
        setLocationDesc(response.data.data.description);
        setLocationDistance(response.data.data.distance);
        setLocationTime(response.data.data.avg_time);
        setLocationCoords_Lat(response.data.data.location.coordinates[1]);
        setLocationCoords_Lng(response.data.data.location.coordinates[0]);
        await AsyncStorage.setItem('Locid', response.data.data._id);
        GetFindingsDetail();
        GetFindParkCar();
        setsliderimage(response.data.data.images);
        setdataloader(false);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  // const handleChange = useCallback((newValue, id) => {
  //   setValues(prods => ({...prods, [id] : newValue }));
  // }, [values]);
  const [findingsmessage, setfindingsmessage] = useState('');
  ///////////findings ststus states
  const [findingsStatus, setfindingsStatus] = useState('');
  const [SavedStatus, setSavedStatus] = useState('');
  //get findings api calling
  const GetFindingsDetail = useCallback(
    async props => {
      var user = await AsyncStorage.getItem('Userid');
      axios({
        method: 'GET',
        url:
          BASE_URL +
          'findings/getUserFindingForLocation/?location_id=' +
          predata.locid +
          '&userId=' +
          user,
      })
        .then(async function (response) {
          console.log("response in location detail findings", JSON.stringify(response.data))
          setfindingsmessage(response.data.result);
          setfindingsID(response.data.result._id);
          setfindings(response.data.result.findings);
          setSavedStatus(response.data.result.savedStatus);
          setfindingsStatus(response.data.result.findingStatus);
        })
        .catch(function (error) {
          console.log('error', error);
        });
    },
    [findings],
  );

  //get findings api calling
  const GetFindParkCar = async props => {
    var user = await AsyncStorage.getItem('Userid');
    console.log('parking userid:', user);
    axios({
      method: 'GET',
      url: BASE_URL + 'parking/getParkingsByUserId/' + user,
    })
      .then(async function (response) {
        console.log(
          'response in parking location detail',
          JSON.stringify(response.data),
        );
        setfindParkCarID(response.data.data._id);
        dispatch(setCarParkingStatus(response.data.data.isParked));
        setfindParkCar(response.data.data.isParked);
        setfindParkCarCoord(response.data.data.parking_id.location.coordinates);
        setParkCarTime(response.data.data.parkTime);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (isfocussed) {
      GetLocationDetail();
      GetFindParkCar();
      GetFindingsDetail();
    }
  }, [isfocussed, findingsStatus, SavedStatus, findings,findparkCarCoord]);

  ///////////////Data states/////////
  const [Findings, setFindings] = React.useState();
  const [saved, setsaved] = React.useState(true);
  //////////////////////Api Calling/////////////////
  const AddSavedLocation = async () => {
    var user = await AsyncStorage.getItem('Userid');

    axios({
      method: 'POST',
      url: BASE_URL + 'findings/addFindings',
      data: {
        location_id: predata.locid,
        userId: user,
        //findings: Findings
      },
    })
      .then(function (response) {
        refRBSheetSaveAdded.current.open();
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const unSavedLocation = async props => {
    axios({
      method: 'DELETE',
      url: BASE_URL + 'findings/deleteFindings/' + props,
    })
      .then(function (response) {
        refRBSheetUnSaveAdded.current.open();
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const togglesavedlocation = props => {
    if (saved === true) {
      AddSavedLocation();
      setsaved(false);
    } else {
      unSavedLocation(props);
      setsaved(true);
    }
  };
  function timeDifference(startTime, endTime) {
    var diff = new Date(endTime - startTime);
    var hours = diff.getUTCHours();
    var minutes = diff.getUTCMinutes();
    var seconds = diff.getUTCSeconds();
    return hours + ':' + minutes + ':' + seconds;
  }
  //////////////////////Api Calling/////////////////
  const UnParkCar = async () => {
    const now = new Date();
    const isoDateTimeString = now.toISOString();
    var startTime = new Date(isoDateTimeString);
    var endTime = new Date(parkCarTime);
    var diff = timeDifference(startTime, endTime);
    axios({
      method: 'PUT',
      url: BASE_URL + 'parking/unPark',
      data: {
        parkingId: findparkCarId,
        unParkTime: isoDateTimeString,
        totalParkingTime: diff,
      },
    })
      .then(function (response) {
        //console.log('response', JSON.stringify(response.data));
        dispatch(setCarParkingStatus(false));
        setfindParkCar(false);
        refRBSheetUnPark.current.open();
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const handleClick = useCallback(() => {
    refFindMyCarRBSheet.current.open(),  
      GetFindParkCar()
  }, [findparkCarCoord]);
  return (
    <SafeAreaView
      style={
        theme === false ? LightModestyles.container : DarkModestyles.container
      }>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <CustomHeader
          headerlabel={
            predata.navplace === 'Walking Routes'
              ? 'Walking Routes'
              : predata.navplace === 'Dogs Walk'
              ? 'Dog Walks'
              : predata.navplace === 'Car Parkings'
              ? 'Car Parking'
              : predata.navplace === 'Toilets'
              ? 'Toilets'
              : predata.navplace === 'Entrance'
              ? 'Entrance'
              : predata.navplace === 'Exit'
              ? 'Exit'
              : predata.navplace === 'WaterSafety'
              ? 'Water Safety'
              : predata.navplace === 'ViewPoints'
              ? 'View Points'
              : predata.navplace === 'Pinic'
              ? 'Pinic and Benches'
              : predata.navplace === 'PlayParks'
              ? 'Play Parks'
              : predata.navplace === 'Nature'
              ? 'Nature'
              : predata.navplace === 'History'
              ? 'History'
              : predata.navplace === 'Garden'
              ? 'Garden'
              : predata.navplace === 'Amenities'
              ? 'Amenities'
              : predata.navplace === 'About'
              ? 'About'
              : predata.navplace === 'Castle'
              ? 'Castle'
              : null
          }
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'chevron-back'}
        />

        {predata.navplace === 'Walking Routes' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Dogs Walk' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Car Parkings' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Toilets' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Entrance' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Exit' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'WaterSafety' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'ViewPoints' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Pinic' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'PlayParks' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Nature' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'History' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Garden' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Amenities' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'About' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : predata.navplace === 'Castle' ? (
          <ImageSlider imagesarray={sliderimage} />
        ) : (
          <ActivityIndicator size={'large'} style={{marginTop: hp(45)}} />
        )}

        {dataloader === true ? (
          <ActivityIndicator size={'large'} style={{marginTop: hp(45)}} />
        ) : (
          <View>
            <View style={{marginHorizontal: wp(5), marginTop: hp(2)}}>
              {predata.navplace === 'Car Parkings' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={
                      theme === false
                        ? LightModestyles.mainheadingtext
                        : DarkModestyles.mainheadingtext
                    }>
                    {LocationTitle}
                  </Text>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginHorizontal: wp(0),
                      }}>
                      <Image
                        source={require('../../../../assets/LocationDetail/Icon-directions.png')}
                        style={LightModestyles.textlasticon}
                        resizeMode="contain"
                      />
                      <Text
                        style={
                          theme === false
                            ? LightModestyles.belowtext
                            : DarkModestyles.belowtext
                        }>
                        {predata.navplace === 'WaterSafety'
                          ? '0'
                          : predata.navplace === 'Entrance'
                          ? '0'
                          : predata.navplace === 'Exit'
                          ? '0'
                          : predata.navplace === 'ViewPoints'
                          ? '0'
                          : predata.navplace === 'Pinic'
                          ? '0'
                          : predata.navplace === 'PlayParks'
                          ? '0'
                          : predata.navplace === 'Nature'
                          ? '0'
                          : predata.navplace === 'Garden'
                          ? '0'
                          : predata.navplace === 'Amenities'
                          ? '0'
                          : predata.navplace === 'Castle'
                          ? '0'
                          : predata.navplace === 'About'
                          ? '0'
                          : predata.navplace === 'History'
                          ? '0'
                          : LocationDistance+' km'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: wp(0),
                      }}>
                      <Image
                        source={require('../../../../assets/LocationDetail/walking.png')}
                        style={LightModestyles.textlasticon}
                        resizeMode="contain"
                      />
                      <Text
                        style={
                          theme === false
                            ? LightModestyles.belowtext
                            : DarkModestyles.belowtext
                        }>
                        {predata.navplace === 'WaterSafety'
                          ? '0'
                          : predata.navplace === 'Entrance'
                          ? '0'
                          : predata.navplace === 'Exit'
                          ? '0'
                          : predata.navplace === 'ViewPoints'
                          ? '0'
                          : predata.navplace === 'Pinic'
                          ? '0'
                          : predata.navplace === 'PlayParks'
                          ? '0'
                          : predata.navplace === 'Nature'
                          ? '0'
                          : predata.navplace === 'Garden'
                          ? '0'
                          : predata.navplace === 'Amenities'
                          ? '0'
                          : predata.navplace === 'Castle'
                          ? '0'
                          : predata.navplace === 'About'
                          ? '0'
                          : predata.navplace === 'History'
                          ? '0'
                          : LocationTime+ ' min'}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <Text
                  style={
                    theme === false
                      ? LightModestyles.mainheadingtext
                      : DarkModestyles.mainheadingtext
                  }>
                  {LocationTitle}
                </Text>
              )}
              <View style={{marginVertical: 10}}>
                <Text
                  style={
                    theme === false
                      ? LightModestyles.subtext
                      : DarkModestyles.subtext
                  }>
                  {LocationDesc}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(3),
                alignItems: 'center',
                marginHorizontal: wp(5),
              }}>
              {predata.navplace === 'Car Parkings' ? (
                <View style={LightModestyles.buttonview}>
                  {findings === '' ? (
                    <CustomButton
                      title={'Add Notes'}
                      widthset={'35%'}
                      iscolor={'walking        '}
                      //   loading={loading}
                      //   disabled={disable}
                      onPress={() => refRBSheet.current.open()}
                    />
                  ) : (
                    <View
                      style={{
                        marginTop: hp(0.1),
                        marginHorizontal: wp(15),
                      }}></View>
                  )}
                </View>
              ) : (
                //    <CustomButton
                //    title={'Add Findings'}
                //    widthset={'35%'}
                //    iscolor={'walking        '}
                //  //   loading={loading}
                //  //   disabled={disable}
                //    onPress={() => refRBSheet.current.open()}
                //  />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: wp(0),
                    }}>
                    <Image
                      source={require('../../../../assets/LocationDetail/Icon-directions.png')}
                      style={LightModestyles.textlasticon}
                      resizeMode="contain"
                    />
                    <Text
                      style={
                        theme === false
                          ? LightModestyles.belowtext
                          : DarkModestyles.belowtext
                      }>
                      {predata.navplace === 'WaterSafety'
                          ? '0'
                          : predata.navplace === 'Entrance'
                          ? '0'
                          : predata.navplace === 'Exit'
                          ? '0'
                          : predata.navplace === 'ViewPoints'
                          ? '0'
                          : predata.navplace === 'Pinic'
                          ? '0'
                          : predata.navplace === 'PlayParks'
                          ? '0'
                          : predata.navplace === 'Nature'
                          ? '0'
                          : predata.navplace === 'Garden'
                          ? '0'
                          : predata.navplace === 'Amenities'
                          ? '0'
                          : predata.navplace === 'Castle'
                          ? '0'
                          : predata.navplace === 'About'
                          ? '0'
                          : predata.navplace === 'History'
                          ? '0'
                          :LocationDistance+' km'}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: wp(0),
                    }}>
                    <Image
                      source={require('../../../../assets/LocationDetail/walking.png')}
                      style={LightModestyles.textlasticon}
                      resizeMode="contain"
                    />
                    <Text
                      style={
                        theme === false
                          ? LightModestyles.belowtext
                          : DarkModestyles.belowtext
                      }>
                      {predata.navplace === 'WaterSafety'
                          ? '0'
                          : predata.navplace === 'Entrance'
                          ? '0'
                          : predata.navplace === 'Exit'
                          ? '0'
                          : predata.navplace === 'ViewPoints'
                          ? '0'
                          : predata.navplace === 'Pinic'
                          ? '0'
                          : predata.navplace === 'PlayParks'
                          ? '0'
                          : predata.navplace === 'Nature'
                          ? '0'
                          : predata.navplace === 'Garden'
                          ? '0'
                          : predata.navplace === 'Amenities'
                          ? '0'
                          : predata.navplace === 'Castle'
                          ? '0'
                          : predata.navplace === 'About'
                          ? '0'
                          : predata.navplace === 'History'
                          ? '0'
                          :LocationTime+ ' min'}
                      {findparkCar}
                    </Text>
                  </View>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal:
                    predata.navplace === 'Car Parkings' ? wp(2) : wp(12),
                }}></View>
              <TouchableOpacity
                onPress={() =>
                  //  {reviews()
                  //   //  navigation.navigate('Reviews')
                  // }
                  navigation.navigate('Reviews', {LocationID: predata.locid})
                }>
                <View style={LightModestyles.renderviews}>
                  <Image
                    source={require('../../../../assets/LocationDetail/review.png')}
                    style={LightModestyles.lasticon}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => togglesavedlocation(findingsid)}>
                <View
                  style={[
                    LightModestyles.renderviews,
                    {backgroundcolor: saved === true ? 'red' : 'yellow'},
                  ]}>
                 {   SavedStatus === "true" ?
                   <Ionicons name="bookmark-outline" size={25} color={'white'}/>:
                         <Ionicons name="bookmark" size={25} color={'white'}/>
                         }
                  {/* <Image
                    source={require('../../../../assets/LocationDetail/location.png')}
                    style={[
                      LightModestyles.lasticon,
                      {color: saved === true ? 'red' : 'yellow'},
                    ]}
                    resizeMode="contain"
                  /> */}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RouteDirection', {
                    destination_lat: LocationCoords_Lat,
                    destination_lng: LocationCoords_Lng,
                  })
                }>
                <View style={LightModestyles.renderviews}>
                  <Image
                    source={require('../../../../assets/LocationDetail/directions.png')}
                    style={LightModestyles.lasticon}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
            {findings != '' && predata.navplace === 'Car Parkings' ? (
              <OutlineButton
                title={'Edit Findings'}
                widthset={'70%'}
                //iscolor={'walking'}
                //   loading={loading}
                //   disabled={disable}
                onPress={() =>
                  //navigation.navigate('ParkCarRoute',{Cordinates:findparkCarCoord})
                  refFindMyCarRBSheet.current.open()
                }
              />
            ) : //        <View style={{flexDirection:'row',marginHorizontal:wp(8),justifyContent:'space-between',marginTop:hp(3)}}>
            //        <Text style={theme === false?LightModestyles.belowtext: DarkModestyles.belowtext}>{findings}</Text>
            //        <TouchableOpacity      onPress={() =>
            //           refRBSheetEditFindings.current.open()}>
            //        <Text style={theme === false?[LightModestyles.belowtext,{fontWeight:'bold'}]:
            //        [DarkModestyles.belowtext,{fontWeight:'bold'}]}>Edit</Text>
            //        </TouchableOpacity>

            //  </View>
            null}
            {predata.navplace === 'Car Parkings' ? (
              <View
                style={[
                  LightModestyles.buttonview,
                  {
                    justifyContent: 'center',
                    marginHorizontal: wp(8),
                    alignItems: 'center',
                  },
                ]}>
                {car_parking_status === true ? (
                  <>
                    <OutlineButton
                      title={'Find My Car'}
                      widthset={'70%'}
                      //iscolor={'walking'}
                      //   loading={loading}
                         //disabled={findparkCarCoord & findparkCarCoord === undefined? disable:null}
                      onPress={
                        () =>
               {     
                   // GetFindParkCar(),
                          navigation.navigate('RouteDirection', {
                            destination_lat: findparkCarCoord[1],
                            destination_lng: findparkCarCoord[0],
                          })}
                        //navigation.navigate('ParkCarRoute',{Cordinates:findparkCarCoord})
                        //   refFindMyCarRBSheet.current.open()
                      }
                    />
                    <View style={{marginTop: hp(2)}}>
                      <CustomButton
                        title={'UnPark Car'}
                        widthset={'70%'}
                        iscolor={'walking'}
                        //   loading={loading}
                        //   disabled={disable}
                        onPress={() => UnParkCar()}
                      />
                    </View>
                  </>
                ) : (
                  <CustomButton
                    title={'Park Car'}
                    widthset={'70%'}
                    iscolor={'walking'}
                    //   loading={loading}
                    //   disabled={disable}
                    onPress={() => {
                      handleClick()
                      //refFindMyCarRBSheet.current.open()
                    }}
                  />
                )}
                {/*  */}
              </View>
            ) : (
              <View style={LightModestyles.buttonview}>
                {findings === '' ? (
                  <CustomButton
                    title={'Add Notes'}
                    widthset={'80%'}
                    iscolor={'walking'}
                    //   loading={loading}
                    //   disabled={disable}
                    onPress={() => refRBSheet.current.open()}
                  />
                ) : (
                  <View
                    style={{
                      //flexDirection:'row',
                      marginHorizontal: wp(8),
                      //justifyContent:'space-between'
                    }}>
                    {/* <TouchableOpacity    
                style={{alignSelf:'flex-end',marginBottom:hp(1),backgroundColor:Colors.Appthemecolorprimary,
              height:hp(5),width:wp(15),borderRadius:wp(3),alignItems:'center',justifyContent:'center'
              }}
                onPress={() => 
          refRBSheetEditFindings.current.open()}>

       <Text style={theme === false?[LightModestyles.belowtext,{fontWeight:'bold'}]:
       [DarkModestyles.belowtext,{fontWeight:'bold'}]}>Edit</Text>
       </TouchableOpacity> */}

                    <Text
                      style={
                        theme === false
                          ? LightModestyles.belowtext
                          : DarkModestyles.belowtext
                      }>
                      {findings}
                    </Text>
                    <View style={{marginTop: hp(3)}}></View>
                    <OutlineButton
                      title={'Edit Note'}
                      widthset={'70%'}
                      //iscolor={'walking'}
                      //   loading={loading}
                      //   disabled={disable}
                      onPress={() =>
                        //navigation.navigate('ParkCarRoute',{Cordinates:findparkCarCoord})
                        refRBSheetEditFindings.current.open()
                      }
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <FindingsBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={'Gallery'}
        LocationID={predata.locid}
      />
      <EditFindingsBottomSheet
        refRBSheet={refRBSheetEditFindings}
        onClose={() => refRBSheetEditFindings.current.close()}
        title={'Gallery'}
        LocationID={predata.locid}
        findingID={findingsid}
        findingtext={findings}
      />
      <FindMyCarBottomSheet
        refRBSheet={refFindMyCarRBSheet}
        onClose={() => refFindMyCarRBSheet.current.close()}
        title={'Gallery'}
        LocationID={predata.locid}
        Location_Title={LocationTitle}
        Location_Desc={LocationDesc}
        onpressdone={()=> GetFindParkCar()}
      />
      <AddedtosaveBottomSheet
        refRBSheet={refRBSheetSaveAdded}
        onClose={() => {
          refRBSheetSaveAdded.current.close();
        }}
        title={'Sucessfully Add to Saved'}
      />
  <AddedtosaveBottomSheet
        refRBSheet={refRBSheetUnSaveAdded}
        onClose={() => {
          refRBSheetUnSaveAdded.current.close();
        }}
        title={'Sucessfully UnSaved'}
      />
      <AddedtosaveBottomSheet
        refRBSheet={refRBSheetUnPark}
        onClose={() => {
          refRBSheetUnPark.current.close();
        }}
        title={'Car Unpark Sucessfully'}
      />
    </SafeAreaView>
  );
};

export default LocationDetail;
