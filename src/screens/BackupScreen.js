import React, {useEffect, useState, useContext} from 'react';
import {View, Alert, Text, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {WidgetContext} from '../context/WidgetContext';

export default function BackupScreen() {
  const widgetContext = useContext(WidgetContext);
  const [items, setItems] = useState([]);
  useEffect(() => {
    widgetContext.getAllWidgets().then((items) => setItems(items));
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

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then((user) => {
        //after we have the credential - lets check if the user exists in firestore
        var docRef = firestore().collection('users').doc(user.user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              docRef.update({
                email: user.user.email,
                data: items,
                updateDate: new Date(),
              });
              //user exists then just update the login time
              return user;
            } else {
              //user doesn't exist - create a new user in firestore
              docRef.set({
                email: user.user.email,
                data: items,
                updateDate: new Date(),
                createDate: new Date(),
              });
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

  async function onRestore() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then((user) => {
        //after we have the credential - lets check if the user exists in firestore
        var docRef = firestore().collection('users').doc(user.user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              docRef.get().then(async (data) => {
                await widgetContext.restoreWidgets(data._data.data);
              });
              return user;
            } else {
              Alert.alert(
                'Warning',
                "The data for restore can't be found", // <- this part is optional, you can pass an empty string
                [{text: 'Cancel'}],
                {cancelable: true},
              );
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

  return (
    <View style={{flex: 1, marginTop: 30}}>
      <TouchableOpacity
        onPress={() => {
          onGoogleButtonPress();
        }}>
        <Text>Back Up with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onRestore();
        }}>
        <Text>Restore</Text>
      </TouchableOpacity>
    </View>
  );
}
