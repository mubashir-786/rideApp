
import React from 'react'
import { useEffect,useState } from 'react'
import { addUser } from '../store/user/userAction'
import { useDispatch } from 'react-redux'
import { SafeAreaView, Text, View, StyleSheet, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Test({ navigation }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
   
    
    dispatch(addUser(null))
    
  },[])
  return (
    <>
    
    </>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
