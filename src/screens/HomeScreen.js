import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Item from '../components/Item';
import {WidgetContext} from '../context/WidgetContext';
import {useTheme} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {wsize, hsize} from '../constants/responsive';

const HomeScreen = ({navigation}) => {
  const {colors, isDark} = useTheme();
  const widgetContext = useContext(WidgetContext);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    widgetContext.getAllWidgets().then((items) => setItems(items));
  }, [items]);

  useEffect(() => {
    widgetContext.getTotalAmount('USD').then((amount) => {
      return setAmount(amount);
    });
  }, [items]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: 'relative',
      }}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />

      {/* Top */}
      {/* <View style={[styles.top, { backgroundColor: colors.primary }]}> */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        // colors={['#ff5f6d', '#ffc371']}
        colors={['#FF5357', '#F56E44']}
        style={styles.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings');
          }}
          style={[styles.settingsButton, {backgroundColor: '#202835'}]}>
          <Icon2 name="ios-settings-sharp" size={30} color="white" />
        </TouchableOpacity>
        <View
          style={{
            width: '70%',
            height: hsize(140),
            backgroundColor: colors.widgetBackground,
            alignSelf: 'center',
            borderBottomRightRadius: 30,
            borderTopLeftRadius: 30,
            justifyContent: 'center',
            borderColor: 'red',
            elevation: 50,
          }}>
          <Text
            style={{
              fontSize: wsize(55),
              color: colors.text,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {amount}$
          </Text>
          <Text
            style={{
              fontSize: wsize(20),
              color: colors.text,
              textAlign: 'center',
            }}>
            Total Amount
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#202835',
            width: wsize(150),
            borderTopRightRadius: 30,
          }}>
          <Text
            style={{
              padding: wsize(15),
              fontWeight: 'bold',
              fontSize: wsize(17),
              color: '#fff',
            }}>
            Subscriptions
          </Text>
        </View>
      </LinearGradient>
      {/* </View> */}

      {/* Items */}
      <View style={[styles.items, {backgroundColor: '#F56E44'}]}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            borderTopRightRadius: 30,
            position: 'relative',
          }}>
          {/* Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Add');
            }}
            style={[styles.addButton, {backgroundColor: '#202835'}]}>
            <Icon name="plus" size={40} color={colors.icon} />
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{padding: 10, paddingTop: 30}}>
            {items.reverse().map((item, i) => (
              <Item
                lastItem={items.length - 1 == i ? true : false}
                colorStyle={{backgroundColor: colors.widgetBackground}}
                id={item.id}
                key={item.id}
                currency={item.currency}
                name={item.name}
                amount={item.amount}
                billing_date={item.billingDate}
                billing_period={item.billingPeriod}
                color={item.color}
                iconName={item.iconName}
                description={item.description}
                method={item.paymentMethod}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1.3,
    position: 'relative',
    justifyContent: 'center',
  },

  items: {
    flex: 2,
  },

  addButton: {
    width: wsize(65),
    height: hsize(70),
    padding: wsize(10),
    position: 'absolute',
    top: hsize(-35),
    right: wsize(50),
    borderRadius: 20,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingsButton: {
    width: wsize(50),
    height: hsize(55),
    padding: wsize(10),
    position: 'absolute',
    top: hsize(40),
    right: wsize(4),
    borderRadius: 25,
    // zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
