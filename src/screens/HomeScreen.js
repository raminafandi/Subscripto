import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
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
  const [currency, setCurrency] = useState();

  useEffect(() => {
    widgetContext.getAllWidgets().then((items) => setItems(items));
  }, [items]);

  useEffect(() => {
    widgetContext.getTotalAmount('USD').then((amount) => {
      return setAmount(amount);
    });

    widgetContext.getCurrency().then((val) => setCurrency(val));
  }, [items]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />

      {/* Top */}
      {/* <View style={[styles.top, { backgroundColor: colors.primary }]}> */}
      <View style={styles.topContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          // colors={['#ff5f6d', '#ffc371']}
          colors={['#FF5357', '#F56E44']}
          style={styles.top}>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Settings');
            }}
            style={[styles.settingsButton, {backgroundColor: '#202835'}]}>
            <Icon2 name="ios-settings-sharp" size={wsize(16)} color="white" />
          </TouchableHighlight>
          <View
            style={[
              styles.totalAmountContainer,
              {backgroundColor: colors.widgetBackground},
            ]}>
            <View style={styles.amountContainer}>
              <Text style={[styles.amount, {color: colors.text}]}>
                {amount}
              </Text>
              <View style={styles.currencyContainer}>
                <Text style={[styles.currency, {color: colors.text}]}>
                  {currency}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: wsize(20),
                color: colors.text,
                textAlign: 'center',
              }}>
              Total Amount
            </Text>
          </View>
          <View style={styles.subscriptionContainer}>
            <Text style={styles.subscriptionText}>Subscriptions</Text>
          </View>
        </LinearGradient>
      </View>
      {/* </View> */}

      {/* Items */}
      <View style={[styles.items, {backgroundColor: '#F56E44'}]}>
        <View
          style={[styles.itemContinerog, {backgroundColor: colors.background}]}>
          {/* Button */}
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Add');
            }}
            style={[styles.addButton, {backgroundColor: '#202835'}]}>
            <Icon name="plus" size={wsize(16)} color={colors.icon} />
          </TouchableHighlight>
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
  container: {
    flex: 1,
    position: 'relative',
  },
  topContainer: {
    height: hsize(360),
  },
  top: {
    flex: 1,
    justifyContent: 'center',
  },
  totalAmountContainer: {
    width: '70%',
    height: hsize(140),
    alignSelf: 'center',
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    borderColor: 'red',
    elevation: 50,
  },
  amount: {
    fontSize: wsize(40),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  currencyContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: hsize(10),
  },
  currency: {
    fontSize: wsize(20),
    textAlign: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  items: {
    flex: 1,
  },
  itemContinerog: {
    flex: 1,
    borderTopRightRadius: 30,
    position: 'relative',
  },
  addButton: {
    width: 60,
    height: 60,
    padding: wsize(10),
    position: 'absolute',
    top: hsize(-35),
    right: wsize(50),
    borderRadius: 100,
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  settingsButton: {
    width: 60,
    height: 60,
    padding: wsize(10),
    position: 'absolute',
    top: hsize(40),
    right: wsize(4),
    borderRadius: wsize(150),
    // zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#202835',
    width: wsize(150),
    borderTopRightRadius: 30,
  },
  subscriptionText: {
    padding: wsize(15),
    fontWeight: 'bold',
    fontSize: wsize(14),
    color: '#fff',
  },
});
export default HomeScreen;
