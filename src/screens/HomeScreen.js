import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.top}>
        <Text style={styles.topText}>Subscripto</Text>
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
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },

  topText: {
    fontSize: 40,
    color: "white",
    textAlign: 'center',
    marginTop: '10%',
  },

  items: {
    flex: 2
  },

  addButton:{
    position:'absolute',
    bottom:0,
    right:0,
    backgroundColor:"#63A69A",
    color:"white",
    padding:30,
    borderTopLeftRadius:80,
    fontSize:20,
  }

});
export default HomeScreen;
