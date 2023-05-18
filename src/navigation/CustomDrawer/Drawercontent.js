import React from 'react';
import {View, Image, Switch} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

///////////////app redux////////////////
import {useSelector, useDispatch} from 'react-redux';
import {setTheme, setNavPlace} from '../../redux/actions';

///////////////app styles///////////////////
import LightModestyles from '../../styles/Drawer/LightModestyles';
import DarkModestyles from '../../styles/Drawer/DarkModestyles';
import Colors from '../../utils/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export function DrawerContent(props) {
  ////////////////redux///////////
  const {theme} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = async () => {
    if (theme === true) {
      dispatch(setTheme(false));
      await AsyncStorage.setItem('Apptheme', 'LIGHT');
    } else {
      dispatch(setTheme(true));
      await AsyncStorage.setItem('Apptheme', 'DARK');
    }
  };
  const onToggleSwitch22 = async () => {
    if (isSwitchOn === 'DARK') {
      dispatch(setTheme('LIGHT'));
      await AsyncStorage.setItem('Apptheme', 'LIGHT');
    } else {
      dispatch(setTheme(false));
      await AsyncStorage.setItem('Apptheme', 'DARK');
    }
  };

  return (
    <View
      style={
        theme === false
          ? [
              LightModestyles.container,
              {paddingTop: hp(3), paddingBottom: hp(3)},
            ]
          : [
              DarkModestyles.container,
              {paddingTop: hp(3), paddingBottom: hp(3)},
            ]
      }>
      <DrawerContentScrollView {...props}>
        <View
          style={
            theme === false
              ? LightModestyles.drawerContent
              : DarkModestyles.drawerContent
          }>
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Home.png')}
                style={{width: wp(6.5), height: hp(3)}}
              />
            )}
            label="Home"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() => {
              props.navigation.navigate('MapSearch');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/WalkingRoutes.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Walking Routes"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() => {
              props.navigation.navigate('WalkingRouteSearch', 'WalkingRoute');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/DogWalks.png')}
                style={{width: size, height: size}}
              />
            )}
            label="dog walks"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'DogWalks')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/CarParkings.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Car Parkings"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'CarParkings')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Toilets.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Toilet locations"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'Toilets')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/ViewPoints.png')}
                //style={{width: size, height: size}}
                style={{width: wp(6.5), height: hp(2.2)}}
              />
            )}
            label="View Points"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'ViewPoints')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/PlayParks.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Play Parks"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'PlayParks')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Pinic.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Pinic Tables & Benches"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'Pinic')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Castle.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Castle"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'Castle')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Amenities.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Amenities"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'Amenities')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Nature.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Nature"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'Nature')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Gardens.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Gardens"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'Garden')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/WaterSafety.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Water Safety"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'WaterSafety')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Enter.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Entrance"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'Entrance')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Exit.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Exit"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() =>
              props.navigation.navigate('WalkingRouteSearch', 'Exit')
            }
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Saved.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Saved"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() => {
              props.navigation.navigate('SavedLoctaion');
            }}
          />

          <TouchableRipple
            onPress={() => {
              onToggleSwitch();
            }}>
            <View style={LightModestyles.preference}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={require('../../assets/Drawer/Darkmode.png')}
                  style={{width: wp(7), height: hp(3)}}
                />
                <Text
                  style={[
                    LightModestyles.contentmaintext,
                    {
                      color: theme === false ? 'black' : 'white',
                      marginLeft: wp(8),
                      fontWeight: 'bold',
                    },
                  ]}>
                  Dark Mode
                </Text>
              </View>

              <View>
                <Switch
                  value={theme}
                  onValueChange={onToggleSwitch}
                  color={Colors.Appthemecolorprimary}
                />
              </View>
            </View>
          </TouchableRipple>

          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Translator.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Change Languages"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() => {
              props.navigation.navigate('SupportScreen');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Contactus.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Contact Us"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() => {
              props.navigation.navigate(
                'PrivacyTerms',
                dispatch(setNavPlace('Contact Us')),
              );
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Aboutus.png')}
                style={{width: size, height: size}}
              />
            )}
            label="About Us"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() => {
              props.navigation.navigate(
                'PrivacyTerms',
                dispatch(setNavPlace('About Us')),
              );
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                source={require('../../assets/Drawer/Privacy.png')}
                style={{width: size, height: size}}
              />
            )}
            label="Privacy Policy"
            labelStyle={
              theme === false
                ? LightModestyles.contentmaintext
                : DarkModestyles.contentmaintext
            }
            onPress={() => {
              props.navigation.navigate(
                'PrivacyTerms',
                dispatch(setNavPlace('Privacy Policy')),
              );
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
