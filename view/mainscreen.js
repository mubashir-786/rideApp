import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import {mode} from '../store/user/userAction'
export default function Mainscreen({navigation}) {
  const dispatch = useDispatch()
  return (
    <View style={styles.main} >
       <View style={styles.first} >
       <TouchableOpacity style={{ width: "100%" }}
       onPress={() => {navigation.navigate('Login'), dispatch(mode('user'))}}
       >
          <LinearGradient
            colors={['grey', 'grey']}

            style={{ height: 50, borderRadius: 10, width: '100%' }}

          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white', marginTop: 10 }}>Continue user</Text>
          </LinearGradient>
        </TouchableOpacity>
       </View>

       <View style={styles.second} >
       <TouchableOpacity style={{ width: "100%" }}
       onPress={() => {navigation.navigate('DriverLogin'),dispatch(mode('driver'))}}
       >
          <LinearGradient
            colors={['grey', 'grey']}

            style={{ height: 50, borderRadius: 10, width: '100%' }}

          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white', marginTop: 10 }}>Continue Driver</Text>
          </LinearGradient>
        </TouchableOpacity>
       </View>
    </View>
  )
}
const styles = StyleSheet.create({
 main : {
    flex: 1,
    backgroundColor: 'lightgrey',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
 },
 first : {
     width: '90%',
 },
 second : {
        width: '90%',
 }

})