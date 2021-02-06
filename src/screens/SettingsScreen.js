import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
  Switch,
  SafeAreaView,
} from 'react-native';
import {WidgetContext} from '../context/WidgetContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Border from '../components/Border';
import {useTheme} from '../context/ThemeContext';
import {wsize, hsize} from '../constants/responsive';
import {Picker} from '@react-native-picker/picker';
import {currencies} from '../utils/currencies';
import AsyncStorage from '@react-native-community/async-storage';

const SettingsScreen = ({navigation}) => {
  const {setScheme, colors, isDark} = useTheme();
  const widgetContext = useContext(WidgetContext);
  const toggleScheme = () => {
    isDark ? setScheme('light') : setScheme('dark');
  };
  const pressHandler = () => {
    navigation.goBack();
  };

  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    widgetContext.getCurrency().then((val) => setCurrency(val));
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      {/* <ScrollView style={[]}> */}
      <TouchableOpacity onPress={pressHandler} style={styles.iconBack}>
        <Icon2 name="arrow-back-outline" size={25} color="white" />
      </TouchableOpacity>
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
          <View style={styles.switchLeftContainer}>
            <Icon3
              name="money"
              size={24}
              color={colors.text}
              style={styles.icon}
            />
            <Picker
              selectedValue={currency}
              itemStyle={styles.pickerItemStyle}
              style={[styles.pickerStyle, {color: colors.text}]}
              dropdownIconColor={colors.text}
              onValueChange={(itemValue, itemIndex) => {
                setCurrency(itemValue);
                AsyncStorage.setItem('currency', itemValue);
              }}>
              {currencies.map((item) => (
                <Picker.Item
                  label={item.value + ' - ' + item.label}
                  value={item.value}
                  key={item.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <Border />
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={styles.switchLeftContainer}
            onPress={() =>
              Linking.openURL(
                `market://details?id=com.subscripto`,
              ).catch((err) =>
                Alert.alert('Please check for Google Play Store'),
              )
            }>
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
        <TouchableOpacity style={styles.switchContainer}>
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
        <TouchableOpacity
          style={styles.switchContainer}
          onPress={() => navigation.navigate('Privacy')}>
          <View style={styles.switchLeftContainer}>
            <Icon
              name="policy"
              size={24}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={{color: colors.text}}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>
        <Border />
        <TouchableOpacity
          style={styles.switchContainer}
          onPress={() => navigation.navigate('TermsandConditions')}>
          <View style={styles.switchLeftContainer}>
            <Icon
              name="rule"
              size={24}
              color={colors.text}
              style={styles.icon}
            />
            <Text style={{color: colors.text}}>Terms & Conditions</Text>
          </View>
        </TouchableOpacity>
        <Border />

        {/* </View> */}
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
  pickerItemStyle: {
    backgroundColor: 'grey',
    color: 'blue',
    fontFamily: 'Ebrima',
  },
  pickerStyle: {
    width: wsize(270),
  },
});
export default SettingsScreen;
