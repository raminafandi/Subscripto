import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Switch,
  SafeAreaView,
} from 'react-native';
import {WidgetContext} from '../context/WidgetContext';
import {useTheme} from '../context/ThemeContext';
import {
  handlelocalNotification,
  handleCancel,
  handleCancelLocalNotificationScheduled,
  handlelocalNotificationScheduled,
} from '../services/notificationHandlers';

const DebugScreen = ({navigation}) => {
  const {setScheme, colors, isDark} = useTheme();
  const widgetContext = useContext(WidgetContext);
  const toggleScheme = () => {
    isDark ? setScheme('light') : setScheme('dark');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={[styles.container, {marginTop: 50}]}>
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
        <Button
          title="Instant Notification"
          onPress={() => handlelocalNotification('Hi', 'Hello')}
        />
        <Button
          title="Notification after 5 sec scheduled id:123"
          onPress={() => handlelocalNotificationScheduled('Hi', 'Hello', '123')}
        />
        <Button
          title="Notification after 5 sec scheduled id:1234"
          onPress={() =>
            handlelocalNotificationScheduled('Hi', 'Hello', '1234')
          }
        />
        <Button
          title="Cancel notification id = 123"
          onPress={() => handleCancelLocalNotificationScheduled()}
        />
        <Button
          title="Cancel all notifications"
          onPress={() => handleCancel()}
        />
        <Text style={{color: colors.text}}>Change theme</Text>
        <Switch value={isDark} onValueChange={toggleScheme} />
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
