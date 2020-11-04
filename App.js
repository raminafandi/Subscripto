import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
