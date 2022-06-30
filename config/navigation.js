
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import Login from '../view/user/Login';
import Home from '../view/user/Home';
import Mainscreen from '../view/mainscreen';
import Test from '../view/Test';
import DriverHome from '../view/driver/driverHome'
import DriverLogin from '../view/driver/driverLogin'
// import Testing from '../view/Test';

const Stack = createNativeStackNavigator()
// const Tab = createMaterialTopTabNavigator()
const Drawer = createDrawerNavigator()

export default function MainNavigator() {
    
    const user = useSelector(state => state.userReducer.user)
  
    return (
        <NavigationContainer>


            {/* {user == null ?
                    <MainDrawer />
                    : <AuthStack />} */}

            
            {user == null ? <MainDrawer /> : <DashboardStack/>}
             

            
          


        </NavigationContainer>
    )
}

const AuthStack = () => {
    return (<>
         <Drawer.Navigator>
       
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Logout" component={Test} />
            {/* <Stack.Screen name="test" component={Test} /> */}
       </Drawer.Navigator>
         {/* <MainDrawer /> */}
        </>
    )
}
const DriverStack = () => {
    return (
        <Drawer.Navigator>
            
            <Drawer.Screen name="driverHome" component={DriverHome} />
            <Drawer.Screen name="Logout" component={Test} />
        </Drawer.Navigator>
    )
}

const DashboardStack = () => {
    const mode = useSelector(state => state.userReducer.mode)
    console.log('mode', mode)
    return (<>
       { mode == 'driver'? <DriverStack/> : <AuthStack/>  }
   </> )
}
const MainDrawer = () => {
    return (
        <Drawer.Navigator 
        screenOptions={{
            headerShown: false
          }}
        >
            <Drawer.Screen name="Mainscreen" component={Mainscreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name='DriverLogin' component={DriverLogin} />
            {/* <Drawer.Screen name="Home" component={Home} /> */}

        </Drawer.Navigator>
    )
}
