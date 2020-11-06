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

const AddScreen = ({ navigation }) => {
    const [amount,setAmount] = useState("")
    const [name,setName] = useState("")
    const [description,setDesc] = useState("")
    const [billing_date,setDate] = useState("")
    const [billing_period,setPeriod] = useState("")
    const [color,setColor] = useState("")

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <ScrollView style={{marginTop:50}} showsVerticalScrollIndicator={false}>
                    <Input name="Amount" placeholder="10$" setFunction={setAmount}/>
                    <Input name="Name" placeholder="Netflix" setFunction={setName}/>
                    <Input name="Description (optional)" placeholder="Premium subs" setFunction={setDesc}/>
                    <Input name="Billing date" placeholder="23-08-2020" setFunction={setDate}/>
                    <Input name="Billing period" placeholder="Monthly" setFunction={setPeriod}/>
                    <Input name="Color (optional)" placeholder="Blue" setFunction={setColor}/>
                </ScrollView>

            </View>

            <View style={styles.buttonCantainer}>
                <TouchableWithoutFeedback onPress={()=>console.log(amount,name,description,billing_date,billing_period,color)}>
                    <Text style={styles.addButton}>Add</Text>
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
