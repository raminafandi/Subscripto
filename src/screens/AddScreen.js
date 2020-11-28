import * as yup from 'yup'
import { Formik } from 'formik'

import React, { Fragment, useState } from 'react';
import { TextInput, Text, Button, Alert, StyleSheet, SafeAreaView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';



const AddScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
            <Formik
                initialValues={{ amount: '', name: '', billingDate: new Date().toISOString().slice(0, 10),period:'',periodType:'m' ,description: '', method: 'card', currency: 'dollar' }}
                onSubmit={values => console.log(JSON.stringify(values))}
                validationSchema={yup.object().shape({
                    amount: yup
                        .number()
                        .required(),
                    name: yup
                        .string()
                        .required(),
                    period: yup
                        .number()
                        .required(),
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue }) => (
                    <Fragment>
                        <TextInput
                            value={values.amount}
                            onChangeText={handleChange('amount')}
                            onBlur={() => setFieldTouched('amount')}
                            placeholder="Amount"
                        />
                        {touched.amount && errors.amount &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.amount}</Text>
                        }
                        <TextInput
                            value={values.name}
                            onChangeText={handleChange('name')}
                            placeholder="Name"
                            onBlur={() => setFieldTouched('name')}
                        />
                        {touched.name && errors.name &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                        }

                        <TextInput
                            value={values.description}
                            onChangeText={handleChange('description')}
                            placeholder="Description"
                            onBlur={() => setFieldTouched('description')}
                        />

                        <DropDownPicker
                            items={[
                                { label: 'Monthly', value: 'm' },
                                { label: 'Yearly', value: 'y' },
                                { label: 'Weekly', value: 'w' },

                            ]}
                            defaultValue={values.periodType}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={(item) => setFieldValue('periodType', item.value)}
                        />

                        <TextInput
                            value={values.period}
                            onChangeText={handleChange('period')}
                            placeholder="Period"
                            onBlur={() => setFieldTouched('period')}
                        />
                        {touched.period && errors.period &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.period}</Text>
                        }

                        <DatePicker
                            style={{ width: 200 }}
                            mode="date"
                            date={values.billingDate}
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={handleChange('billingDate')}
                        />

                        <DropDownPicker
                            items={[
                                { label: 'By card', value: 'card' },
                                { label: 'By cash', value: 'cash' },

                            ]}
                            defaultValue={values.method}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={(item) => setFieldValue('method', item.value)}
                        />

                        <DropDownPicker
                            items={[
                                { label: 'Dollar', value: 'dollar' },
                                { label: 'Azn', value: 'azn' },

                            ]}
                            defaultValue={values.currency}
                            containerStyle={{ height: 40 }}
                            style={{ backgroundColor: '#fafafa' }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fafafa' }}
                            onChangeItem={(item) => setFieldValue('currency', item.value)}
                        />

                        <Button
                            title='Sign In'
                            disabled={!isValid}
                            onPress={handleSubmit}
                        />
                    </Fragment>
                )}
            </Formik>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({


});
export default AddScreen;
