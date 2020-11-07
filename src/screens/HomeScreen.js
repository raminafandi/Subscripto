import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  ScrollView
} from 'react-native';
import Item from '../components/Item';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { colors, isDark } = useTheme();
  const [items, setItems] = useState([
    {
      name: 'Netflix odeme',
      amount: '12',
      billing_date: '11 may',
      billing_period: 'week',
      color: 'red',
    },
    {
      name: 'Netflix odeme',
      amount: '12',
      billing_date: '11 may',
      billing_period: 'week',
      color: 'red',
    },
    {
      name: 'Netflix odeme',
      amount: '12',
      billing_date: '11 may',
      billing_period: 'week',
      color: 'red',
    },
    {
      name: 'Netflix odeme',
      amount: '12',
      billing_date: '11 may',
      billing_period: 'week',
      color: 'red',
    },
    {
      name: 'Netflix odeme',
      amount: '12',
      billing_date: '11 may',
      billing_period: 'week',
      color: 'red',
    },
    {
      name: 'Netflix odeme',
      amount: '12',
      billing_date: '11 may',
      billing_period: 'week',
      color: 'red',
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.top, { backgroundColor: colors.primary }]}>
        <Text style={styles.topText}>Subscripto</Text>
        <TextInput
          style={[styles.searchBar, { backgroundColor: colors.widgetBackground }]}
          placeholder="Hello World"
          placeholderTextColor={colors.placeholderColor}></TextInput>

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Add');
          }}>
          <Text style={[styles.addButton, { backgroundColor: colors.primary, borderColor: colors.background }]}>
            Add
          </Text>
        </TouchableWithoutFeedback>

      </View>


      {/* Items */}
      <View style={styles.items}>
        <Text style={[styles.itemsHeader, { color: colors.text }]}>
          Subscriptions
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((item) => (
            <Item
              colorStyle={{ backgroundColor: colors.widgetBackground }}
              name={item.name}
              amount={item.amount}
              billing_date={item.billing_date}
              billing_period={item.billing_period}
              color={item.color}
            />
          ))}
        </ScrollView>
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Debug');
        }}>
        <Text
          style={[styles.settingsButton, { backgroundColor: colors.primary }]}>
          Set
        </Text>
      </TouchableWithoutFeedback>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 2,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  topText: {
    position:'relative',
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    marginTop: '10%',
  },


  searchBar: {
    opacity:0,
    position: 'absolute',
    alignSelf:'center',
    textAlign:'center',
    bottom:70,
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  items: {
    flex: 5,
    margin: 20,
    marginTop: 10,
    marginBottom: 0,
  },

  itemsHeader: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },

  addButton: {
    position:'absolute',
    bottom:-40,
    width: 80,
    height: 80,
    padding: 20,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    borderRadius: 40,
    borderWidth: 10,
  },

  settingsButton: {
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
