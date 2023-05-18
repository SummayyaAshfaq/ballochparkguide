
////////////////////app api//////////////////
import axios from 'axios';
import { BASE_URL } from '../utills/ApiRootUrl';


//////////////////////Api Calling/////////////////
 export  const Signupuser =async (name,email,password,token,type) => {
    console.log("obj:",BASE_URL +'user/register',name,email,password,token,type)
   axios({
      method:'POST',
      url: 
      //BASE_URL +
      'https://ballochparkguide.com/api/user/register',
      data: {
        username:name,
        email: email,
        password:password,
        fcmToken: token,
        signupType:  type,
      },
    })
      .then(function (response) {
        console.log("response", JSON.stringify(response.data))
       //  if (response.data === "Email Already Exist") {
       //    setloading(0);
       //    setdisable(0);
       //    alert("Email Already Exist,Enter other email")
       //  }
       //  else {
       //    setloading(0);
       //    setdisable(0);
       //    navigation.navigate('Subscribe', response.data)
       //  }


      })
      .catch(function (error) {
        console.log("error", error)
      })
  }