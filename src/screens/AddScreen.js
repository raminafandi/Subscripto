import React, { useState, useContext } from 'react';
import {
    TextInput,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
} from 'react-native';

import * as yup from 'yup';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { currencies } from '../utils/currencies';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { WidgetContext } from '../context/WidgetContext'


const AddScreen = ({ navigation }) => {
    const widgetContext = useContext(WidgetContext)
    const [show, setShow] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
            <Formik
                initialValues={{
                    amount: '',
                    name: '',
                    billingDate: new Date(),
                    period: 'Monthly',        
                    description: '',
                    method: 'By Card',    
                    currency: 'AZN',    
                    iconName: 'Other',      
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
                        values.paymentMethod)
                    navigation.navigate('Home')
                }}
                validationSchema={yup.object().shape({
                    amount: yup.number().required(),
                    name: yup.string().required(),
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
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.amount}</Text>
                            )}
                            <TextInput
                                value={values.name}
                                onChangeText={handleChange('name')}
                                placeholder="Name"
                                onBlur={() => setFieldTouched('name')}
                            />
                            {touched.name && errors.name && (
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                            )}

                            <TextInput
                                value={values.description}
                                onChangeText={handleChange('description')}
                                placeholder="Description"
                                onBlur={() => setFieldTouched('description')}
                            />


                            <TouchableWithoutFeedback onPress={() => setShow(true)}><Text>Date</Text></TouchableWithoutFeedback>
                            <Text>{new Date(values.billingDate).toISOString().slice(0, 10)}</Text>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event) => { setShow(false); setFieldValue('billingDate', event.nativeEvent['timestamp']) }}
                                />
                            )}

                            <Picker
                                selectedValue={values.period}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setFieldValue('period', itemValue)}>
                                <Picker.Item label={'Daily'} value={'Daily'} />
                                <Picker.Item label={'Monthly'} value={'Monthly'} />
                                <Picker.Item label={'Yearly'} value={'Yearly'} />
                            </Picker>

                            <Picker
                                selectedValue={values.iconName}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setFieldValue('iconName', itemValue)}>
                                <Picker.Item label={'Neflix'} value={'Neflix'} />
                                <Picker.Item label={'Spotify'} value={'Spotify'} />
                                <Picker.Item label={'Amazon Prime'} value={'Amazon Prime'} />
                                <Picker.Item label={'Other'} value={'Other'} />
                            </Picker>

                            <Picker
                                selectedValue={values.currency}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setFieldValue('currency', itemValue)}>
                                {currencies.map((item) => (
                                    <Picker.Item label={item.value + ' - ' + item.label} value={item.value} />
                                ))}
                            </Picker>

                            <Picker
                                selectedValue={values.method}
                                style={{ height: 50, width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => setFieldValue('method', itemValue)}>
                                <Picker.Item label={'By Card'} value={'By Card'} />
                                <Picker.Item label={'By Cash'} value={'By Cash'} />
                            </Picker>

                            <Button title="Add" disabled={!isValid} onPress={handleSubmit} />
                        </>
                    )}
            </Formik>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({});
export default AddScreen;
