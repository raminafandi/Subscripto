import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const WidgetContext = React.createContext({
  getAllWidgets: () => {},
  getWidgetById: () => {},
  createWidget: () => {},
  clearStorage: () => {},
  updateWidgetById: () => {},
  deleteWidgetById: () => {},
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
      if (arr != null) return arr;
      return [];
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
    name,
    amount,
    currency,
    billingDate,
    billingPeriod,
    iconName,
    description,
    paymentMethod,
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
        iconName,
        description,
        paymentMethod,
      };
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      if (arr) {
        await arr.push(newWidget);
      } else {
        arr = [newWidget];
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      // console.log(arr);
      return newWidget;
    } catch (e) {
      alert('Failed to create data ');
    }
  };
  const updateWidgetById = async (
    id,
    name,
    amount,
    currency,
    billingDate,
    billingPeriod,
    iconName,
    description,
    paymentMethod,
  ) => {
    try {
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      for (var elem in arr) {
        if (arr[elem].id === id) {
          arr[elem].name = name;
          arr[elem].amount = amount;
          arr[elem].currency = currency;
          arr[elem].billingDate = billingDate;
          arr[elem].billingPeriod = billingPeriod;
          arr[elem].iconName = iconName;
          arr[elem].description = description;
          arr[elem].paymentMethod = paymentMethod;
        }
      }
      console.log('elem', arr);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      return arr;
    } catch (e) {
      alert('Failed to update data from storage');
    }
  };
  const deleteWidgetById = async (idToRemove) => {
    try {
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY)).filter(
        (item) => item.id !== idToRemove,
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      alert("You've deleted data from storage");
    } catch (e) {
      alert('Failed to delete data from storage');
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
        updateWidgetById: updateWidgetById,
        createWidget: createWidget,
        deleteWidgetById: deleteWidgetById,
        clearStorage: clearStorage,
      }}>
      {children}
    </WidgetContext.Provider>
  );
};

export {WidgetContext, WidgetProvider};
