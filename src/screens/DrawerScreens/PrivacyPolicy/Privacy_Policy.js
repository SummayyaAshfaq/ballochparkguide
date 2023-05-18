import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  useWindowDimensions,
  Linking
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';

/////////////app styles////////////////
import styles from './styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app redux///////////
import {useSelector, useDispatch} from 'react-redux';
import {setTheme} from '../../../redux/actions';

import { useIsFocused } from '@react-navigation/native';

const PrivacyTerms = ({navigation,route}) => {
  ////////////////////redux/////////////////////
  const {theme, maptheme,navplace} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const isFocused = useIsFocused();


  /////////////////previous data//////////////
  //const [predata]=useState(route.params.navplace)

  //sconsole.log("here props",predata)
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme === false ? 'white' : 'black'},
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[
          styles.container,
          {backgroundColor: theme === false ? 'white' : 'black'},
        ]}>
        <CustomHeader
          headerlabel={isFocused ? navplace:null}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />

        <View
          style={[
            styles.textview,
            {backgroundColor: theme === false ? 'white' : 'black',marginTop:hp(3)},
          ]}>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(90),
              backgroundColor: theme === false ? 'white' : 'black',
            }}>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              Welcome to the Balouch Park (otherwise referred to as: “us”, “we”,
              and "Balouch Park" in the following text) created under the lawful
              abidance of the acts referred to public service and customer care.
              You are reading the privacy policy of our application/website that
              will identify how we manage the information provided by you and
              keep it secure for you.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              How your information is collected:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              Balouch Park offers its users to create an account via email,
              mobile phone, or the Balouch Park application. During the process,
              we might get access to your information public on Google and
              Balouch Park platforms and the information you agreed to provide
              otherwise. If you change any information on the third-party
              applications, we will get automatic access to the new information
              unless you disconnect it from your Balouch Park account.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              What type of information is collected:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              Balouch Park gets access to your public information on your
              third-part profiles, as well as the country, gender, age, and
              social media preferences. The details are necessary to provide you
              with a group of followers who will watch your Balouch Park
              content. With time, the technical and behavioral information
              provided by you is analyzed to maintain your group of followers
              that would help you increase your views as well.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              Bringing your information into use:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              As Balouch Park is aimed at increasing your followers on Balouch
              Park, so, we intend to utilize the given information in developing
              your network. This will be a group of people suitable for the type
              of content you create. Moreover, it will help boost your content
              in the suggested circle to enhance your organic reach. So, you
              should provide accurate information, and we will help secure it
              for you and utilize it in your favor only.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              Sharing your information:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              Balouch Park saves your given information in cloud storage that is
              accessible by a few authorities. We intentionally share the given
              information and the product we develop on the base of it with the
              Balouch Park. Moreover, we collect the information, reproduce it
              in the form of data to share it with our team of advertisers,
              analytics providers, content moderation and measurement service
              providers, and other business partners. We are also bound to share
              your information with court, when and where asked by law-enforcing
              agencies.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              Duration of shared information:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              We keep a log of information for as long as it seems necessary.
              Furthermore, we retain your information even after you leave the
              platform or stop using our platform. It is done for various
              reasons, including the provision established algorithm in case you
              return to the application, for legitimate business purposes, and
              to maintain our statistics. Lastly, the information can always be
              retrieved for legal purposes whenever it is necessary.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              Security of your data:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              Balouch Park cares about the privacy and sensitivity of the
              personal information provided by the customers. We intend to
              protect your given information via encryption and cyber security
              of our cloud storage. But, in any way, we cannot ensure the
              privacy of data transfer from the third parties associated/linked
              to the platform with or without the choice of the customer. If you
              happen to access other websites or applications through our
              platform, you must know that they have their privacy policies
              which might be different from ours.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              Your rights and choices:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              Balouch Park offers you to change, edit, eliminate, or add any
              information related to the account at any time. You can link one
              or more Balouch Park accounts to our application once it is
              downloaded by creating as many profiles as necessary. You may
              unlink your Balouch Park account or delete your profile in the
              Settings. Our application, website, and other online links provide
              you the options to file a complaint against the authorities. We
              also look forward to your feedback on the application, Google
              Playstore, or AppStore.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              Information related to minors:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              Balouch Park is aimed at the target audience of 13 or above and
              might vary in your country. The minimum age is communicated when
              you select the country while creating your profile. We offer you
              to contact us freely if we are found to have personal data of the
              children below the defined age at
             https://balouchpark.com/privacy/ or email us at
            info@balouchpark.com. We discourage the direct
              access of children under 13 to the application, but they might get
              in contact through proper parental guidance. We have a privacy
              policy layout for the minors that allow them to have restricted
              access to the people/network they want to bring in their
              following.
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              //backgroundColor: "orange",
              alignSelf: 'center',
              marginHorizontal: wp(5),
              width: wp(85),
              backgroundColor: theme === false ? 'white' : 'black',
              marginVertical: hp(2),
            }}>
            <Text
              style={[
                styles.maintext,
                {
                  color: theme === false ? 'black' : 'white',
                  marginBottom: hp(1),
                },
              ]}>
              Changes in privacy policy:
            </Text>
            <Text
              style={[
                styles.text,
                {color: theme === false ? 'black' : 'white'},
              ]}>
              Balouch Park may update the privacy policies over time based on
              customer feedback, global reach, and legal interventions related
              to social norms. Every time we update our policies, we will notify
              you via email; if you have subscribed to receive newsletters and
              update notifications via email. Moreover, it will also be
              highlighted on this page with the title Last Updated, followed by
              the date of posting new privacy policies. We intend to make the
              date of effect of the new privacy policies clear and the end of
              the previous one. If there is a change for a limited time we will
              also define the duration. Your acceptance of new policies will be
              assessed by the continued use of the application. In any way you
              do not agree to the updated privacy policies, you must stop using
              the application or accessing your profile.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyTerms;
