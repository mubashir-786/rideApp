import { View, Text, Button, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
// import React from 'react'
import logo from '../../assets/logo.png'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import * as Facebook from 'expo-facebook';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/user/userAction';
export default function Login({ navigation }) {
  const dispatch = useDispatch()
 
  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '305641858192053',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const dataa = await response.json()
        Alert.alert('Logged in!', `Hi ${dataa.name}!`);

        console.log(dataa)
        dispatch(addUser(dataa))
        navigation.navigate('driverHome')
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', width: '100%', alignItems: 'center' }} >
      <View style={{ height: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={logo} style={{ zIndex: 1, width: 245, height: 200 }} />

        <MaskedView
          style={{ height: 50, width: '100%' }}
          maskElement={<Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }} >  Book Ride (D) </Text>}
        >

          <LinearGradient
            colors={['red', 'red', 'orange', 'orange', 'orange']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0.33 }}
            style={{ flex: 1 }}
          />
        </MaskedView>

      </View>

      <View style={{ width: '90%', height: '40%', justifyContent: 'space-evenly', alignItems: 'center' }} >
        <TextInput placeholder='Phone Number' style={{ fontSize: 20, fontWeight: 'bold', borderRadius: 10, height: 50, paddingLeft: 20, width: '90%', margin: 10, borderColor: 'lightgray', borderWidth: 1.5, }}  ></TextInput>
        <TouchableOpacity style={{ width: "90%" }}>
          <LinearGradient
            colors={['grey', 'grey']}

            style={{ height: 50, borderRadius: 10, width: '100%' }}

          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white', marginTop: 10 }}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text>-------------Or-------------- </Text>
        <TouchableOpacity onPress={logIn} style={{ width: "90%" }}>


          {/* <Button onPress={logIn} title="Continue to Facebook" color='#4267B2' style={{ flex: 0.1 }} /> */}
          <LinearGradient

            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ height: 50, borderRadius: 10, width: '100%' }}

          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white', marginTop: 10 }}>Continue With Facebook</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </View>
  )
}
