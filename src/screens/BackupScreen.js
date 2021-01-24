import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function BackupScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '759783871498-enna1b975s687kip03n289a0h53s5m34.apps.googleusercontent.com',
    });
  }, []);
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    console.log('id, credential :', idToken, googleCredential);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then((user) => {
        //after we have the credential - lets check if the user exists in firestore
        var docRef = firestore()
          .collection('users')
          .doc(auth().currentUser.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              //user exists then just update the login time
              return user;
            } else {
              //user doesn't exist - create a new user in firestore
              resolve(addNewUserToFirestore(user));
            }
          })
          .catch((error) => {
            console.error('Checking if customer exists failed" ' + error);
          });
      })
      .catch((error) => {
        console.error('GoogleSignIn to firebase Failed ' + error);
      });
  }

  async function onLogout() {
    return await auth().signOut();
  }

  return (
    <View style={{flex: 1, marginTop: 30}}>
      <TouchableOpacity
        onPress={() => {
          onGoogleButtonPress();
        }}>
        <Text>Sign In with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onLogout();
        }}>
        <Text>Log out with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
