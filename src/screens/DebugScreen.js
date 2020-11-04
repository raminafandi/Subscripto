import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {WidgetContext} from '../context/WidgetContext';

const DebugScreen = ({navigation}) => {
  const widgetContext = useContext(WidgetContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Button
          title="getAll"
          onPress={() => {
            widgetContext.getAllWidgets();
          }}
        />
        <Button
          title="getElement"
          onPress={() => {
            widgetContext.getWidgetById('');
          }}
        />
        <Button
          title="createwidget"
          onPress={() => {
            widgetContext.createWidget();
          }}
        />
        <Button
          title="clearAll"
          onPress={() => {
            widgetContext.clearStorage();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default DebugScreen;
