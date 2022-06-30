
import { collection, onSnapshot } from "firebase/firestore";
import {db} from '../../config/firebase'
function addUser(user) {
    console.log('action --->' , user)
    return {
      type: 'ADD_USER', //nishani
      payload: user
    }
  }
 
  function removeUser() {
    return {
      type: 'REMOVE_USER'
    }
  }
  function mode(data) {
    return {
      type: 'MODE',
      payload: data
    }
  }
  function rides() {
    return (dispatch) => {
      onSnapshot(collection(db, "rides"), (querySnapshot) => {
        const ride = []
        querySnapshot.forEach((doc) => {
          ride.push({ ...doc.data(), id: doc.id })
        })
        dispatch({
          type: 'RIDES', //nishani
          payload: ride
        })
      }) //redux-thunk
    }
    
  }
    
  
   export{
    addUser,
    removeUser,
    mode  ,
    rides
  }