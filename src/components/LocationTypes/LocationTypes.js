import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

/////////////////app pakages//////////////
import RBSheet from 'react-native-raw-bottom-sheet';

////////////app icons///////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

////////////////app redux///////////
import {useSelector} from 'react-redux';

////////////app styles///////////////
import LightModestyles from '../../styles/MapView/LightModestyles';
import styles from './styles';
import Colors from '../../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL} from '../../utils/ApiRootUrl';

import {useNavigation} from '@react-navigation/native';

const LocationsBottomSheet = props => {
  const navigation = useNavigation();

  ////////////////////redux/////////////////////
  const {theme} = useSelector(state => state.userReducer);

  //ReviewAdded state and funnction
  const refRBSheetSaveAdded = useRef();
  useEffect(() => {
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
  }, []);

  ////////////////Titles States/////////////
  const [WalkingRoutes, setWalkingRoutes] = useState('');
  const [DogWalks, setDogWalks] = useState('');
  const [CarParking, setCarParking] = useState('');
  const [Toilets, setToilets] = useState('');
  const [Castle, setCastle] = useState('');
  const [About, setAbout] = useState('');
  const [Amenities, setAmenities] = useState('');
  const [Garden, setGarden] = useState('');
  const [History, setHistory] = useState('');
  const [Nature, setNature] = useState('');
  const [PlayParks, setPlayParks] = useState('');
  const [Pinic, setPicnic] = useState('');
  const [ViewPoints, setViewPoints] = useState('');
  const [WaterSafety, setWaterSafety] = useState('');
  const [Exit, setExit] = useState('');
  const [Entrance, setEntrance] = useState('');

  //////////////GetWalkingRoutes Api Calling////////////////////
  const GetWalkingRoutes = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=walking-route',
    })
      .then(async function (response) {
        setWalkingRoutes(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [WalkingRoutes]);
  //////////////GetDogWalks Api Calling////////////////////
  const GetDogWalks = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=dog-walk',
    })
      .then(async function (response) {
        setDogWalks(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [DogWalks]);
  //////////////GetCarParking Api Calling////////////////////
  const GetCarParking = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=parking',
    })
      .then(async function (response) {
        setCarParking(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [CarParking]);
  //////////////GetToilets Api Calling////////////////////
  const GetToilets = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=toilet',
    })
      .then(async function (response) {
        setToilets(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [Toilets]);
  //////////////GetCastle Api Calling////////////////////
  const GetCastle = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=castle',
    })
      .then(async function (response) {
        setCastle(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [Castle]);
  //////////////GetAbout Api Calling////////////////////
  const GetAbout = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=about',
    })
      .then(async function (response) {
        setAbout(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [About]);
  //////////////GetAmenities Api Calling////////////////////
  const GetAmenities = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=amenities',
    })
      .then(async function (response) {
        setAmenities(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [Amenities]);
  //////////////GetGarden Api Calling////////////////////
  const GetGarden = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=garden',
    })
      .then(async function (response) {
        setGarden(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [Garden]);
  //////////////GetNature Api Calling////////////////////
  const GetNature = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=nature',
    })
      .then(async function (response) {
        setNature(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [Nature]);
  //////////////GetHistory Api Calling////////////////////
  const GetHistory = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=history',
    })
      .then(async function (response) {
        setHistory(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [History]);
  //////////////GetPlayParks Api Calling////////////////////
  const GetPlayParks = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=play_park',
    })
      .then(async function (response) {
        setPlayParks(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [PlayParks]);
  //////////////GetPinic Api Calling////////////////////
  const GetPinic = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=picnic_tables_benches',
    })
      .then(async function (response) {
        setPicnic(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [Pinic]);
  //////////////GetViewPoints Api Calling////////////////////
  const GetViewPoints = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=view_point',
    })
      .then(async function (response) {
        setViewPoints(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [ViewPoints]);
  //////////////GetWaterSafety Api Calling////////////////////
  const GetWaterSafety = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=water_safety',
    })
      .then(async function (response) {
        setWaterSafety(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [WaterSafety]);
  //////////////GetExit Api Calling////////////////////
  const GetExit = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=exit',
    })
      .then(async function (response) {
        setExit(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [Exit]);
  //////////////GetEntrance Api Calling////////////////////
  const GetEntrance = useCallback(async () => {
    axios({
      method: 'GET',
      url: BASE_URL + 'location/getLocationByType/?type=entrance',
    })
      .then(async function (response) {
        setEntrance(response.data.result);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }, [Entrance]);
  return (
    <RBSheet
      ref={props.refRBSheet}
      closeOnPressMask={true}
      height={500}
      dragFromTopOnly={true}
      enabledGestureInteraction={false}
      enabledBottomInitialAnimation={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.7)',
        },
        draggableIcon: {
          backgroundColor: theme === false ? 'white' : 'black',
        },
        container: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          height: hp(90),
          backgroundColor: theme === false ? 'white' : 'black',
          borderTopColor: Colors.Appthemecolorprimary,
          borderTopWidth: 15,
        },
      }}>
      <View
        style={{
          paddingVertical: wp(1),
          justifyContent: 'center',
          marginBottom: hp(0.5),
          width: wp(100),
          borderTopLeftRadius: wp(2),
          borderTopRightRadius: wp(2),
        }}>
        <TouchableOpacity
          onPress={() => props.refRBSheet.current.close()}
          activeOpacity={1}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(5),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons
                name={'chevron-down'}
                size={23}
                color={theme === false ? 'grey' : 'white'}
                onPress={() => props.refRBSheet.current.close()}
              />
              <View style={{marginLeft: wp(3)}}>
                <Text
                  style={[
                    LightModestyles.cardDescription,
                    {
                      color: Colors.Appthemecolorprimary,
                      marginTop: hp(0),
                    },
                  ]}>
                  What 's Nearby
                </Text>
              </View>
            </View>
            <Ionicons
              name={'close'}
              size={23}
              color={theme === false ? 'grey' : 'white'}
              onPress={() => props.refRBSheet.current.close()}
              style={{alignSelf: 'flex-end'}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{marginHorizontal: wp(2)}}>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>WalkingRoutes</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'WalkingRoute'),
                  props.refRBSheet.current.close();
              }}>
              <View style={[styles.SeeView]}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'WalkingRoute'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {WalkingRoutes === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={WalkingRoutes}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Walking Routes',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                    <View style={styles.flatlistimgesview}>
                    {item.images.length === 0
                              ? null:
                      <Image
                        source={{
                          uri: item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}/>
                      }
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Dog Walks</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'DogWalks'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'DogWalks'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {DogWalks === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={DogWalks}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Dogs Walk',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                  <View style={styles.flatlistimgesview}>
                    {item.images.length === 0
                              ? null:
                      <Image
                        source={{
                          uri: item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}/>
                      }
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Car parking</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'CarParkings'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'CarParkings'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {CarParking === '' ? null : (
            <FlatList
              data={CarParking}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Car Parkings',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                  <View style={styles.flatlistimgesview}>
                    {item.images.length === 0
                              ? null:
                      <Image
                        source={{
                          uri: item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}/>
                      }
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Toilet locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'Toilets'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'Toilets'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {Toilets === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={Toilets}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Toilets',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                  <View style={styles.flatlistimgesview}>
                    {item.images.length === 0
                              ? null:
                      <Image
                        source={{
                          uri: item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}/>
                      }
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Castle locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'Castle'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'Castle'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {Castle === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={Castle}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Castle',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                  <View style={styles.flatlistimgesview}>
                    {item.images.length === 0
                              ? null:
                      <Image
                        source={{
                          uri: item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}/>
                      }
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Amenities locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'Amenities'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'Amenities'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {Amenities === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={Amenities}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Amenities',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                  <View style={styles.flatlistimgesview}>
                    {item.images.length === 0
                              ? null:
                      <Image
                        source={{
                          uri: item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}/>
                      }
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Garden locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'Garden'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'Garden'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {Garden === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={Garden}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Garden',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                  <View style={styles.flatlistimgesview}>
                    {item.images.length === 0
                              ? null:
                      <Image
                        source={{
                          uri: item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}/>
                      }
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Nature locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'Nature'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'Nature'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {Nature === '' ? null : (
            <FlatList
              data={Nature}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Nature',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                    <View style={styles.flatlistimgesview}>
                    {item.images.length === 0
                              ? null:

                      <Image
                        source={{
                          uri: item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}/>
                      }
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Play Parks locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'PlayParks'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'PlayParks'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {PlayParks === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={PlayParks}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'PlayParks',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                    <View style={{marginBottom: hp(0)}}>
                      <Image
                        source={{
                          uri:
                            item.images.length === 0
                              ? null
                              : item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}></Image>
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Pinic and Benches locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'Pinic'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'Pinic'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {Pinic === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={Pinic}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Pinic',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                    <View style={{marginBottom: hp(0)}}>
                      <Image
                        source={{
                          uri:
                            item.images.length === 0
                              ? null
                              : item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}></Image>
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>ViewPoints locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'ViewPoints'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'ViewPoints'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {ViewPoints === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={ViewPoints}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'ViewPoints',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                    <View style={{marginBottom: hp(0)}}>
                      <Image
                        source={{
                          uri:
                            item.images.length === 0
                              ? null
                              : item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}></Image>
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Water Safety locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'WaterSafety'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'WaterSafety'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {WaterSafety === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={WaterSafety}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'WaterSafety',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                    <View style={{marginBottom: hp(0)}}>
                      <Image
                        source={{
                          uri:
                            item.images.length === 0
                              ? null
                              : item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}></Image>
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Exit locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'Exit'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'Exit'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {Exit === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={Exit}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Exit',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                    <View style={{marginBottom: hp(0)}}>
                      <Image
                        source={{
                          uri:
                            item.images.length === 0
                              ? null
                              : item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}></Image>
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View
          style={{
            borderBottomColor: Colors.Appthemecolorprimary,
            borderBottomWidth: 0.3,
            paddingBottom: hp(3),
          }}>
          <View style={styles.Topicsview}>
            <Text style={styles.sidetext}>Entrance locations</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalkingRouteSearch', 'Entrance'),
                  props.refRBSheet.current.close();
              }}>
              <View style={styles.SeeView}>
                <Text
                  style={[
                    styles.Seetext,
                    {color: theme === false ? 'grey' : 'white'},
                  ]}
                  onPress={() => {
                    navigation.navigate('WalkingRouteSearch', 'Entrance'),
                      props.refRBSheet.current.close();
                  }}>
                  View On Map
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {Entrance === '' ? (
            <View
              style={{
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}>
              <Text style={{color: Colors.Appthemecolorprimary}}>
                No Location
              </Text>
            </View>
          ) : (
            <FlatList
              data={Entrance}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LocationDetail', {
                      navplace: 'Entrance',
                      locid: item._id,
                    }),
                      props.refRBSheet.current.close();
                  }}>
                  <View style={styles.flatlistmainview}>
                    <View style={{marginBottom: hp(0)}}>
                      <Image
                        source={{
                          uri:
                            item.images.length === 0
                              ? null
                              : item.images[0].image_url,
                        }}
                        style={styles.flatlistimgesview}
                        resizeMode="cover"
                        imageStyle={styles.flatlistimage}></Image>
                    </View>

                    <View style={styles.textview}>
                      <Text style={styles.flatlisttitletext} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.flatlisttitletext, {bottom: hp(0)}]}>
                        {item.distance} Km
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </RBSheet>
  );
};

export default LocationsBottomSheet;
