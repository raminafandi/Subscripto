import React from 'react';
import { StyleSheet, Text, View,  TextInput, } from 'react-native';

const Input = ({ colorStyle, ...props }) => {
    return (
        <View>
            <Text style={styles.label}>{props.name}</Text>
            <Text style={styles.error}>{props.error ? props.error:""}</Text>
            <TextInput
                keyboardType={props.type}
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={(val)=>{props.setFunction({field:val})}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginLeft:'10%',
        color: '#fff',
        fontSize: 25,
    },

    input: {
        marginTop: 25,
        marginBottom: 25,
        width: "80%",
        alignSelf: 'center',
        color: '#fff',
        fontSize: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    
    error:{
        color:'#fff',
        marginLeft:'10%',
    }

});
export default Input;
