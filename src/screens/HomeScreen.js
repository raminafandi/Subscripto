import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    SafeAreaView,
    TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import Item from '../components/Item';

const HomeScreen = ({ navigation }) => {

    const [items, setItems] = useState([
        { name: "Netflix odeme", amount: "12", billing_date: "11 may", billing_period: "week", color: "red" },
        { name: "Netflix odeme", amount: "12", billing_date: "11 may", billing_period: "week", color: "red" },
        { name: "Netflix odeme", amount: "12", billing_date: "11 may", billing_period: "week", color: "red" },
        { name: "Netflix odeme", amount: "12", billing_date: "11 may", billing_period: "week", color: "red" },
        { name: "Netflix odeme", amount: "12", billing_date: "11 may", billing_period: "week", color: "red" },
        { name: "Netflix odeme", amount: "12", billing_date: "11 may", billing_period: "week", color: "red" }
    ])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.top}>
                <Text style={styles.topText}>Subscripto</Text>
            </View>

            <View style={styles.searchBox}>
                <TextInput style={styles.searchBar} placeholder="Hello World"></TextInput>
            </View>


            {/* Items */}
            <View style={styles.items}>
                <Text style={styles.itemsHeader}>Subscriptions</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                {items.map((item) =>
                    <Item
                        name={item.name}
                        amount={item.amount}
                        billing_date={item.billing_date}
                        billing_period={item.billing_period}
                        color={item.color}
                    />
                )}
                </ScrollView>
            </View>



            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('Add');
                }}
            >
                <Text style={styles.addButton}>Add</Text>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    top: {
        flex: 1,
        backgroundColor: "#63A69A",
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },

    topText: {
        fontSize: 40,
        color: "white",
        textAlign: 'center',
        marginTop: '10%',
    },

    searchBox: {
        marginTop: -25,
    },

    searchBar: {
        width: "70%",
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        backgroundColor: "#fff",
    },

    items: {
        flex: 2,
        margin:20,
        marginTop:10,
        marginBottom:0,

    },

    itemsHeader:{
        fontSize:25,
        fontWeight:'bold'
    },

    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: "#63A69A",
        borderTopLeftRadius: 80,
        padding: 30,
        fontSize: 20,
        color: "white",
    }

});
export default HomeScreen;
