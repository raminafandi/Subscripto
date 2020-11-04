import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.topText}>Subscripto</Text>
      </View>

      <View style={styles.searchBox}>
        <TextInput style={styles.searchBar} placeholder="Hello World"></TextInput>
      </View>


      {/* Items */}
      <View style={styles.items}>

      </View>



      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Add');
        }}
      >
        <Text style={styles.addButton}>Add</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: "#63A69A",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  topText: {
    fontSize: 40,
    color: "white",
    textAlign: 'center',
    marginTop: '10%',
  },

  searchBox:{
    marginTop:-25,
  },

  searchBar:{
    width:"70%",
    marginLeft:'auto',
    marginRight:'auto',
    borderRadius:10,
    backgroundColor:"#fff",
  },

  items: {
    flex: 2
  },

  addButton:{
    position:'absolute',
    bottom:0,
    right:0,
    backgroundColor:"#63A69A",
    borderTopLeftRadius:80,
    padding:30,
    fontSize:20,
    color:"white",
  }

});
export default HomeScreen;
