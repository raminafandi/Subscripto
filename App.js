import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import DebugScreen from './src/screens/DebugScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import EditScreen from './src/screens/EditScreen';
import BackupScreen from './src/screens/BackupScreen';
import {WidgetContext, WidgetProvider} from './src/context/WidgetContext';
import {ThemeContext, ThemeProvider} from './src/context/ThemeContext';
import {AppearanceProvider} from 'react-native-appearance';
import AnimatedSplash from 'react-native-animated-splash-screen';

const Stack = createStackNavigator();

const MyStack = () => (
  <Stack.Navigator headerMode={'none'}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Debug" component={DebugScreen} />
    <Stack.Screen name="Add" component={AddScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Edit" component={EditScreen} />
    <Stack.Screen name="Backup" component={BackupScreen} />
  </Stack.Navigator>
);

export default React.memo(function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      logoImage={require('./src/assets/logos/main.png')}
      backgroundColor={'#ffffff'}
      logoHeight={260}
      logoWidth={260}>
      <AppearanceProvider>
        <ThemeProvider>
          <WidgetProvider>
            <NavigationContainer>
              <MyStack screenProps={{}} />
            </NavigationContainer>
          </WidgetProvider>
        </ThemeProvider>
      </AppearanceProvider>
    </AnimatedSplash>
  );
});
