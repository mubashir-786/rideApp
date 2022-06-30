
// import {React} from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Alert, Modal, Pressable } from 'react-native';
// import pinImg from '../assets/pin.png';
import * as Location from 'expo-location';
import Autocomplete from 'react-native-autocomplete-input'
import { getRides } from '../../config/firebase';
import Accept from '../../assets/accept.png';
import cancel from '../../assets/cancel.png';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/user/userAction';
// import { rides } from '../../store/user/userAction';


export default function Home({ navigation }) {
    const ads = useSelector(state => state.userReducer.rides)
    // console.log(ads)
    const [modalVisible, setModalVisible] = useState(false);

    const [address, setAddress] = useState('');
    const [query, setQuery] = useState('')
    const [places, setPlaces] = useState([])
    const textClick = () => {
        setAddress(address)

    }
    const [ride, setRide] = useState([])


    const [location, setLocation] = useState({
        latitude: 24.9179871,
        longitude: 67.0961782,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    })
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            Location.watchPositionAsync({
                accuracy: Location.Accuracy.Highest,
                // timeInterval: 100,
                distanceInterval: 2
            }, (currentLocation) => {
                const { coords: { longitude, latitude } } = currentLocation
                setLocation({ ...location, longitude, latitude });
            })

            // console.log(data)


            // console.log(ride[0].userName)

            // let currentLocation = await Location.getCurrentPositionAsync({});
            // const { coords: { longitude, latitude } } = currentLocation

            // setLocation({ ...location, longitude, latitude });
            const data = await getRides()
            setRide(data)
        })();
    }, []);


    const getPlaces = async (text) => {
        setQuery(text)
        const response = await fetch(`https://api.foursquare.com/v3/places/search?query=${text}&near=Karachi&limit=2`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'fsq3tqmOBt/5qyK8YWWDFkCyx26OocKmzYqiIqwPlKxy/xc='
            }
        })
        const { results } = await response.json()
        console.log('result --->', results)
        setPlaces(results)
    }

    // const arr = ['block 3 gulshan e iqbal karachi', 'block 5 gulshan e iqbal karachi', 'block 7 gulshan e iqbal karachi']

    // const contt = () => {
    //     setModalVisible(!modalVisible)
    //     textClick
    // }
    // const itemfunc = (item) => {
    //     setAddress(item)
    // }


    // var nam = 'Enter Your Pickup Location'
    if (!ride.length > 0) {
        return (
            <View style={styles.container}>
                <Text> Loading </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Requests {ride.length}</Text>

                        <View style={{ width: '100%', }} >
                            {ride.map((item, index) => {
                                return (
                                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', height: 50, alignItems: 'center', backgroundColor: '#E8EAED', marginTop: 10, borderRadius: 10 }} >
                                        <Text style={{ fontWeight: '700', paddingLeft: 7 }} >{item.area}  </Text>
                                        <Text>Rs:{item.price}</Text>
                                        <Pressable style={{ marginLeft: 5, height: 40, alignItems: 'center', justifyContent: 'center' }} >
                                            <Image source={Accept} style={{ width: 30, height: 30, marginLeft: 5 }} />
                                        </Pressable>
                                        <Pressable style={{ marginLeft: 5, height: 40, alignItems: 'center',justifyContent:'center',display:'flex'}} >
                                            <Image source={cancel} style={{ width: 30, height: 30, marginLeft: 5 }} />
                                        </Pressable>
                                    </View>)

                            })}



                        </View>


                    </View>
                </View>
            </Modal>
            <Pressable style={[styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle2}>Requests {ride.length}

                </Text>


            </Pressable>

            {/* <TextInput style={styles.input} placeholder="Search" /> */}


            {/* <View style={styles.modelContainer} >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <TextInput style={styles.input} onChangeText={setAddress} value={address} placeholder="Search" />
                            <View style={{ marginTop: 50, width: '100%', height: 100 }}  >
                                {arr.map((item, index) => {
                                    return (
                                        <Pressable onPress={() => itemfunc(item)} key={index}  >
                                            <Text style={{ fontSize: 16, margin: 10 }}>{item}</Text>
                                        </Pressable>
                                    )
                                })}
                           
                            </View>

                            <Pressable
                                style={[styles.button, address ? styles.buttonClose : styles.disable]}
                                onPress={contt}
                                disabled={!address && true}>
                                <Text style={styles.textStyle}>Continue</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable style={[styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle2}>{!address ? nam : address}

                    </Text>
                    <Image source={pinImg} style={{ zIndex: 2, position: 'absolute', top: 8, right: 10 }} />
                  
                </Pressable>

            </View> */}
            <MapView style={styles.map}
                region={location}
            >
                {/* <Marker
                    coordinate={location}
                    title={'me'}
                    description={'my location'}
                /> */}
                <Marker
                    // ref={(ref) => { this.marker = ref; }}

                    onDragEnd={(t, map, coords) => setLocation(coords)}
                    coordinate={location}
                    position={location}
                    centerOffset={{ x: -18, y: -60 }}
                    anchor={{ x: 0.69, y: 1 }}
                // pinColor={COLOR.marker}

                />
            </MapView>


        </View>
    )
}
const styles = StyleSheet.create({
    modelContainer: {
        zIndex: 1,
        position: 'absolute',
        top: 35,
        width: '90%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    disable: {
        backgroundColor: 'grey',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    }
    ,
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    input: {
        height: 50,
        width: '100%',
        position: 'absolute',
        top: 30,
        zIndex: 1,
        // opacity: 0.8,
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderRadius: 15,
        paddingLeft: 10,
        borderColor: 'lightgray',
    },
    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        zIndex: 1,
        // width: '90%',

    },

    textStyle2: {
        color: 'black',
        borderRadius: 20,
        padding: 10,
        fontWeight: '600',

    },
    btn: {
        marginTop: 60,
    }
    ,
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%',
        height: '50%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,

    },
    buttonOpen: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1.5,
        height: 50,
        paddingTop: 5,
        zIndex: 1,
        position: 'absolute',
        bottom: 10,



    },
    buttonClose: {
        backgroundColor: '#2196F3',
        position: 'absolute',
        bottom: 10,
        width: '100%',


    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

    },
    modalText: {
        marginBottom: 15,
        // textAlign: 'center',
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        backgroundColor: 'white',
        right: 0,
        top: 0,
        zIndex: 1
    },
    autocompleteItem: {
        height: 80,
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    autocompleteText: {
        fontSize: 18
    }
});
