import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const WidgetContext = React.createContext({
  getAllWidgets: () => {},
  getWidgetById: () => {},
  createWidget: () => {},
  clearStorage: () => {},
});

//   updateWidgetById: () => {},
const WidgetProvider = ({children, ...props}) => {
  const STORAGE_KEY = '@user_widgets';

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      Date.now()
    );
  }

  const getAllWidgets = async () => {
    try {
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      console.log(arr);
      return arr;
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  const getWidgetById = async (id) => {
    try {
      let element = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY)).find(
        (x) => x.id === id,
      );
      console.log(element);
      return element;
    } catch (e) {
      alert('Failed to find data from storage');
    }
  };

  const createWidget = async (
    name = 'test',
    amount = 'test',
    currency = 'test',
    billingDate = 'test',
    billingPeriod = 'test',
    color = 'test',
    description = 'test',
    paymentMethod = 'test',
    note = 'test',
  ) => {
    try {
      let id = guidGenerator();
      const newWidget = {
        id,
        name,
        amount,
        currency,
        billingDate,
        billingPeriod,
        color,
        description,
        paymentMethod,
        note,
      };
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      if (arr) {
        await arr.push(newWidget);
      } else {
        arr = [newWidget];
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      console.log(arr);
      return newWidget;
    } catch (e) {
      alert('Failed to create data ');
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

  return (
    <WidgetContext.Provider
      value={{
        getAllWidgets: getAllWidgets,
        getWidgetById: getWidgetById,
        createWidget: createWidget,
        clearStorage: clearStorage,
      }}>
      {children}
    </WidgetContext.Provider>
  );
};

export {WidgetContext, WidgetProvider};
