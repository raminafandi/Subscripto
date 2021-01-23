import React, {useState, useContext} from 'react';
import {
  TextInput,
  Text,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  // KeyboardAvoidingView,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {currencies} from '../utils/currencies';
import {subnames} from '../utils/subnames';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {WidgetContext} from '../context/WidgetContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
import {wsize, hsize} from '../constants/responsive';

const AddScreen = ({navigation}) => {
  const {colors, isDark} = useTheme();
  const widgetContext = useContext(WidgetContext);
  const [show, setShow] = useState(false);
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{flex: 1, marginTop: hsize(20)}}>
      <Formik
        initialValues={{
          amount: '',
          name: '',
          billingDate: new Date(),
          period: 'Monthly',
          description: '',
          method: 'By Card',
          currency: 'USD',
          iconName: 'Netflix',
        }}
        onSubmit={(values) => {
          widgetContext.createWidget(
            values.name,
            values.amount,
            values.currency,
            values.billingDate,
            values.period,
            values.iconName,
            values.description,
            values.paymentMethod,
          );
          navigation.navigate('Home');
        }}
        validationSchema={yup.object().shape({
          amount: yup
            .number()
            .typeError('Amount must be a number')
            .required('Amount is a required field'),
          name: yup.string().required('Name is a required field'),
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
          <ScrollView
            style={[styles.container, {backgroundColor: colors.background}]}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={pressHandler} style={styles.arrowBack}>
                <Icon name="arrow-back-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.mainContainer,
                {backgroundColor: colors.widgetBackground},
              ]}>
              <Picker
                selectedValue={values.iconName}
                itemStyle={styles.pickerItemStyle}
                style={[styles.pickerStyle, {color: colors.text}]}
                dropdownIconColor={colors.text}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue('iconName', itemValue)
                }>
                {subnames.map((item) => (
                  <Picker.Item label={item.label} value={item.value} />
                ))}
              </Picker>
              <View
                style={[
                  styles.tInputWrapper,
                  {backgroundColor: colors.placeholder},
                ]}>
                <TextInput
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholderTextColor="#adb5bd"
                  placeholder="Name"
                  style={{color: colors.text}}
                  onBlur={() => setFieldTouched('name')}
                />
              </View>
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
              <View
                style={[
                  styles.tInputWrapper,
                  {backgroundColor: colors.placeholder},
                ]}>
                <TextInput
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  onBlur={() => setFieldTouched('amount')}
                  placeholder="Amount"
                  placeholderTextColor="#adb5bd"
                  style={{color: colors.text}}
                />
              </View>
              {touched.amount && errors.amount && (
                <Text style={styles.error}>{errors.amount}</Text>
              )}
              <Picker
                selectedValue={values.currency}
                itemStyle={styles.pickerItemStyle}
                style={[styles.pickerStyle, {color: colors.text}]}
                dropdownIconColor={colors.text}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue('currency', itemValue)
                }>
                {currencies.map((item) => (
                  <Picker.Item
                    label={item.value + ' - ' + item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
              <View
                style={[
                  styles.tInputWrapper,
                  {backgroundColor: colors.placeholder},
                ]}>
                <TextInput
                  value={values.description}
                  onChangeText={handleChange('description')}
                  placeholder="Description"
                  onBlur={() => setFieldTouched('description')}
                  style={{color: colors.text}}
                  placeholderTextColor="#adb5bd"
                  multiline
                />
              </View>
              <TouchableWithoutFeedback onPress={() => setShow(true)}>
                <View style={styles.dateContainer}>
                  <Text style={[styles.dateText, {color: colors.text}]}>
                    Date
                  </Text>
                  <Text style={[styles.dateText, {color: colors.text}]}>
                    {new Date(values.billingDate).toISOString().slice(0, 10)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={'date'}
                  is24Hour={true}
                  display="calendar"
                  onChange={(event) => {
                    setShow(false);
                    if (event.nativeEvent['timestamp']) {
                      setFieldValue(
                        'billingDate',
                        event.nativeEvent['timestamp'],
                      );
                    }
                  }}
                />
              )}

              <Picker
                selectedValue={values.period}
                itemStyle={styles.pickerItemStyle}
                style={[styles.pickerStyle, {color: colors.text}]}
                dropdownIconColor={colors.text}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue('period', itemValue)
                }>
                <Picker.Item label={'Daily'} value={'Daily'} />
                <Picker.Item label={'Weekly'} value={'Weekly'} />
                <Picker.Item label={'Monthly'} value={'Monthly'} />
              </Picker>

              <Picker
                selectedValue={values.method}
                itemStyle={styles.pickerItemStyle}
                style={[styles.pickerStyle, {color: colors.text}]}
                dropdownIconColor={colors.text}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue('method', itemValue)
                }>
                <Picker.Item label={'By Card'} value={'By Card'} />
                <Picker.Item label={'By Cash'} value={'By Cash'} />
              </Picker>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleSubmit}>
                  <Text
                    style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: hsize(60),
    marginTop: hsize(40),
  },
  arrowBack: {
    position: 'absolute',
    left: '5%',
    top: '5%',
    backgroundColor: '#ff6200',
    borderRadius: 40,
    padding: wsize(10),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: wsize(30),
    // borderBottomRightRadius: 50,
    margin: wsize(16),
    paddingHorizontal: wsize(20),
    paddingVertical: hsize(20),
  },
  pickerItemStyle: {
    backgroundColor: 'grey',
    color: 'blue',
    fontFamily: 'Ebrima',
    fontSize: 17,
  },
  pickerStyle: {
    // color: 'black',
    // backgroundColor: 'red',
    height: hsize(50),
    width: '100%',
  },
  textInputStyle: {color: 'white'},
  error: {
    fontSize: 14,
    color: 'red',
    marginVertical: hsize(10),
    marginHorizontal: wsize(4),
  },
  tInputWrapper: {
    borderColor: '#343a40',
    // backgroundColor: '#30455e',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: hsize(44),
    justifyContent: 'center',
    marginVertical: hsize(7),
    paddingStart: wsize(5),
  },
  confirmButton: {
    padding: wsize(8),
    backgroundColor: '#ff6200',
    borderRadius: hsize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hsize(25),
  },
  dateContainer: {
    marginHorizontal: wsize(6),
    marginVertical: hsize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {color: 'white', fontSize: 16},
});
export default AddScreen;
