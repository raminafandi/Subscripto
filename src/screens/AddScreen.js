import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import Input from '../components/Input'
import { WidgetContext } from '../context/WidgetContext';
import validateForm from '../utils/validate';

const AddScreen = ({ navigation }) => {
    const widgetContext = useContext(WidgetContext);
    const [amount, setAmount] = useState({ field: "", error: "" })
    const [name, setName] = useState({ field: "", error: "" })
    const [description, setDesc] = useState({ field: "", error: "" })
    const [billing_date, setDate] = useState({ field: "", error: "" })
    const [billing_period, setPeriod] = useState({ field: "", error: "" })
    const [color, setColor] = useState({ field: "red", error: "" })
    const [pmethod,setMethod] = useState({field:'',error:''})
    const [currency,setCurrency] = useState({field:'$',error:''})
    const [note,setNote] = useState({field:'',error:''})

    const handleForm = () => {
        console.log(amount.field)
        const amountErr = validateForm('amount', amount.field)
        setAmount(amount,{ error: amountErr })
        const nameErr = validateForm('name', name.field)
        setName(name,{ error: nameErr })
        const dateErr = validateForm('date', billing_date.field)
        setDate(billing_date,{ error: dateErr })
        const periodErr = validateForm('period', billing_period.field)
        setPeriod(billing_period,{ error: periodErr })
        

        if (!amountErr && !nameErr && !dateErr && !periodErr) {
            widgetContext.createWidget(name.field, Number(amount.field), currency.field, billing_date.field,
                billing_period.field, color.field, description.field, pmethod.field, note.field)
            navigation.navigate('Home');
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <ScrollView style={{ marginTop: 50 }} showsVerticalScrollIndicator={false}>
                    <Input name="Amount" type='numeric' placeholder="10$" setFunction={setAmount} error={amount.error} />
                    <Input name="Name" placeholder="Netflix" setFunction={setName} error={name.error} />
                    <Input name="Billing date" placeholder="23-08-2020" setFunction={setDate} error={billing_date.error} />
                    <Input name="Billing period" placeholder="Monthly" setFunction={setPeriod} error={billing_period.error} />
                    <Input name="Currency" placeholder="Blue" setFunction={setCurrency} />
                    <Input name="Description (optional)" placeholder="Premium subs" setFunction={setDesc} />
                    {/* <Input name="Color (optional)" placeholder="Blue" setFunction={setColor} /> */}
                    <Input name="Payment Method (optional)" placeholder="Blue" setFunction={setMethod} />
                </ScrollView>

            </View>

            <View style={styles.buttonCantainer}>
                <TouchableWithoutFeedback onPress={handleForm}>
                    <View>
                        <Text style={styles.addButton}>Add</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    formContainer: {
        flex: 4,
        backgroundColor: '#FF3855',
        borderBottomEndRadius: 25,
        borderBottomLeftRadius: 25,

    },

    buttonCantainer: {
        flex: 1,
        justifyContent: 'center'
    },

    addButton: {
        width: 80,
        height: 80,
        textAlignVertical: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: "#FF3851",
        borderRadius: 40,
    }

});
export default AddScreen;
