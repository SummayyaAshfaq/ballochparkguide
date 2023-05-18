import React,{useEffect,useState} from 'react';
import { 
    View, 
    Text, 
    Dimensions,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Image
} from 'react-native';

//////////////////app components///////////
import CustomButton from '../../../components/Button/CustomButton';

////////////app pakages/////////////
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

///////////////////app redux///////////////////
import { useSelector,useDispatch } from 'react-redux';
import { setTheme,setUserID,setToken } from '../../../redux/actions';

/////////////app styles//////////
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import { BASE_URL } from '../../../utils/ApiRootUrl';


////////////////token api////////////
import { checkPermission } from '../../../api/FCMToken';

///////////////location permission/////////////
import { locationPermission } from '../../../helper/helperFunction';

const SplashScreen = ({navigation}) => {

      ////////////////user fcm token/////////////
const [fcmtoken,setFCMToken] = useState();
 
      ////////////////redux///////////
      const { theme,id,token } = useSelector(state => state.userReducer);
      const dispatch = useDispatch();

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
//////////////Api Calling////////////////////
const GetUser=async(props) => {
axios({
method: 'post',
url: BASE_URL+'user/createUser',
data:{
token : props,
},
})
.then(async function (response) {
    await AsyncStorage.setItem('Userid',response.data.data.user._id);
    await AsyncStorage.setItem('Token',response.data.data.user.token);
    //navigation.navigate('Drawerroute')
})
.catch(function (error) {
if(error)
console.log("error", error)
})
}
const getData = async () => {
    
    try {
       await AsyncStorage.getItem('Userid')
            .then(db => {
                console.log('usertype',{db})
                if(db)
                {
                    themehere()
                        navigation.navigate('Drawerroute');
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
    useEffect( () => {

        themehere()
        //getData()
        checkPermission().then(result => {
            console.log('token here',result)
            setFCMToken(result)
            GetUser(result)
          })
         GetAppTitles()

    },[]);
    const getLocationPermission = async () => {
        const locPermissionDenied = await locationPermission();
      };
          ////////////////Titles States/////////////
const [Titles,setTitles] = useState();
const [SubTitles,setSubTitles] = useState();

    //////////////Titles Api Calling////////////////////
const GetAppTitles=async() => {
axios({
method: 'GET',
url: BASE_URL+'title/getTitles',
})
.then(async function (response) {
setTitles(response.data.result[0].title)
setSubTitles(response.data.result[0].description)
})
.catch(function (error) {
if(error)
console.log("error", error)
})
}
    return (
        <ImageBackground 
        source={require('../../../assets/Auth/blackBG.png')}
        // source={theme === false?require('../../../assets/Auth/white_bg.png') 
        // :require('../../../assets/Auth/blackBG.png')}
        resizeMode="cover" style={styles.container}>
            <StatusBar backgroundColor='black' barStyle='light-content'/>
      {/* {theme === false?
       <StatusBar backgroundColor='white' barStyle='dark-content'/>
           :
           <StatusBar backgroundColor='black' barStyle='light-content'/>
      } */}
   
        <View style={styles.header}>
            <Image 
                //animation="bounceIn"
                //duraton="1500"
                source={require('../../../assets/Auth/white.png')}
           // source={ theme === false?require('../../../assets/Auth/logo.png'):require('../../../assets/Auth/white.png')}
           style={styles.logo1}
            //style={theme === false?styles.logo:styles.logo1}
            resizeMode='cover'
            />
         
        </View>
     
        <View 
            style={[styles.footer, {
                backgroundColor: '#1A513B'
                //backgroundColor: colors.background
            }]}
     
        >
            <Text style={[styles.title, {
                   color: 'white'
                //color: colors.text
            }]}>{Titles}
            </Text>
            <Text style={styles.text}>{SubTitles}</Text>
            <View style={styles.button}>
            <CustomButton
              title={'Get Started'}
              widthset={'80%'}
              iscolor={'splash'}
            //   loading={loading}
            //   disabled={disable}
              onPress={() => navigation.navigate('Drawerroute')}
            /></View>
        </View>
      {/* </View> */}
      </ImageBackground>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.35;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'flex-end',
      alignItems: 'center',

  },
  footer: {
      flex: 0.8,
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
    logo1: {
      width:wp(95),
      height: hp(18),
      marginBottom:hp(12)
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

