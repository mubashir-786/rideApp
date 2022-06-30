// // Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc,getDocs,onSnapshot,setDoc } from "firebase/firestore";
// import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
// /* this ke bd jo bhi likheinge to function ke parameter mey milega  

// */

// const auth = getAuth();
// const provider = new FacebookAuthProvider();
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBbVlDXRY9c3z9z6tFVgRcqMb-XB2U9C0",
    authDomain: "bookride-7602b.firebaseapp.com",
    projectId: "bookride-7602b",
    storageBucket: "bookride-7602b.appspot.com",
    messagingSenderId: "920270864129",
    appId: "1:920270864129:web:cd734b529bdf6c02a1e500"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()



async function ride(userid,username,rideSelect,myaddress,location,pending,price,query) {
    try {
        await addDoc(collection(db, "Ride"), {
         
            userId: userid,
            userName: username,
            ridetype : rideSelect,
            pickup: myaddress,
            dropoff : location,
            status: pending,
            price: price,
            area: query
        });
        console.log("Ride Added")
    }
    catch (e) {  
        alert(e.message)

    }
}
// driver 

async function getRides() {
      const rides = []

    const q = onSnapshot(collection(db, "Ride"),(querySnapshot)=>{
        querySnapshot.forEach((doc) => {
      rides.push({ ...doc.data(), id: doc.id })
    })
    return rides
    })
 
    
    return rides


  }



export {
    ride,
getRides,
    db,
}

// Add a new document in collection "cities"

// function facebookLogin() {
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // The signed-in user info.
//     const user = result.user;

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;
//     console.log(accessToken)

//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = FacebookAuthProvider.credentialFromError(error);

//     // ...
//   })
// }
// export {
//     facebookLogin
// }