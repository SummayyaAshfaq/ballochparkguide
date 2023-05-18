import React, {useState, useEffect, useRef,useCallback } from 'react';
// Import required components
import {
  Animated,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {IconButton} from 'react-native-paper';

//////////app components/////////
import LocationsBottomSheet from '../../../components/LocationTypes/LocationTypes';
import MapThemeBottomSheet from '../../../components/LocationTypes/MapTheme';
import AddedtosaveBottomSheet from '../../../components/Findings/AddtoSave';
import CustomHeader from '../../../components/Header/CustomHeader';

//////////////app pakages////////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';

//////////////// Map and Marker
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
} from 'react-native-maps';

//////////////////app styles////////////////
import Colors from '../../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

////////////////app redux///////////
import {useSelector, useDispatch} from 'react-redux';
import {setTheme} from '../../../redux/actions';

/////////////////app map styles////////
import {
  mapDarkStyle,
  mapStandardStyle,
} from '../../../styles/MainMap/Mapstyles';

//////////////app styles/////////////
import LightModestyles from '../../../styles/MainMap/LightModestyles';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utils/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////location current/////////////////
import {
  locationPermission,
  getCurrentLocation,
} from '../../../helper/helperFunction';

/////////////geolocation/////////
import Geolocation from 'react-native-geolocation-service';

import { ViewPropTypes } from 'deprecated-react-native-prop-types'

const MapSearch = ({navigation}) => {
  ////////////////////redux/////////////////////
  const {theme, maptheme} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  //////////locationtype state/////////////
  const refRBSheet = useRef();
  const refRBSheetmaptypes = useRef();
  const refRBSheetSaveAdded = useRef();

  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  //////////////current location state and function//////////////////////
  const [currentLocation, setCurrentLocation] = useState(null);
  //////////////////////map All locations///////////////////
  const alllocationtogglebutton = () => {
    if (allloc === true) {
      setAllloc(false);
    } else {
      setAllloc(true);
      setShowCurrentLocation(false);
      setRegion1(DEFAULT_REGION);
      _map.current.animateToRegion(DEFAULT_REGION, 500);
    }
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const _map = React.useRef(null);

  /////////////map states////////////
  const [mapmargin, setMapMargin] = useState(1);
  const [marker, setMarker] = useState();
  const [pinlat, setPinLat] = useState(56.00963);
  const [pinlog, setPinLog] = useState(-4.583497);
  const [curpinlat, setCurPinLat] = useState(56.00963);
  const [curpinlog, setCurPinLog] = useState(-4.583497);

  ////////////////All location///////////
  const [allloc, setAllloc] = useState(false);

  /////////////user current location////////////////
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      setCurPinLat(latitude);
      setCurPinLog(longitude);
    }
  };
  useEffect(() => {
    if (isfocussed) {
      GetLocation();
      GetUser();
      getLiveLocation();
    }
    // Change the state every second or the time given by User.
    // const interval = setInterval(() => {
    //   setShowText(showText => !showText);
    // }, 1000);
    // return () => clearInterval(interval);
  }, [isfocussed]);
  useEffect(() => {
    if (isfocussed) {
      const watchId = Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
        },

        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, interval: 1000, distanceFilter: 10},
      );
      return () => {
        Geolocation.clearWatch(watchId);
      };
    }
  }, [isfocussed]);
  //////////////// location data state///////////
  const [pinsdata, setPinsdata] = useState([]);

  //////////////Api Calling////////////////////
  const GetLocation =  useCallback( async() => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getAllLocations',
    })
      .then(async function (response) {
        setPinsdata(response.data.data);
      })
      .catch(function (error) {
        if (error) {
        }
      });
  }, [pinsdata]);
  //////////////// location data state///////////
  const [ParkingDetail, setParkingDetail] = useState();
  const [ParkingPlaceID, setParkingPlaceID] = useState();

  //////////////Api Calling////////////////////
  const GetUser = async () => {
    var user = await AsyncStorage.getItem('Userid');
    axios({
      method: 'GET',
      url: BASE_URL + 'user/getUser/' + user,
    })
      .then(async function (response) {
        const key = 'isParked';
        const hasTruthyFlag = response.data.userDetails[0].user_parkings.some(
          flag => {
            return flag[key];
          },
        );
        setParkingDetail(hasTruthyFlag);
        setParkingPlaceID(response.data.userDetails[0].user_parkings[0].parking_id,
        );
      })
      .catch(function (error) {
        if (error) {
        }
      });
  };
  const [showText, setShowText] = useState(true);

  const polygonCoords = [
    {latitude: 56.004422, longitude: -4.576877},
    {latitude: 56.00561, longitude: -4.577694},
    {latitude: 56.00698, longitude: -4.578402},
    {latitude: 56.008198, longitude: -4.578783},
    {latitude: 56.009842, longitude: -4.579327},
    {latitude: 56.01039, longitude: -4.579491},
    {latitude: 56.010968, longitude: -4.579709},
    {latitude: 56.011395, longitude: -4.580362},
    {latitude: 56.011705, longitude: -4.580612},
    {latitude: 56.012406, longitude: -4.580884},
    {latitude: 56.012893, longitude: -4.581211},
    {latitude: 56.013745, longitude: -4.58181},
    {latitude: 56.014232, longitude: -4.582464},
    {latitude: 56.013867, longitude: -4.583008},
    {latitude: 56.014141, longitude: -4.583716},
    {latitude: 56.01475, longitude: -4.584315},
    {latitude: 56.015785, longitude: -4.585023},
    {latitude: 56.016789, longitude: -4.585459},
    {latitude: 56.017703, longitude: -4.586058},
    {latitude: 56.017977, longitude: -4.586385},
    {latitude: 56.018251, longitude: -4.587038},
    {latitude: 56.018129, longitude: -4.588019},
    {latitude: 56.017885, longitude: -4.588563},

    {latitude: 56.01749, longitude: -4.589053},
    {latitude: 56.017185, longitude: -4.589053},
    {latitude: 56.016789, longitude: -4.588944},
    {latitude: 56.016394, longitude: -4.589108},
    {latitude: 56.015937, longitude: -4.589108},
    {latitude: 56.015694, longitude: -4.589108},
    {latitude: 56.015328, longitude: -4.589435},
    {latitude: 56.014932, longitude: -4.589544},
    {latitude: 56.014476, longitude: -4.589544},
    {latitude: 56.014019, longitude: -4.589326},
    {latitude: 56.013623, longitude: -4.589108},
    {latitude: 56.012406, longitude: -4.588509},
    {latitude: 56.011766, longitude: -4.588454},
    {latitude: 56.011279, longitude: -4.588345},
    {latitude: 56.010944, longitude: -4.5884},
    {latitude: 56.010762, longitude: -4.588618},
    {latitude: 56.01067, longitude: -4.588944},
    {latitude: 56.010579, longitude: -4.589162},
    {latitude: 56.010396, longitude: -4.589108},
    {latitude: 56.009848, longitude: -4.589053},
    {latitude: 56.009544, longitude: -4.588944},
    {latitude: 56.009117, longitude: -4.588563},
    {latitude: 56.009149, longitude: -4.588666},
    {latitude: 56.008916, longitude: -4.588286},
    {latitude: 56.008576, longitude: -4.587679},
    {latitude: 56.008364, longitude: -4.586996},
    {latitude: 56.008131, longitude: -4.586388},
    {latitude: 56.0076, longitude: -4.585515},
    {latitude: 56.007048, longitude: -4.584604},
    {latitude: 56.006518, longitude: -4.583845},
    {latitude: 56.005775, longitude: -4.58301},
    {latitude: 56.005457, longitude: -4.582782},
    {latitude: 56.005266, longitude: -4.582593},
    {latitude: 56.005202, longitude: -4.582744},
    {latitude: 56.005032, longitude: -4.582555},
    {latitude: 56.005004, longitude: -4.582516},
    {latitude: 56.004411, longitude: -4.581853},
    {latitude: 56.003942, longitude: -4.581323},
    {latitude: 56.003831, longitude: -4.581146},
    {latitude: 56.003708, longitude: -4.580771},

    {latitude: 56.003485, longitude: -4.580992},
    {latitude: 56.003016, longitude: -4.581168},
    {latitude: 56.002473, longitude: -4.580903},
    {latitude: 56.002201, longitude: -4.580351},
    {latitude: 56.002201, longitude: -4.580351},
    {latitude: 56.002201, longitude: -4.580351},
    {latitude: 56.004053, longitude: -4.578209},

    {latitude: 56.004053, longitude: -4.577082},
  ];
  const [zoomLevel, setZoomLevel] = useState(null);

  const onMapReady = () => {
    // Get the initial zoom level when the map is ready
    _map.current.getMapBoundaries().then(result => {
      const {northEast, southWest} = result;
      const latDelta = northEast.latitude - southWest.latitude;
      setZoomLevel(Math.round(Math.log(360 / latDelta) / Math.LN2));
    });
  };

  const onRegionChangeComplete = region => {
    const latDelta = region.latitudeDelta;
    // Update the zoom level when the map is zoomed in or out
    setZoomLevel(Math.round(Math.log(360 / latDelta) / Math.LN2));
  };

  const markerTextOpacity = () => {
    // Calculate the opacity of the marker text based on the current zoom level
    if (zoomLevel <= 10) {
      return 0;
    } else if (zoomLevel <= 15) {
      return (zoomLevel - 10) / 5; // Gradually decrease opacity from 1 to 0
    } else {
      return 14;
    }
  };

  const [showLiveLocation, setShowLiveLocation] = useState(false);
  const [_currentLocation, _setCurrentLocation] = useState(null);

  const DEFAULT_REGION = {
    latitude: 56.00963,
    longitude: -4.583497,
    latitudeDelta: 0.021,
    longitudeDelta: 0.0128,
  };
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [currentLocation1, setCurrentLocation1] = useState(null);
  const [region1, setRegion1] = useState(DEFAULT_REGION);

  const userlocationtogglebutton = () => {
    setShowCurrentLocation(!showCurrentLocation);
    setAllloc(false);
    if (!showCurrentLocation) {
      setRegion1(currentLocation1);
      Geolocation.getCurrentPosition(
        position => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          _map.current.animateToRegion(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            500,
          );

          setCurrentLocation1(location);
        },
        // error => alert(error.message),
        // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      setRegion1(DEFAULT_REGION);
      _map.current.animateToRegion(DEFAULT_REGION, 500);
    }
  };

  const handleRegionChange = region => {
    setCurrentLocation1(region);
  };

  return (
    <View
      style={[
        LightModestyles.container,
        {
          marginBottom: mapmargin,
          backgroundColor: theme === false ? 'white' : '  black',
        },
      ]}>
      <MapView
        ref={_map}
        region={region1}
        initialRegion={DEFAULT_REGION}
        showsUserLocation={showCurrentLocation}
        onRegionChange={handleRegionChange}
        showsScale={true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        showsPointsOfInterest={true}
        loadingEnabled={false}
        style={[LightModestyles.mapStyle, {marginBottom: mapmargin}]}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        onMapReady={onMapReady}
        followsUserLocation={showLiveLocation}
        onRegionChangeComplete={onRegionChangeComplete}
        zoomEnabled={true}
        onLayout={() => {
          _map.current.fitToCoordinates({latitude: pinlat, longitude: pinlog});
        }}
        customMapStyle={theme === false ? mapStandardStyle : mapDarkStyle}>
        {allloc === true
          ? pinsdata.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={() => {
                    marker.type === 'walking-route'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Walking Routes',
                          locid: marker._id,
                        })
                      : marker.type === 'parking'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Car Parkings',
                          locid: marker._id,
                        })
                      : marker.type === 'dog-walk'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'DogWalks',
                          locid: marker._id,
                        })
                      : marker.type === 'toilet'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Toilets',
                          locid: marker._id,
                        })
                      : marker.type === 'entrance'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Entrance',
                          locid: marker._id,
                        })
                      : marker.type === 'exit'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Exit',
                          locid: marker._id,
                        })
                      : marker.type === 'view_point'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'ViewPoints',
                          locid: marker._id,
                        })
                      : marker.type === 'play_park'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'PlayParks',
                          locid: marker._id,
                        })
                      : marker.type === 'picnic_tables_benches'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Pinic',
                          locid: marker._id,
                        })
                      : marker.type === 'castle'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Castle',
                          locid: marker._id,
                        })
                      : marker.type === 'amenities'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Amenities',
                          locid: marker._id,
                        })
                      : marker.type === 'nature'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Nature',
                          locid: marker._id,
                        })
                      : marker.type === 'garden'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'Garden',
                          locid: marker._id,
                        })
                      : marker.type === 'water_safety'
                      ? navigation.navigate('LocationDetail', {
                          navplace: 'WaterSafety',
                          locid: marker._id,
                        })
                      : null;
                  }}>
                  <Animated.View
                    style={[
                      LightModestyles.markerWrap,
                      {alignItems: 'center'},
                    ]}>
                    <Image
                      source={
                        marker.type === 'walking-route'
                          ? require('../../../assets/AllLocations/WalkingRoute.png')
                          : marker.type === 'parking'
                          ? require('../../../assets/AllLocations/CarParking.png')
                          : marker.type === 'dog-walk'
                          ? require('../../../assets/AllLocations/DogWalks.png')
                          : marker.type === 'toilet'
                          ? require('../../../assets/AllLocations/Toilet.png')
                          : marker.type === 'entrance'
                          ? require('../../../assets/AllLocations/Enter.png')
                          : marker.type === 'exit'
                          ? require('../../../assets/AllLocations/Exit.png')
                          : marker.type === 'view_point'
                          ? require('../../../assets/AllLocations/ViewPoints.png')
                          : marker.type === 'play_park'
                          ? require('../../../assets/AllLocations/PlayParks.png')
                          : marker.type === 'picnic_tables_benches'
                          ? require('../../../assets/AllLocations/Table&Benches.png')
                          : marker.type === 'castle'
                          ? require('../../../assets/AllLocations/Castle.png')
                          : marker.type === 'amenities'
                          ? require('../../../assets/AllLocations/Amenities.png')
                          : marker.type === 'nature'
                          ? require('../../../assets/AllLocations/Nature.png')
                          : marker.type === 'garden'
                          ? require('../../../assets/AllLocations/Gardens.png')
                          : marker.type === 'history'
                          ? require('../../../assets/AllLocations/History.png')
                          : marker.type === 'water_safety'
                          ? require('../../../assets/AllLocations/WaterSafety.png')
                          : null
                      }
                      style={[LightModestyles.marker]}
                      resizeMode="contain"
                    />

                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardDescription,
                        {
                          color: Colors.Appthemecolorprimary,
                          fontSize: markerTextOpacity(),
                        },
                      ]}>
                      {marker.title}
                    </Text>
                  </Animated.View>
                </Marker>
              );
            })
          : null}
        {marker != '' ? (
          <Marker
            draggable={true}
            coordinate={{
              latitude: pinlat,
              longitude: pinlog,
            }}
            width={2}
            height={2}
            onDragEnd={e => {
                setPinLat(e.nativeEvent.coordinate.latitude);
              setPinLog(e.nativeEvent.coordinate.longitude);
            }}>
            <View style={{}}>
              <Image
                source={require('../../../assets/Home/CurrentPin.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </View>
          </Marker>
        ) : null}

        <Polygon coordinates={polygonCoords} strokeWidth={0} />
        {/* {showCurrentLocation != true
          ? currentLocation1 && (
              <Marker
                image={require('../../../assets/Home/currentuserpin.png')}
                style={{height: 50, width: 50, resizeMode: 'contain'}}
                //coordinate={currentLocation1}
                coordinate={{
                  latitude: curpinlat,
                  longitude: curpinlog,
                }}>
                <View style={{}}>
                <Image
                  source={require('../../../assets/Home/currentuserpin.png')}
                  style={{height: 50, width: 50, resizeMode: 'contain'}}
                />
              </View>
              </Marker>
            )
          : null} */}
        {marker != '' ? (
          <Marker
            draggable={true}
            tracksViewChanges={true}
            coordinate={{
              latitude: pinlat,
              longitude: pinlog,
            }}
            onDragEnd={e => {
              console.log('Darg Start:', e.nativeEvent.coordinate),
                setPinLat(e.nativeEvent.coordinate.latitude);
              setPinLog(e.nativeEvent.coordinate.longitude);
            }}>
            <View style={{}}>
              <Image
                source={require('../../../assets/Home/CurrentPin.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </View>
          </Marker>
        ) : null}
      </MapView>

      <CustomHeader
        headerlabel={'BALLOCHPARKGUIDE'}
        iconPress={() => {
          navigation.toggleDrawer();
        }}
        icon={'menu'}
      />
      {ParkingDetail === true ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LocationDetail', {
              navplace: 'Car Parkings',
              locid: ParkingPlaceID,
            });
            //UnParkCar(ParkingID)
          }}
          style={[
            LightModestyles.carparkingview,
            {
              backgroundColor:
                theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
            },
          ]}>
          <View style={[LightModestyles.carContent]}>
            <IconButton
              icon={require('../../../assets/Home/CarParkings.png')}
              color={'red'}
              size={45}
              style={{display: showText ? 'none' : 'flex'}}
            />
          </View>
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          bottom: wp(25),
          right: 0,
          position: 'absolute',
          paddingBottom: hp(0),
        }}>
        {theme === false ? (
          <TouchableOpacity onPress={() => alllocationtogglebutton()}>
            <View
              style={[
                LightModestyles.currentlocationview,
                {
                  backgroundColor:
                    allloc === true ? Colors.Appthemecolorprimary : 'white',
                },
              ]}>
              <View style={[LightModestyles.textContent]}>
                <IconButton
                  icon={require('../../../assets/Home/eye.png')}
                  color={
                    allloc === true ? 'white' : Colors.Appthemecolorprimary
                  }
                  size={wp(6)}
                  onPress={() => alllocationtogglebutton()}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => alllocationtogglebutton()}>
            <View
              style={[
                LightModestyles.currentlocationview,
                {
                  backgroundColor:
                    allloc === true
                      ? Colors.Appthemecolorprimary
                      : 'rgba(52, 52, 52, 1)',
                },
              ]}>
              <View style={[LightModestyles.textContent]}>
                <IconButton
                  icon={require('../../../assets/Home/eye.png')}
                  //icon="image"
                  color={
                    allloc === true ? 'white' : Colors.Appthemecolorprimary
                  }
                  size={wp(6)}
                  onPress={() => alllocationtogglebutton()}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
        {theme === false ? (
          <TouchableOpacity
            onPress={() => {
              userlocationtogglebutton();
            }}>
            <View
              style={[
                LightModestyles.currentlocationview,
                {
                  backgroundColor:
                    showCurrentLocation === true
                      ? Colors.Appthemecolorprimary
                      : 'white',
                  //theme === false ? 'white':'rgba(52, 52, 52, 1)'
                },
              ]}>
              <IconButton
                icon={require('../../../assets/Home/currentlocation.png')}
                //icon="image"
                color={
                  showCurrentLocation === true
                    ? 'white'
                    : Colors.Appthemecolorprimary
                }
                size={24}
                onPress={() => {
                  userlocationtogglebutton();
                }}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              userlocationtogglebutton();
            }}>
            <View
              style={[
                LightModestyles.currentlocationview,
                {
                  backgroundColor:
                    showCurrentLocation === true
                      ? Colors.Appthemecolorprimary
                      : 'rgba(52, 52, 52, 1)',
                  //theme === false ? 'white':'rgba(52, 52, 52, 1)'
                },
              ]}>
              <View style={LightModestyles.textContent}>
                <IconButton
                  icon={require('../../../assets/Home/currentlocation.png')}
                  //icon="image"
                  color={
                    showCurrentLocation === true
                      ? 'white'
                      : Colors.Appthemecolorprimary
                  }
                  size={24}
                  onPress={() => {
                    userlocationtogglebutton();
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Animated.View style={LightModestyles.lastView}>
        <View
          style={{
            backgroundColor: theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
            height: hp(12),
            borderTopWidth: 8,
            borderTopColor: Colors.Appthemecolorprimary,
            width: wp(100),
            borderTopLeftRadius: wp(2),
            borderTopRightRadius: wp(2),
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            activeOpacity={1}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: wp(5),
                alignItems: 'center',
              }}>
              <Ionicons
                name={'chevron-up'}
                size={23}
                color={theme === false ? 'grey' : 'white'}
                onPress={() => refRBSheet.current.open()}
              />
              <View style={{marginLeft: wp(3)}}>
                <Text
                  numberOfLines={2}
                  style={[
                    LightModestyles.cardDescription,
                    {
                      color: Colors.Appthemecolorprimary,
                      marginTop: hp(0),
                      // theme === false ? 'black':'white'
                    },
                  ]}>
                  What 's Nearby
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <LocationsBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={'Gallery'}
      />
      <MapThemeBottomSheet
        refRBSheet={refRBSheetmaptypes}
        onClose={() => refRBSheetmaptypes.current.close()}
        title={'Gallery'}
      />
      <AddedtosaveBottomSheet
        refRBSheet={refRBSheetSaveAdded}
        onClose={() => {
          refRBSheetSaveAdded.current.close();
        }}
        title={'UnPark Car Sucessfully'}
      />
    </View>
  );
};

export default MapSearch;
