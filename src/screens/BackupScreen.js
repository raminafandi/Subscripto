import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';

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

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  return (
    <View style={{flex: 1, marginTop: 30}}>
      <TouchableOpacity
        onPress={() => {
          onGoogleButtonPress();
        }}>
        <Text>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
