import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    SafeAreaView,
    TextInput,
    ScrollView,
    StatusBar
} from 'react-native';
import Item from '../components/Item';
import { WidgetContext } from '../context/WidgetContext'
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Entypo'

const HomeScreen = ({ navigation }) => {
    const { colors, isDark } = useTheme();
    const widgetContext = useContext(WidgetContext)
    const [items, setItems] = useState([])

    useEffect(() => {
        widgetContext.getAllWidgets().then((items) => setItems(items))
    }, [items])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, position: 'relative' }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.primary} translucent={true} />

            {/* Top */}
            <View style={[styles.top, { backgroundColor: colors.primary }]}>
                <Text style={styles.topText}>Subscripto</Text>
            </View>


            {/* Items */}
            <View style={[styles.items,{backgroundColor:colors.background}]}>
                <Text style={[styles.itemsHeader, { color: colors.text }]}>
                    Subscriptions
                </Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {items.map((item,i) => (
                        <Item
                            lastChild = {items.length-1 == i ? true:false}
                            colorStyle={{ backgroundColor: colors.widgetBackground }}
                            name={item.name}
                            amount={item.amount}
                            billing_date={item.billingDate}
                            billing_period={item.billingPeriod}
                            color={item.color}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Buttons */}
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('Add');
                }}>
                <View style={[styles.addButton,{backgroundColor: colors.primary}]}>
                    <Icon name="plus" size={40} color='#fff' />
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('Debug');
                }}>
                <Text
                    style={[styles.settingsButton, { backgroundColor: colors.primary }]}>
                    Set
                </Text>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    top: {
        flex: 2,
        zIndex: -1
    },

    topText: {
        position: 'relative',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white',
        marginTop: '10%',
    },

    items: {
        flex: 5,
        marginTop: 10,
        borderTopLeftRadius: 50,
        marginTop: -100,
    },

    itemsHeader: {
        marginLeft: 30,
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold',
    },

    addButton: {
        width: 65,
        height: 65,
        position: 'absolute',
        bottom: 15,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    settingsButton: {
        opacity: 0,
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderTopRightRadius: 80,
        padding: 30,
        fontSize: 20,
        color: 'white',
    },
});
export default HomeScreen;
