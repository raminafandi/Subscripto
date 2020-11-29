import React, {useState} from 'react';
import {
  TextInput,
  Text,
  Button,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {currencies} from '../utils/currencies';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddScreen = ({navigation}) => {
  const [opened, setOpened] = useState();
  const [language, setLanguage] = useState('peyser');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView style={{flex: 1, marginTop: 20}}>
      <Formik
        initialValues={{
          amount: '',
          name: '',
          billingDate: new Date().toISOString().slice(0, 10),
          period: '',
          periodType: 'm',
          description: '',
          method: 'card',
          currency: 'AZN',
        }}
        onSubmit={(values) => console.log(JSON.stringify(values))}
        validationSchema={yup.object().shape({
          amount: yup.number().required(),
          name: yup.string().required(),
          period: yup.number().required(),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          setFieldValue,
        }) => (
          <>
            <TextInput
              value={values.amount}
              onChangeText={handleChange('amount')}
              onBlur={() => setFieldTouched('amount')}
              placeholder="Amount"
            />
            {touched.amount && errors.amount && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.amount}</Text>
            )}
            <TextInput
              value={values.name}
              onChangeText={handleChange('name')}
              placeholder="Name"
              onBlur={() => setFieldTouched('name')}
            />
            {touched.name && errors.name && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
            )}

            <TextInput
              value={values.description}
              onChangeText={handleChange('description')}
              placeholder="Description"
              onBlur={() => setFieldTouched('description')}
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            <TextInput
              value={values.period}
              onChangeText={handleChange('period')}
              placeholder="Period"
              onBlur={() => setFieldTouched('period')}
            />
            {touched.period && errors.period && (
              <Text style={{fontSize: 10, color: 'red'}}>{errors.period}</Text>
            )}
            <Picker
              selectedValue={language}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}>
              {console.log(currencies)}
              {currencies.map((item) => (
                <Picker.Item label={item.label} value={item.value} />
              ))}
            </Picker>

            {/* 
              <DropDownPicker
                items={[
                  { label: 'Monthly', value: 'm' },
                  { label: 'Yearly', value: 'y' },
                  { label: 'Weekly', value: 'w' },
                ]}
                defaultValue={values.periodType}
                useNativeDriver
                containerStyle={{ height: 40 }}
                isVisible={opened == 'Period'}
                onOpen={() => setOpened('Period')}
                customArrowDown={() => <Icon name="arrow-drop-down" size={35} />}
                customArrowUp={() => <Icon name="arrow-drop-up" size={35} />}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => setFieldValue('periodType', item.value)}
              /> */}

            {/* <DropDownPicker
                items={currencies}
                defaultValue={values.currency}
                containerStyle={{ height: 40 }}
                useNativeDriver
                style={{ backgroundColor: '#fafafa' }}
                isVisible={opened == 'Currency'}
                customArrowDown={() => <Icon name="arrow-drop-down" size={35} />}
                customArrowUp={() => <Icon name="arrow-drop-up" size={35} />}
                onOpen={() => setOpened('Currency')}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => setFieldValue('currency', item.value)}
              /> */}

            {/* <DropDownPicker
                items={[
                  { label: 'By card', value: 'card' },
                  { label: 'By cash', value: 'cash' },
                ]}
                defaultValue={values.method}
                isVisible={opened == 'Method'}
                useNativeDriver
                customArrowDown={() => <Icon name="arrow-drop-down" size={35} />}
                customArrowUp={() => <Icon name="arrow-drop-up" size={35} />}
                onOpen={() => setOpened('Method')}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={(item) => setFieldValue('method', item.value)}
              /> */}

            <Button title="Add" disabled={!isValid} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default AddScreen;
