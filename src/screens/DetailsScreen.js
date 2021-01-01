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
// import ActionButton from 'react-native-action-button';

const DetailsScreen = ({route,navigation}) => {
  const {colors, isDark} = useTheme();
  const pressHandler = () => {
    navigation.goBack();
  };


  const uris = {
    'Netflix':'https://file.mk.co.kr/meet/2020/01/image_listtop_2020_53348_1579145243.jpg',
    'Spotify':'https://www.scdn.co/i/_global/open-graph-default.png '
  }

  const { name, amount,currency,billing_date,billing_period,iconName,description,method } = route.params;
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
            uri:uris[iconName]
          }}
          style={styles.imgBack}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.6)', height: 250}}>
            <Text style={styles.name}>{name}</Text>
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
          <Text style={styles.tabText1}>Amount</Text>
          <Text style={styles.tabText2}>{amount} {currency}</Text>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabText1}>Method</Text>
          <Text style={styles.tabText2}>{method}</Text>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabText1}>Description</Text>
          <Text style={styles.tabText2}>{description}</Text>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabText1}>Billing date</Text>
          <Text style={styles.tabText2}>{new Date(billing_date).toISOString().slice(0,10)}</Text>
        </View>

        <View style={styles.tab}>
          <Text style={styles.tabText1}>Billing period</Text>
          <Text style={styles.tabText2}>{billing_period}</Text>
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
    marginTop: 200,
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
  imgBack: {
    width: '100%',
    height: 250,
  },
  tab: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    justifyContent:'space-around',
    borderBottomColor: 'grey',
    height:65,
    padding:5
  },
  tabText1: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
  },
  tabText2: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
export default DetailsScreen;
