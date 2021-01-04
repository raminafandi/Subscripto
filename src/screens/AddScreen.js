import React, {useState, useContext} from 'react';
import {
  TextInput,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {currencies} from '../utils/currencies';
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
          <View style={{flex: 1, backgroundColor: colors.background}}>
            <View
              style={{
                paddingTop: 60,
                marginTop: 40,
              }}>
              <TouchableOpacity
                onPress={pressHandler}
                style={{
                  position: 'absolute',
                  left: '5%',
                  top: '5%',
                  backgroundColor: '#ff6200',
                  borderRadius: 40,
                  padding: 10,
                }}>
                <Icon name="arrow-back-outline" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 8,
                backgroundColor: '#fff',
                borderRadius: 30,
                // borderBottomRightRadius: 50,
                backgroundColor: colors.widgetBackground,
                margin: 10,
                paddingHorizontal: 20,
                paddingVertical: 40,
              }}>
              <Picker
                selectedValue={values.iconName}
                itemStyle={{
                  backgroundColor: 'grey',
                  color: 'blue',
                  fontFamily: 'Ebrima',
                  fontSize: 17,
                }}
                // mode={'dropdown'}
                style={{
                  color: '#ffffff',
                  // backgroundColor: 'red',
                  height: 50,
                  width: '100%',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue('iconName', itemValue)
                }>
                <Picker.Item
                  label={'Netflix'}
                  value={'Netflix'}
                  style={{backgroundColor: 'red'}}
                />
                <Picker.Item label={'Spotify'} value={'Spotify'} />
                <Picker.Item label={'Amazon Prime'} value={'Amazon Prime'} />
                <Picker.Item label={'Other'} value={'Other'} />
              </Picker>

              <View style={styles.tInputWrapper}>
                <TextInput
                  value={values.name}
                  onChangeText={handleChange('name')}
                  placeholderTextColor="#adb5bd"
                  placeholder="Name"
                  style={{color: 'white'}}
                  onBlur={() => setFieldTouched('name')}
                />
              </View>
              {touched.name && errors.name && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
              )}
              <View style={styles.tInputWrapper}>
                <TextInput
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  onBlur={() => setFieldTouched('amount')}
                  placeholder="Amount"
                />
              </View>
              {touched.amount && errors.amount && (
                <Text style={{fontSize: 14, color: 'red'}}>
                  {errors.amount}
                </Text>
              )}
              <Picker
                selectedValue={values.currency}
                style={{height: 50, width: '100%'}}
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
              <View style={styles.tInputWrapper}>
                <TextInput
                  value={values.description}
                  onChangeText={handleChange('description')}
                  placeholder="Description"
                  onBlur={() => setFieldTouched('description')}
                  multiline
                />
              </View>
              <TouchableWithoutFeedback onPress={() => setShow(true)}>
                <View style={{marginLeft: 6}}>
                  <Text>Date</Text>
                  <Text>
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
                  display="default"
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
                style={{height: 50, width: '100%'}}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue('period', itemValue)
                }>
                <Picker.Item label={'Daily'} value={'Daily'} />
                <Picker.Item label={'Weekly'} value={'Weekly'} />
                <Picker.Item label={'Monthly'} value={'Monthly'} />
              </Picker>

              <Picker
                selectedValue={values.method}
                style={{height: 50, width: '100%'}}
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
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  confirmButton: {
    padding: 10,
    backgroundColor: '#ff6200',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  headerText: {
    fontSize: 17,
    marginLeft: 3,
  },
  tInputWrapper: {
    borderColor: '#343a40',
    backgroundColor: '#30455e',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    marginBottom: 14,
    paddingStart: 17,
  },
});
export default AddScreen;
