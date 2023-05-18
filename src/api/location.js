
////////////////////app api//////////////////
import axios from 'axios';
import { BASE_URL } from '../utils/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';


//get data api calling
export const GetLocationDetail= async(props) => {
    //console.log("here id:",locationid)
 axios({
    method: 'GET',
    url:BASE_URL+'location/getLocationById/'+props,
  })
  .then(async function (response) {

    console.log("response in location detail", JSON.stringify(response.data))
    // setLocationTitle(response.data.data.title)
    // setLocationDesc(response.data.data.description)
    // setLocationDistance(response.data.data.distance)
    // setLocationTime(response.data.data.avg_time)
    // await AsyncStorage.setItem('Locid',response.data.data._id);
    //GetFindingsDetail(response.data.data._id)
    //dispatch(setRoute(locid))
    // setimage1(response.data.images[0])
    // setimage2(response.data.images[1])
    // setimage3(response.data.images[2])
   
    console.log('flatlist data:',data)
  })
  .catch(function (error) {
    console.log("error", error)
  })
  }                                                                                                          
  //get findings api calling
  const GetFindingsDetail= async(props) => {
    var user= await AsyncStorage.getItem('Userid')
    console.log("userid:",user)
  axios({
    method: 'GET',
    url:BASE_URL+'findings/getUserFindingForLocation/?location_id='+props+'&userId='+user,
  })
  .then(async function (response) {
    console.log("response in location detail", JSON.stringify(response.data))
    // setfindingsID(response.data.result._id)
    // setfindings(response.data.result.findings)
  })
  .catch(function (error) {
    console.log("error", error)
  })
  }  