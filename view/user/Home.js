
// import {React} from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Alert, Modal, Pressable } from 'react-native';
import pinImg from '../../assets/pin.png';
import DeliveryBoy from '../../assets/delivery-man.png';
import bike from '../../assets/bycicle.png'
import car from '../../assets/car.png'
// import { useDispatch } from 'react-redux'
import { removeUser } from '../../store/user/userAction';
import { addUser } from '../../store/user/userAction';

// import pinImg 
import * as Location from 'expo-location';
import Autocomplete from 'react-native-autocomplete-input'
import { set } from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux'
import { ride } from '../../config/firebase';
import { getDistance, getPreciseDistance } from 'geolib';

export default function Home({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [rideSelect, setRideSelect] = useState('');
    const [price, setPrice] = useState(0);
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    console.log('user from Dashboard component', user)
    const [address, setAddress] = useState('');
    const [stat, setStat] = useState(false);
    const [myaddress, setMyAddress] = useState({
        latitude: 24.9179871,
        longitude: 67.0961782,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    })
    const [query, setQuery] = useState('')
    const [places, setPlaces] = useState([])
    const textClick = () => {
        setAddress(address)

    }


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

            // Location.watchPositionAsync({
            //     accuracy: Location.Accuracy.Highest,
            //     // timeInterval: 100,
            //     distanceInterval: 2
            // }, (currentLocation) => {
            //     const { coords: { longitude, latitude } } = currentLocation
            //     setMyAddress({ ...location, longitude, latitude });
            // })

            let currentLocation = await Location.getCurrentPositionAsync({});
            const { coords: { longitude, latitude } } = currentLocation

            setMyAddress({ ...location, longitude, latitude });
        })();
    }, []);

    const rideConfirm = () => {
        // rideDetail = {
        //     userId: user.id,
        //     userName: user.name,
        //     ridetype : rideSelect,
        //     pickup: myaddress,
        //     dropoff : location,
        //     status: 'pending',
        // }
        var dis = getDistance({ latitude: myaddress.latitude, longitude: myaddress.longitude }, { latitude: location.latitude, longitude: location.longitude })
        var p = dis / 1000 * 60

        // alert('meter:-'+dis + 'km:-'+dis/1000+ 'price:-'+ dis/100*8)

        //    ride(user.id, user.name, rideSelect, myaddress, location, 'pending',p,query)
        alert('price:-' + p)
        // setModalVisible(false);


        console.log('user from Dashboard component', user)



    }
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
    const Pickup = async () => {

        let currentLocation = await Location.getCurrentPositionAsync({});
        const { coords: { longitude, latitude } } = currentLocation

        setMyAddress({ ...location, longitude, latitude });
        console.log('location --->', location)

    }
    // const arr = ['block 3 gulshan e iqbal karachi', 'block 5 gulshan e iqbal karachi', 'block 7 gulshan e iqbal karachi']

    const contt = () => {
        setModalVisible(!modalVisible)
        textClick
    }
    // const itemfunc = (item) => {
    //     setAddress(item)
    // }

    const cont = () => {
        // setModalVisible(true) 
        //    var price 
        //    if (rideSelect === 'bike') {
        //      return  price = dis * 2
        //    }else if (rideSelect === 'car') {
        //         return price = dis * 5
        //     }
        // dis/100*8

    }
    // var nam = 'Enter Your Pickup Location'
    // calculate fare between two destination

    return (
        <View style={styles.container}>
            <View style={styles.auto1} >
                <View style={styles.autocompleteContainer} >
                    <TouchableOpacity onPress={Pickup} >
                        <Autocomplete

                            placeholder="Tab Here To Auto Select Your Location"
                            editable={false}

                        // onPressIn={Pickup}

                        // onChangeText={getPlaces}

                        // flatListProps={{
                        //     keyExtractor: (_, idx) => idx,
                        //     renderItem: ({ item }) => (<View style={styles.autocompleteItem}>
                        //         <Text onPress={() => { setLocation({ ...location, longitude: item.geocodes.main.longitude, latitude: item.geocodes.main.latitude }), setQuery(item.name) }} style={styles.autocompleteText}>{item.name}, {item.location.address}</Text>
                        //     </View>),
                        // }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.auto2} >
                <View style={styles.autocompleteContainer}>

                    <Autocomplete
                        data={places}
                        value={query}
                        placeholder="Enter Your DropOff Location"
                        onChangeText={getPlaces}
                        hideResults={!stat}
                        onPressIn={() => { setStat(true) }}
                        // onPressOut={() => { setStat(false) }}
                        flatListProps={{
                            keyExtractor: (_, idx) => idx,
                            renderItem: ({ item }) => (<View style={styles.autocompleteItem}>
                                <Text onPress={() => { setLocation({ ...location, longitude: item.geocodes.main.longitude, latitude: item.geocodes.main.latitude }), setQuery(item.name), setStat(false) }} style={styles.autocompleteText}>{item.name}, {item.location.address}</Text>
                            </View>),
                        }}
                    />
                </View>
            </View>
            {/* <TextInput style={styles.input} placeholder="Search" /> */}


            <View style={styles.modelContainer} >
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
                            <Text>Choose Ride  {price} </Text>
                            <SafeAreaView style={{ flex: 1 }} >

                                <ScrollView horizontal={true} >

                                    <View style={{ width: '100%', flexDirection: 'row', padding: 20, height: '70%' }}  >
                                        {/* <View style={{flex:1}}>
                                            <Image style={{width:"100%"}}source={DeliveryBoy} />
                                        </View> */}
                                        <TouchableOpacity onPress={() => { setRideSelect('Bike'), console.log(rideSelect) }} >
                                            <View style={rideSelect == 'Bike' ? { width: 130, flex: 1, marginRight: 40, backgroundColor: '#F7F7F9', borderRadius: 10, borderColor: 'black', borderWidth: 1 } : { width: 130, flex: 1, marginRight: 40 }}  >
                                                <Image style={{ width: "100%" }} source={bike} />

                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { setRideSelect('Car'), console.log(rideSelect) }} >
                                            <View style={rideSelect == 'Car' ? { width: 130, flex: 1, backgroundColor: '#F7F7F9', borderRadius: 10, borderColor: 'black', borderWidth: 1 } : { width: 130, flex: 1 }} >
                                                <Image style={{ width: "100%" }} source={car} />
                                            </View>
                                        </TouchableOpacity>


                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                            <Pressable
                                style={{ width: '100%', height: 40, backgroundColor: '#5AB442', borderRadius: 10, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}
                                onPress={rideConfirm}
                            >
                                <Text style={styles.textStyle}>Confirm Ride</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* <Pressable style={[styles.buttonOpen]} >
                    <Text style={styles.textStyle2}>modelContainer

                    </Text>
                    <Image source={pinImg} style={{ zIndex: 2, position: 'absolute', top: 8, right: 10 }} />
                  
                </Pressable> */}

            </View>
            {!stat ? <Pressable style={styles.contbtn} onPress={() => setModalVisible(true)} >
                <Text style={styles.conttxt} > Continue   </Text>
            </Pressable> : null}

            <MapView style={styles.map}
                region={location}
            >
                {/* <Marker
                    coordinate={location}
                    title={'me'}
                    description={'my location'}
                /> */}
                <Marker
                    draggable
                    coordinate={myaddress}
                    position={myaddress}
                    image={pinImg}
                />

                <Marker
                    // ref={(ref) => { this.marker = ref; }}
                    // draggable
                    onDragEnd={(t, map, coords) => setLocation(coords)}
                    coordinate={location}
                    position={location}
                    centerOffset={{ x: -18, y: -60 }}
                    anchor={{ x: 0.69, y: 1 }}
                    // pinColor={COLOR.marker}
                    onDragStart={() => setLocation()}
                />

                <Polyline
                    coordinates={[location, myaddress]}
                    strokeColor="#000"
                    strokeColors={['#7F0000']}
                    strokeWidth={3}
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
        padding: 35,
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
        height: '70%',
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

        // backgroundColor: 'white',

        width: '90%',
        borderRadius: 10,
    },
    auto1: {
        right: 0,
        top: 30,
        flex: 1,
        left: 0,
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        alignItems: 'center',
        // backgroundColor: 'white'
    }
    ,
    auto2: {
        right: 0,
        top: 90,
        flex: 1,
        left: 0,
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        alignItems: 'center',
        // backgroundColor: 'white'
    }
    ,
    autocompleteItem: {
        height: 50,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',

    },
    autocompleteText: {
        fontSize: 12

    },
    contbtn: {
        zIndex: 1,
        flex: 1,
        position: 'absolute',
        bottom: 10,
        width: '90%',
        backgroundColor: '#2196F3',
        // color: 'white'
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,

    },
    conttxt: {
        color: 'white',
        // fontWeight: 'bold',
        fontSize: 20,

    }
});
