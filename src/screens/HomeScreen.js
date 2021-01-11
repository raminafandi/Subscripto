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
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}) => {
  const {colors, isDark} = useTheme();
  const widgetContext = useContext(WidgetContext);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    widgetContext.getAllWidgets().then((items) => setItems(items));
  }, [items]);

  useEffect(()=> {
    widgetContext.getTotalAmount().then((amount)=> setAmount(amount))
  },[])

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
        <View
          style={{
            width: '70%',
            height: 140,
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
              fontSize: 55,
              color: colors.text,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {amount}$
          </Text>
          <Text style={{fontSize: 20, color: colors.text, textAlign: 'center'}}>
            Total Amount
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#202835',
            width: '40%',
            borderTopRightRadius: 30,
          }}>
          <Text
            style={{
              padding: 15,
              fontWeight: 'bold',
              fontSize: 17,
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
                colorStyle={{backgroundColor: colors.widgetBackground}}
                id={item.id}
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

      <TouchableWithoutFeedback
        onPress={() => {
          // navigation.navigate('Debug');
          navigation.navigate('Settings');
        }}>
        <Text style={[styles.settingsButton, {backgroundColor: colors.button}]}>
          Set
        </Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1.3,
    position: 'relative',
    justifyContent: 'center',
  },

  appName: {
    margin: 22,
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },

  items: {
    flex: 2,
  },

  addButton: {
    width: 65,
    height: 65,
    padding: 10,
    position: 'absolute',
    top: -35,
    right: 50,
    borderRadius: 20,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingsButton: {
    opacity: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopRightRadius: 80,
    padding: 30,
    fontSize: 20,
    color: 'white',
  },
});
export default HomeScreen;
