import React, {useState, useContext} from 'react';
import {
  TextInput,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

const DetailsScreen = ({navigation}) => {
  const {colors, isDark} = useTheme();
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 20,
        backgroundColor: colors.background,
      }}>
      <View>
        <ImageBackground
          source={{
            uri:
              'https://sm.pcmag.com/pcmag_in/review/a/amazon-pri/amazon-prime-video_12d1.jpg',
          }}
          style={styles.imgBack}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.6)', height: 250}}>
            <Text style={styles.name}>amazon prime</Text>
            <Text style={styles.price}>13$/month</Text>

            <TouchableOpacity
              onPress={pressHandler}
              style={{
                position: 'absolute',
                left: '5%',
                top: '5%',
                backgroundColor: '#ff6200',
                borderRadius: 40,
                padding: 10,
              }}>
              <Icon name="arrow-back-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.tab}>
          <Text style={styles.tabText1}>Billing Period:</Text>
          <Text style={styles.tabText2}>every month</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText1}>Billing Period:</Text>
          <Text style={styles.tabText2}>every month</Text>
        </View>
        {/* <View style={styles.buttonBottom}> */}
        {/* <View> */}
        <TouchableOpacity
          onPress={pressHandler}
          style={{
            flex: 1,
            flexDirection: 'row',
            // position: 'absolute',
            // bottom: 10,
            alignSelf: 'flex-end',
            justifyContent: 'center',
            backgroundColor: 'red',
            borderWidth: 0.5,
            borderRadius: 20,
          }}>
          <Icon name="arrow-back-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  confirmButton: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#FF5357',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    marginTop: 180,
    marginVertical: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 14,
  },
  buttonBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'red',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  price: {
    color: 'white',
    marginTop: 5,
    marginVertical: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 16,
    paddingHorizontal: 14,
  },
  imgBack: {
    width: '100%',
    height: 250,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  tabText1: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  tabText2: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
export default DetailsScreen;
