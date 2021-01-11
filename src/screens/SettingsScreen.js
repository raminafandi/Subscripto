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
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={[styles.container]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          // colors={['#ff5f6d', '#ffc371']}
          colors={['#FF5357', '#F56E44']}
          style={styles.headerContainer}>
          <TouchableOpacity onPress={pressHandler} style={styles.iconBack}>
            <Icon2 name="arrow-back-outline" size={25} color="white" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={[styles.headerText, {color: colors.text}]}>
              Settings
            </Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconBack: {
    // position: 'absolute',
    // left: '5%',
    // top: '5%',
    backgroundColor: '#ff6200',
    borderRadius: 40,
    padding: wsize(10),
    marginLeft: wsize(10),
  },
  headerText: {
    marginLeft: wsize(90),
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
