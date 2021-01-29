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
import Icon2 from 'react-native-vector-icons/Ionicons';
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
  const pressHandler = () => {
    console.log('asdasd');
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      {/* <ScrollView style={[]}> */}
      <TouchableOpacity onPress={pressHandler} style={styles.iconBack}>
        <Icon2 name="arrow-back-outline" size={25} color="white" />
      </TouchableOpacity>
      {/* <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          // colors={['#ff5f6d', '#ffc371']}
          colors={['#FF5357', '#F56E44']}
          style={styles.headerContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={[styles.headerText, {color: colors.text}]}>
              Settings
            </Text>
          </View>
        </LinearGradient> */}
      {/* <View style={styles.switchContainer}>
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
        <Border /> */}
      <View style={{marginTop: hsize(100)}}>
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
        <TouchableOpacity
          style={styles.switchContainer}
          onPress={() => navigation.navigate('Backup')}>
          <View style={styles.switchLeftContainer}>
            <Icon
              name="backup"
              size={24}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={{color: colors.text}}>Backup & Restore</Text>
          </View>
        </TouchableOpacity>
        <Border />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
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
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
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
