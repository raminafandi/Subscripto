import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Linking,
  StyleSheet,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';
import {WidgetContext} from '../context/WidgetContext';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Border from '../components/Border';
import {useTheme} from '../context/ThemeContext';
import {
  handlelocalNotification,
  handleCancel,
  handleCancelLocalNotificationScheduled,
  handlelocalNotificationScheduled,
} from '../services/notificationHandlers';

import {wsize, hsize} from '../constants/responsive';

const SettingsScreen = ({navigation}) => {
  const {setScheme, colors, isDark} = useTheme();
  const widgetContext = useContext(WidgetContext);
  const toggleScheme = () => {
    isDark ? setScheme('light') : setScheme('dark');
  };
  /*
MaterialIcons
feedback
notifications
Rasim Mammadoff12:35 AM
nightlight-round
Rasim Mammadoff12:49 AM
https://www.peterboni.net/img/2013-06-24-ios-7-userxlistview/app-7-list-view-lots.png
Rasim Mammadoff1:21 AM
quick-contacts-mail
 */
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={[styles.container]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          // colors={['#ff5f6d', '#ffc371']}
          colors={['#FF5357', '#F56E44']}
          style={styles.headerContainer}>
          <Text style={[styles.headerText, {color: colors.text}]}>
            Settings
          </Text>
        </LinearGradient>
        <View style={styles.switchContainer}>
          <View style={styles.switchLeftContainer}>
            <Icon
              name="notifications"
              size={24}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={{color: colors.text}}>Receive Notifications</Text>
          </View>
          <Switch value={isDark} onValueChange={toggleScheme} />
        </View>
        <Border />
        <View style={styles.switchContainer}>
          <View style={styles.switchLeftContainer}>
            <Icon
              name="nightlight-round"
              size={24}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={[{color: colors.text}]}>Change theme</Text>
          </View>
          <Switch value={isDark} onValueChange={toggleScheme} />
        </View>
        <Border />
        <View style={styles.switchContainer}>
          <TouchableOpacity style={styles.switchLeftContainer}>
            <Icon
              name="feedback"
              size={24}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={{color: colors.text}}>Leave Feedback</Text>
          </TouchableOpacity>
        </View>
        <Border />
        <TouchableOpacity
          style={styles.switchContainer}
          onPress={() => Linking.openURL('mailto:raminefendi@gmail.com')}>
          <View style={styles.switchLeftContainer}>
            <Icon
              name="mail"
              size={24}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={{color: colors.text}}>Contact us</Text>
          </View>
        </TouchableOpacity>
        <Border />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: hsize(50),
    paddingVertical: hsize(20),
    marginBottom: hsize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  icon: {
    paddingRight: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hsize(5),
    paddingVertical: hsize(10),
    paddingHorizontal: wsize(30),
    height: hsize(50),
  },
  switchLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SettingsScreen;
