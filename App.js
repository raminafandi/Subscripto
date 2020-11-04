import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import DebugScreen from './src/screens/DebugScreen';
import {WidgetContext, WidgetProvider} from './src/context/WidgetContext';

const Stack = createStackNavigator();

const MyStack = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Debug" component={DebugScreen} />
    <Stack.Screen name="Add" component={AddScreen} />
  </Stack.Navigator>
);

export default React.memo(function App() {
  return (
    <WidgetProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </WidgetProvider>
  );
});
