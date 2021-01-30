import React, {useEffect, useState, useContext} from 'react';
import {View, Alert, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {WidgetContext} from '../context/WidgetContext';
import {wsize, hsize} from '../constants/responsive';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BackupScreen({navigation}) {
  const {colors, isDark} = useTheme();
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
                Alert.alert(
                  'Success',
                  'The data restored successfully', // <- this part is optional, you can pass an empty string
                  [{text: 'Okay'}],
                  {cancelable: true},
                );
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
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <TouchableOpacity onPress={pressHandler} style={styles.arrowBack}>
        <Icon name="arrow-back-outline" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onGoogleButtonPress();
        }}
        style={styles.button}>
        <Text
          style={[styles.txt, {color: colors.text}]}
          style={[styles.txt, {color: colors.text}]}>
          Back Up with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onRestore();
        }}
        style={styles.button}>
        <Text style={[styles.txt, {color: colors.text}]}>
          Restore with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBack: {
    position: 'absolute',
    left: '5%',
    top: '2%',
    backgroundColor: '#ff6200',
    borderRadius: 40,
    padding: wsize(10),
  },
  button: {
    paddingHorizontal: wsize(30),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hsize(15),
    backgroundColor: '#ff6200',
    width: wsize(300),
    marginBottom: hsize(15),
    borderRadius: wsize(20),
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
