import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

////////////////app redux///////////
import { useSelector } from 'react-redux';

const CustomHeader = ({ navigation, headerlabel,iconPress,icon }) => {
    ////////////////////redux/////////////////////
    const { theme } = useSelector(state => state.userReducer);

  return (
      <View style={[styles.headerView,{ backgroundColor: theme ===false? 'white':'black'}]} >
        <View style={styles.iconview}>
          <Icon name={icon} size={25} 
          color= {theme ===false? 'black':'white'}
           onPress={iconPress} />
        </View>
        <View>
          <View style={styles.labelView}>
            <Text style={styles.label}>{headerlabel}</Text>


          </View>
        </View>

      </View>
  );

};


export default CustomHeader;