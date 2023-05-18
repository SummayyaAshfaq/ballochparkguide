import React, {useState, useEffect} from 'react';
// Import required components
import {
  Animated,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

//////////////////app components//////////
import CustomHeader from '../../../../components/Header/CustomHeader';

//////////////////navigation///////////
import {useIsFocused} from '@react-navigation/native';

// Import Map and Marker
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapView, {
  Marker,
  Circle,
  PROVIDER_GOOGLE,
  Polygon,
} from 'react-native-maps';
import {MapKeyApi} from '../../../../utils/MapKey';

/////////////app styles////////////////
import Colors from '../../../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/////////////////////////app redux//////////////////
import {useSelector, useDispatch} from 'react-redux';
import {setRoute} from '../../../../redux/actions';

///////////////////////map styles////////////////
import {
  mapDarkStyle,
  mapStandardStyle,
} from '../../../../styles/MainMap/Mapstyles';

//////////////////app styles//////////////////
import LightModestyles from '../../../../styles/MapView/LightModestyles';
import DarkModestyles from '../../../../styles/MapView/DarkModestyles';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL} from '../../../../utils/ApiRootUrl';

const WalkingRouteSearch = ({navigation, route}) => {
  ///////////////////previous data////////////
  const [predata] = useState(route.params);

  ////////////////////redux/////////////////////
  const {theme, locationid} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  /////////////map states////////////
  const [eror, setError] = useState();
  const [region, setRegion] = useState();
  const [marker, setMarker] = useState();
  const [pinlat, setPinLat] = useState(56.00963);
  const [pinlog, setPinLog] = useState(-4.583497);
  /////////////user current location////////////////
  const GetcurrLocation = () => {
    Geocoder.init(MapKeyApi);
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0462,
          longitudeDelta: 0.0261,
        });
        console.log('map regions:', region);
        setMarker({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // latitudeDelta: 0.0462,
          // longitudeDelta: 0.0261,
        });
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            console.log(json);
            var addressComponent = json.results[0].address_components;
          })

          .catch(error => console.warn(error));
      },
      error => {
        // See error code charts below.

        setError(error.message);

        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 100000,
      },
    );
  };
  useEffect(() => {
    //if(isfocussed){
    GetWalkingRoutes();
    GetDogWalks();
    GetCarParking();
    GetToilets();
    GetCastle();
    GetAbout();
    GetAmenities();
    GetGarden();
    GetNature();
    GetHistory();
    GetPlayParks();
    GetViewPoints();
    GetWaterSafety();
    GetPinic();
    GetEntrance();
    GetExit();
    //}
  }, []);

  ////////////////Titles States/////////////
  const [WalkingRoutes, setWalkingRoutes] = useState([]);
  const [DogWalks, setDogWalks] = useState([]);
  const [Parking, setParking] = useState([]);
  const [Toilets, setToilets] = useState([]);
  const [Castle, setCastle] = useState([]);
  const [About, setAbout] = useState([]);
  const [Amenities, setAmenities] = useState([]);
  const [Garden, setGarden] = useState([]);
  const [History, setHistory] = useState([]);
  const [Nature, setNature] = useState([]);
  const [PlayParks, setPlayParks] = useState([]);
  const [Pinic, setPicnic] = useState([]);
  const [ViewPoints, setViewPoints] = useState([]);
  const [WaterSafety, setWaterSafety] = useState([]);
  const [Exit, setExit] = useState([]);
  const [Entrance, setEntrance] = useState([]);

  //////////////GetWalkingRoutes Api Calling////////////////////
  const GetWalkingRoutes = async () => {
    axios({
      method: 'GET',
      url:
        BASE_URL + 'location/getLocationByTypeWithOnePic/?type=walking-route',
    })
      .then(async function (response) {
        console.log(
          'response here in walking-route',
          JSON.stringify(response.data.result),
        );
        setWalkingRoutes(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        //setModalVisible(true)

        console.log('error', error);
      });
  };
  //////////////GetDogWalks Api Calling////////////////////
  const GetDogWalks = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=dog-walk',
    })
      .then(async function (response) {
        console.log(
          'response here in dog-walk',
          JSON.stringify(response.data.result),
        );
        setDogWalks(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        //setModalVisible(true)

        console.log('error', error);
      });
  };
  //////////////GetCarParking Api Calling////////////////////
  const GetCarParking = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=parking',
    })
      .then(async function (response) {
        console.log(
          'response here in parking',
          JSON.stringify(response.data.result),
        );
        setParking(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        //setModalVisible(true)

        console.log('error', error);
      });
  };
  //////////////GetToilets Api Calling////////////////////
  const GetToilets = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=toilet',
    })
      .then(async function (response) {
        console.log(
          'response here in toilet',
          JSON.stringify(response.data.result),
        );
        setToilets(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        //setModalVisible(true)

        console.log('error', error);
      });
  };
  //////////////GetCastle Api Calling////////////////////
  const GetCastle = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=castle',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setCastle(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetAbout Api Calling////////////////////
  const GetAbout = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=about',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setAbout(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetAmenities Api Calling////////////////////
  const GetAmenities = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=amenities',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setAmenities(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetGarden Api Calling////////////////////
  const GetGarden = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=garden',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setGarden(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetNature Api Calling////////////////////
  const GetNature = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=nature',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setNature(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetHistory Api Calling////////////////////
  const GetHistory = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=history',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setHistory(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetPlayParks Api Calling////////////////////
  const GetPlayParks = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=play_park',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setPlayParks(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetPinic Api Calling////////////////////
  const GetPinic = async () => {
    axios({
      method: 'GET',
      url:
        BASE_URL +
        'location/getLocationByTypeWithOnePic/?type=picnic_tables_benches',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setPicnic(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetViewPoints Api Calling////////////////////
  const GetViewPoints = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=view_point',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setViewPoints(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetWaterSafety Api Calling////////////////////
  const GetWaterSafety = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=water_safety',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setWaterSafety(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetExit Api Calling////////////////////
  const GetExit = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=exit',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setExit(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  //////////////GetEntrance Api Calling////////////////////
  const GetEntrance = async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByTypeWithOnePic/?type=entrance',
    })
      .then(async function (response) {
        console.log('here images', response.data);
        setEntrance(response.data.result);
      })
      .catch(function (error) {
        if (error) {
          console.log('Email or Password is incorrect');
        }
        console.log('error', error);
      });
  };
  const interpolations = Parking.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

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
    // Update the zoom level when the map is zoomed in or out
    const latDelta = region.latitudeDelta;
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
  return (
    <View
      style={[
        LightModestyles.container,
        {backgroundColor: theme === false ? 'white' : '  black'},
      ]}>
      {/* {regionlat && regionlog > 0 ?  */}
      <MapView
        ref={_map}
        showsScale={true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        showsPointsOfInterest={true}
        loadingEnabled={false}
        maxZoomLevel={25}
        style={[LightModestyles.mapStyle]}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        onMapReady={onMapReady}
        onRegionChangeComplete={onRegionChangeComplete}
        zoomEnabled={true}
        initialRegion={{
          latitude: pinlat,
          longitude: pinlog,
          latitudeDelta: 0.021,
          longitudeDelta: 0.0128,
        }}
        customMapStyle={theme === false ? mapStandardStyle : mapDarkStyle}>
        {route.params === 'WalkingRoute' && WalkingRoutes != ''
          ? WalkingRoutes.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/WalkingRoute.png')}
                      style={[LightModestyles.marker]}
                      resizeMode="contain"
                    />
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardDescriptionMapView,
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
          : route.params === 'DogWalks' && DogWalks != ''
          ? DogWalks.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/DogWalks.png')}
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
          : route.params === 'CarParkings' && Parking != ''
          ? Parking.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/CarParking.png')}
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
          : route.params === 'Toilets' && Toilets != ''
          ? Toilets.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/Toilet.png')}
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
          : route.params === 'Castle' && Castle != ''
          ? Castle.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/Castle.png')}
                      style={[LightModestyles.viewmapmarker]}
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
          : route.params === 'Amenities' && Amenities != ''
          ? Amenities.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/Amenities.png')}
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
          : route.params === 'Garden' && Garden != ''
          ? Garden.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/Gardens.png')}
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
          : route.params === 'Nature' && Nature != ''
          ? Nature.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/Nature.png')}
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
          : route.params === 'Pinic' && Pinic != ''
          ? Pinic.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/Table&Benches.png')}
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
          : route.params === 'ViewPoints' && ViewPoints != ''
          ? ViewPoints.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/ViewPoints.png')}
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
          : route.params === 'WaterSafety' && WaterSafety != ''
          ? WaterSafety.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[1],
                    longitude: marker.location.coordinates[0],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/WaterSafety.png')}
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
          : route.params === 'About' && About != ''
          ? About.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[0],
                    longitude: marker.location.coordinates[1],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/About.png')}
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
          : route.params === 'History' && History != ''
          ? History.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[0],
                    longitude: marker.location.coordinates[1],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/History.png')}
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
          : route.params === 'Entrance' && Entrance != ''
          ? Entrance.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[0],
                    longitude: marker.location.coordinates[1],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/Enter.png')}
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
          : route.params === 'Exit' && Exit != ''
          ? Exit.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[0],
                    longitude: marker.location.coordinates[1],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/Exit.png')}
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
          : route.params === 'PlayParks' && PlayParks != ''
          ? PlayParks.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location.coordinates[0],
                    longitude: marker.location.coordinates[1],
                  }}
                  onPress={e => onMarkerPress(e)}>
                  <Animated.View style={[LightModestyles.markerWrap]}>
                    <Image
                      source={require('../../../../assets/AllLocations/PlayParks.png')}
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
            //draggable={true}
            coordinate={{
              latitude: pinlat,
              longitude: pinlog,
            }}
            //title={'title'}
            //description={'here'}
            //image={require('../../../../assets/Home/CurrentPin.png')}
            // onDragStart={(e)=>
            //   console.log('Darg Start:',e.nativeEvent.coordinate)}
            onDragEnd={e => {
              console.log('Drag End:', e.nativeEvent.coordinate),
                setPinLat(e.nativeEvent.coordinate.latitude);
              setPinLog(e.nativeEvent.coordinate.longitude);
              alert('DragEnd:', pinlat, pinlog);
            }}>
            <View style={{}}>
              <Image
                source={require('../../../../assets/Home/CurrentPin.png')}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </View>
          </Marker>
        ) : null}
        <Polygon coordinates={polygonCoords} strokeWidth={0} />
      </MapView>
      {/* :
        <ActivityIndicator
        size={'large'}
        style={{marginTop: hp(45)}}
      />
      } */}

      <CustomHeader
        headerlabel={
          route.params === 'WalkingRoute'
            ? 'Walking Routes'
            : route.params === 'DogWalks'
            ? 'Dog Walks'
            : route.params === 'CarParkings'
            ? 'Car Parking'
            : route.params === 'Toilets'
            ? 'Toilets'
            : route.params === 'Entrance'
            ? 'Entrance'
            : route.params === 'Exit'
            ? 'Exit'
            : route.params === 'WaterSafety'
            ? 'Water Safety'
            : route.params === 'ViewPoints'
            ? 'View Points'
            : route.params === 'Pinic'
            ? 'Pinic and Benches'
            : route.params === 'PlayParks'
            ? 'Play Parks'
            : route.params === 'Nature'
            ? 'Nature'
            : route.params === 'History'
            ? 'History'
            : route.params === 'Garden'
            ? 'Garden'
            : route.params === 'Amenities'
            ? 'Amenities'
            : route.params === 'About'
            ? 'About'
            : route.params === 'Castle'
            ? 'Castle'
            : null
        }
        iconPress={() => {
          navigation.toggleDrawer();
        }}
        icon={'menu'}
      />
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={LightModestyles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {route.params === 'WalkingRoute' && WalkingRoutes != ''
          ? WalkingRoutes.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={async () => {
                  //reduxwalkingroutes(marker)
                  //await
                  //dispatch(setLOCID(marker._id)),
                  navigation.navigate('LocationDetail', {
                    navplace: 'Walking Routes',
                    locid: marker._id,
                  });

                  //console.log("here id ",id)

                  //navigation.navigate('LocationDetail','Walking Routes')
                }}>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        ,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'DogWalks' && DogWalks != ''
          ? DogWalks.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Dogs Walk',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    // source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'CarParkings' && Parking != ''
          ? Parking.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Car Parkings',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'Toilets' && Toilets != ''
          ? Toilets.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Toilets',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'Pinic' && Pinic != ''
          ? Pinic.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Pinic',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'Castle' && Castle != ''
          ? Castle.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Castle',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'History' && History != ''
          ? History.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'History',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'Exit' && Exit != ''
          ? Exit.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Exit',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'Entrance' && Entrance != ''
          ? Entrance.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Entrance',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'Garden' && Garden != ''
          ? Garden.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Garden',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'PlayParks' && PlayParks != ''
          ? PlayParks.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'PlayParks',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'Nature' && Nature != ''
          ? Nature.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Nature',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'About' && About != ''
          ? About.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'About',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'Amenities' && Amenities != ''
          ? Amenities.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'Amenities',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'WaterSafety' && WaterSafety != ''
          ? WaterSafety.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'WaterSafety',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : route.params === 'ViewPoints' && ViewPoints != ''
          ? ViewPoints.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    navplace: 'ViewPoints',
                    locid: marker._id,
                  })
                }>
                <View
                  style={[
                    LightModestyles.card,
                    {
                      backgroundColor:
                        theme === false ? 'white' : 'rgba(52, 52, 52, 1)',
                    },
                  ]}
                  key={index}>
                  <Image
                    source={{
                      uri:
                        marker.images.length === 0
                          ? null
                          : marker.images[0].image_url,
                    }}
                    //source={marker.image}
                    style={LightModestyles.cardImage}
                    resizeMode="stretch"
                  />
                  <View style={LightModestyles.textContent}>
                    <Text
                      numberOfLines={1}
                      style={[
                        LightModestyles.cardtitle,
                        {
                          color:
                            theme === false ? 'rgba(69, 79, 99, 1)' : 'white',
                        },
                      ]}>
                      {marker.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        numberOfLines={4}
                        style={[
                          LightModestyles.cardDescriptionMapView,
                          {
                            color:
                              theme === false
                                ? 'rgba(120, 132, 158, 1)'
                                : 'white',
                          },
                        ]}>
                        {marker.description}
                      </Text>
                      <View style={{marginTop: hp(5)}}>
                        <Image
                          source={require('../../../../assets/Home/save.png')}
                          style={{width: wp(5), height: hp(5)}}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : null}
      </Animated.ScrollView>
    </View>
  );
};

export default WalkingRouteSearch;
