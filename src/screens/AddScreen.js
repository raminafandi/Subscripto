import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const AddScreen = ({navigation}) => {
  const STORAGE_KEY = '@user_widgets';
  const [info, setInfo] = useState('');

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, info);
      alert('Data successfully saved');
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };
  const readData = async () => {
    try {
      const userInfo = await AsyncStorage.getItem(STORAGE_KEY);

      if (userInfo !== null) {
        setInfo(userInfo);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
  };
  const onChangeText = (userInfo) => setInfo(userInfo);

  const onSubmitEditing = () => {
    if (!info) return;
    saveData(info);
    setInfo('');
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.panel}>
            <Text>Enter your data here:</Text>
            <TextInput
              style={styles.input}
              value={info}
              placeholder="Data"
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
            />
            <Text style={styles.text}>Your data is {info}</Text>
            <TouchableOpacity onPress={clearStorage} style={styles.button}>
              <Text style={styles.buttonText}>Clear Storage</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#dcdcdc',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  panel: {
    paddingTop: 40,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    padding: 10,
    backgroundColor: '#dcdcdc',
  },
  input: {
    padding: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    margin: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'yellow',
  },
  buttonText: {
    fontSize: 18,
    color: '#444',
  },
});
export default AddScreen;
