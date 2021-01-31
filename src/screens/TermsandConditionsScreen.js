import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text,
} from 'react-native';
import {wsize, hsize} from '../constants/responsive';
import {useTheme} from '../context/ThemeContext';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default function TermsandConditionsScreen({navigation}) {
  const {setScheme, colors, isDark} = useTheme();
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={pressHandler} style={styles.iconBack}>
          <Icon2 name="arrow-back-outline" size={25} color="white" />
        </TouchableOpacity>
        <Text style={[styles.boldText, {color: colors.text}]}>
          Terms & Conditions
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          By downloading or using the app, these terms will automatically apply
          to you – you should make sure therefore that you read them carefully
          before using the app. You’re not allowed to copy, or modify the app,
          any part of the app, or our trademarks in any way. You’re not allowed
          to attempt to extract the source code of the app, and you also
          shouldn’t try to translate the app into other languages, or make
          derivative versions. The app itself, and all the trade marks,
          copyright, database rights and other intellectual property rights
          related to it, still belong to Okito Tech.
        </Text>

        <Text style={[styles.text, {color: colors.text}]}>
          Okito Tech is committed to ensuring that the app is as useful and
          efficient as possible. For that reason, we reserve the right to make
          changes to the app or to charge for its services, at any time and for
          any reason. We will never charge you for the app or its services
          without making it very clear to you exactly what you’re paying for.
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          The Subscripto app stores and processes personal data that you have
          provided to us, in order to provide my Service. It’s your
          responsibility to keep your phone and access to the app secure. We
          therefore recommend that you do not jailbreak or root your phone,
          which is the process of removing software restrictions and limitations
          imposed by the official operating system of your device. It could make
          your phone vulnerable to malware/viruses/malicious programs,
          compromise your phone’s security features and it could mean that the
          Subscripto app won’t work properly or at all.
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          The app does use third party services that declare their own Terms and
          Conditions. Link to Terms and Conditions of third party service
          providers used by the app
        </Text>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://policies.google.com/privacy')
          }>
          <Text style={[styles.text, {color: 'blue'}]}>
            Google Play Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://firebase.google.com/policies/analytics')
          }>
          <Text style={[styles.text, {color: 'blue'}]}>
            Google Analytics for Firebase
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://firebase.google.com/support/privacy/')
          }>
          <Text style={[styles.text, {color: 'blue'}]}>
            Firebase Crashlytics
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text, {color: colors.text}]}>
          You should be aware that there are certain things that Okito Tech will
          not take responsibility for. Certain functions of the app will require
          the app to have an active internet connection. The connection can be
          Wi-Fi, or provided by your mobile network provider, but Okito Tech
          cannot take responsibility for the app not working at full
          functionality if you don’t have access to Wi-Fi, and you don’t have
          any of your data allowance left.
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          If you’re using the app outside of an area with Wi-Fi, you should
          remember that your terms of the agreement with your mobile network
          provider will still apply. As a result, you may be charged by your
          mobile provider for the cost of data for the duration of the
          connection while accessing the app, or other third party charges. In
          using the app, you’re accepting responsibility for any such charges,
          including roaming data charges if you use the app outside of your home
          territory (i.e. region or country) without turning off data roaming.
          If you are not the bill payer for the device on which you’re using the
          app, please be aware that we assume that you have received permission
          from the bill payer for using the app.
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          Along the same lines, Okito Tech cannot always take responsibility for
          the way you use the app i.e. You need to make sure that your device
          stays charged – if it runs out of battery and you can’t turn it on to
          avail the Service, Okito Tech cannot accept responsibility.
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          With respect to Okito Tech’s responsibility for your use of the app,
          when you’re using the app, it’s important to bear in mind that
          although we endeavour to ensure that it is updated and correct at all
          times, we do rely on third parties to provide information to us so
          that we can make it available to you. Okito Tech accepts no liability
          for any loss, direct or indirect, you experience as a result of
          relying wholly on this functionality of the app. At some point, we may
          wish to update the app. The app is currently available on Android –
          the requirements for system(and for any additional systems we decide
          to extend the availability of the app to) may change, and you’ll need
          to download the updates if you want to keep using the app. Okito Tech
          does not promise that it will always update the app so that it is
          relevant to you and/or works with the Android version that you have
          installed on your device. However, you promise to always accept
          updates to the application when offered to you, We may also wish to
          stop providing the app, and may terminate use of it at any time
          without giving notice of termination to you. Unless we tell you
          otherwise, upon any termination, (a) the rights and licenses granted
          to you in these terms will end; (b) you must stop using the app, and
          (if needed) delete it from your device.
        </Text>
        <Text style={[styles.boldText, {color: colors.text}]}>
          Changes to This Terms and Conditions
        </Text>
        <Text style={[styles.text, {color: colors.text}]}>
          I may update our Terms and Conditions from time to time. Thus, you are
          advised to review this page periodically for any changes. I will
          notify you of any changes by posting the new Terms and Conditions on
          this page. These terms and conditions are effective as of 2021-01-30
        </Text>
        <Text style={[styles.boldText, {color: colors.text}]}>Contact Us</Text>
        <Text style={[styles.text, {color: colors.text}]}>
          If you have any questions or suggestions about my Terms and
          Conditions, do not hesitate to contact me at okitotech@gmail.com.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  iconBack: {
    position: 'absolute',
    left: '5%',
    top: '2%',
    backgroundColor: '#ff6200',
    borderRadius: 40,
    padding: wsize(10),
  },
  mainContainer: {
    paddingTop: hsize(120),
    paddingHorizontal: wsize(40),
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: wsize(15),
  },
  text: {
    fontSize: wsize(11),
  },
});
