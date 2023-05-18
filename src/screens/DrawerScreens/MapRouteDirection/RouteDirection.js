import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, View, Image,ActivityIndicator,Text} from 'react-native';

//////app icons////////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

////////app styles///////////////////
import styles from './styles';
import Colors from '../../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

////////////////app redux///////////
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../../redux/actions';

/////////////////////map theme/////////////////
import { mapDarkStyle,mapStandardStyle } from '../../../styles/MainMap/Mapstyles';

////////////map styles/////////////////////
import LightModestyles from '../../../styles/MapView/LightModestyles';

///////////////////map states//////////////////
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

//////////////map key/////////////////
import {MapKeyApi} from '../../../utils/MapKey';

////////////location function////////////////
import {
  locationPermission,
  getCurrentLocation,
} from '../../../helper/helperFunction';


const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.08;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const RouteDirection = ({navigation, route}) => {

      ////////////////////redux/////////////////////
  const { theme } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();  

////////previous data/////////////
const [predata]=useState(route.params)
console.log(predata)
  //"33.6520943,73.0816441"
  ///////////////////map/////////////////////
   const [mapmargin, setMapMargin]=useState(1)
  const mapRef = useRef();
  const markerRef = useRef();
  const ref = useRef();
  const [state, setState] = useState({
    curLoc: {
      latitude: 56.01277,
      longitude:-4.583315,
    },
    destinationCords: {
      latitude:predata.destination_lat,
      longitude: predata.destination_lng,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

//   useEffect(() => {
//       getLiveLocation();
//   }, []);
  useEffect(() => {
    updateState({
      curLoc: {latitude :56.01277,     longitude:  -4.583315},
      coordinate: new AnimatedRegion({
        latitude: 56.01277,
        longitude: -4.583315,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    });
    ref.current?.setAddressText('Rawalpindi');
  const interval = setInterval(() => {
   getLiveLocation()
   //GetOrderDetail()
}, 7000);
return () => clearInterval(interval)

  }, []);
  return (
    <View style={[LightModestyles.container,{marginBottom:mapmargin, backgroundColor: theme === false? 'white':'  black'}]}>
      {state.curLoc.latitude && state.curLoc.longitude > 0 ? (
        <>
                <MapView
          ref={mapRef}
          style={[LightModestyles.mapStyle,{marginBottom:mapmargin}]}
          customMapStyle={theme === false? mapStandardStyle :  mapDarkStyle}
          provider={PROVIDER_GOOGLE}// remove if not using Google Maps
         // style={styles.map}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker.Animated
            ref={markerRef}
            coordinate={
              //coordinate
              curLoc
            }>
            <Image
              source={require('../../../assets/Home/CurrentPin.png')}
              style={{
                width: 40,
                height: 40,
              }}
              resizeMode="contain"
            />
          </Marker.Animated>
          {Object.keys(destinationCords).length > 0 && (
            <Marker coordinate={destinationCords}
            // image={require('../../../assets/Home/CurrentPin.png')}
              >
            <Image
            source={require('../../../assets/Home/CurrentPin.png')}
            style={{
              width: 40,
                height: 40,
            }}
            resizeMode="contain"
          />
          </Marker>
          )}

          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={MapKeyApi}
              strokeWidth={3}
              strokeColor={Colors.Appthemecolorprimary}
              duration={100}
              optimizeWaypoints={true}
              onStart={params => {
                console.log(`Started routing between "${params.origin}" 
                            and "${params.destination}"`);
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                //fetchTime(result.distance, result.duration),
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      // right: 30,
                      // bottom: 300,
                      // left: 30,
                      // top: 100,
                    },
                  });
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <View style={{marginLeft: wp(3), marginTop: hp(2), marginBottom: hp(1)}}>
        <Ionicons
          name={'chevron-back'}
          size={30}
          color={Colors.Appthemecolorprimary}
          onPress={() => navigation.goBack()}
        />
      </View>
        </>

      ) :  
      <View style={{alignItems:'center'}}>
      <ActivityIndicator size={'large'} style={{marginTop: hp(45)}} />
      <Text style={{color:'black',fontSize:hp(2),fontWeight:'700'}}>Please wait for your Route</Text>
      </View>
      }

    </View>
  );
};

export default RouteDirection;
