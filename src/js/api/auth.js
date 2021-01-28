import db from '../db/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

const createUserProfile = userProfile =>
  db.collection('profiles').doc(userProfile.uid).set(userProfile);

export const getUserProfile = uid =>
  db
    .collection('profiles')
    .doc(uid)
    .get()
    .then(snapshot => ({ ...snapshot.data() }));

export async function register({
  email,
  password,
  username = '',
  avatar = '',
}) {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { user } = res;

    await createUserProfile({
      uid: user.uid,
      username,
      email,
      avatar,
      joinedChats: [],
    });
    const userProfile = await getUserProfile(user.uid);
    return userProfile;
  } catch (error) {
    return Promise.reject(error.message);
  }
}

export const login = async ({ email, password }) => {
  const { user } = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return getUserProfile(user.uid);
};

export const logout = () => firebase.auth().signOut();

//returns unsubscribe function
export const onAuthStateChanged = onAuth =>
  firebase.auth().onAuthStateChanged(onAuth);
