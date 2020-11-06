import React from 'react';
import { StyleSheet, Text, View,  TextInput, } from 'react-native';

const Input = ({ colorStyle, ...props }) => {
    return (
        <View>
            <Text style={styles.label}>{props.name}</Text>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={(val)=>{props.setFunction(val)}}
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

});
export default Input;
