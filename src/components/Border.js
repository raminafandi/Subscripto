import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {hsize, wsize} from '../constants/responsive';

export default function Input({bStyle}) {
  return <View style={[styles.container, bStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
