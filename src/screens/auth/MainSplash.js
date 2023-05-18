import React,{useEffect} from 'react';
import { 
    View, 
    Text, 
    Dimensions,
    StyleSheet,
    StatusBar,
    ImageBackground,
    SafeAreaView
} from 'react-native';


////////////app pakages/////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

///////////////////app redux///////////////////
import { useSelector,useDispatch } from 'react-redux';
import { setTheme } from '../../redux/actions';

/////////////app styles//////////
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

const MainSplash = ({navigation}) => {
 
      ////////////////redux///////////
      const { theme } = useSelector(state => state.userReducer);
      const dispatch = useDispatch();

      const getData = async () => {
    
        try {
           await AsyncStorage.getItem('Userid')
                .then(db => {
                    console.log('usertype',{db})
                    if(db)
                    {
                        themehere()
                            navigation.replace('Drawerroute');
                    }
                    else{
                        setTimeout(() => {
                            navigation.replace('SplashScreen'); // Stack Name
                          }, 1000);
                   }
                            }  
                ).done();
            } catch (error) {
            }
   
    }
      /////////////theme function//////////////
    const themehere =async() => {
        var themehere= await AsyncStorage.getItem('Apptheme');
        if(themehere === 'DARK')
        {
            dispatch(setTheme(true));
        }
    else{
        dispatch(setTheme(false));
    }
      
    }

    useEffect(() => {
        themehere()
        getData();
    },[]);
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        {/* <ImageBackground source={
            require('../../assets/Auth/splash.png') 
       } 
        resizeMode="cover" style={styles.container}>*/}
      {theme === false?
       <StatusBar backgroundColor='white' barStyle='dark-content'/>
           :
           <StatusBar backgroundColor='black' barStyle='light-content'/>
      }
{/* 
      </ImageBackground> */}
      </SafeAreaView>
    );
};

export default MainSplash;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingVertical: 50,
      paddingHorizontal: 30,
      backgroundColor: '#1A513B'
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize:hp(4.9),
      fontWeight: 'bold',
      textAlign:'center'
  },
  text: {
    color: 'white',
      marginTop:5,
      fontSize:hp(1.5),
      textAlign:'center'
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

