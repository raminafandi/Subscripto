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
            widgetContext.getWidgetById(
              '3d380758-ec08-615a-0bdf-75a58e581604501766938',
            );
          }}
        />
        <Button
          title="createwidget"
          onPress={() => {
            widgetContext.createWidget(
              'test',
              'test',
              'test',
              'test',
              'test',
              'test',
              'test',
              'test',
              'test',
            );
          }}
        />
        <Button
          title="updatewidget"
          onPress={() => {
            widgetContext.updateWidgetById(
              'ca077cd8-0c99-6d16-6e69-aae73c341604587494440',
              'pey',
              'updated',
              'updated',
              'updated',
              'updated',
              'updated',
              'updated',
              'updated',
              'updated',
            );
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
