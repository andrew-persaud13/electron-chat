import firebase from 'firebase/app'
import 'firebase/database'
import db from '../db/firestore'
import { getUserProfile } from './auth'


const getOnlineStatus = isOnline => 
  ({
    state: isOnline ? 'online' : 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  })


export const setUserOnlineStatus = (uid, isOnline) => {
  const userRef = db.doc(`/profiles/${uid}`)
  return userRef.update(getOnlineStatus(isOnline))

}

export const onConnectionChange = onConnection => 
  firebase
    .database()
    .ref('.info/connected') //current logged in user
    .on('value', snapshot => {
      const isConnected = snapshot?.val() || false //might be undefined
      onConnection(isConnected)
    }) 

