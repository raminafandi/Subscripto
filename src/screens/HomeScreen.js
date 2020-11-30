import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    SafeAreaView,
    ScrollView,
    StatusBar,
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
                <View style={{ width: '70%', height: 140, backgroundColor: colors.widgetBackground, alignSelf: 'center', borderBottomRightRadius: 30, borderTopLeftRadius: 30, justifyContent: 'center', borderColor: 'red', elevation: 50 }}>
                    <Text style={{ fontSize: 55, color: colors.text, textAlign: 'center', fontWeight: 'bold' }}>18.5$</Text>
                    <Text style={{ fontSize: 20, color: colors.text, textAlign: 'center' }}>Total Amount</Text>
                </View>
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#000', width: '40%', borderTopRightRadius: 30 }}>
                    <Text style={{ padding: 15, fontWeight: 'bold', fontSize: 17, color: '#fff' }}>Subscriptions</Text>
                </View>
            </View>

            {/* Items */}
            <View style={[styles.items, { backgroundColor: colors.primary }]}>
                <View style={{ flex: 1, backgroundColor: colors.background, borderTopRightRadius: 30,position:'relative' }}>
                    {/* Button */}
                    <TouchableWithoutFeedback
                        onPress={() => {
                            navigation.navigate('Add');
                        }}>
                        <View style={[styles.addButton, { backgroundColor: colors.button }]}>
                            <Icon name="plus" size={40} color={colors.icon} />
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10, paddingTop: 30 }}>
                        {items.reverse().map((item, i) => (
                            <Item
                                colorStyle={{ backgroundColor: colors.widgetBackground }}
                                currency={item.currency}
                                name={item.name}
                                amount={item.amount}
                                billing_date={item.billingDate}
                                billing_period={item.billingPeriod}
                                color={item.color} />

                        )
                        )
                        }
                    </ScrollView>
                </View>
            </View>

            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('Debug');
                }}>
                <Text
                    style={[styles.settingsButton, { backgroundColor: colors.button }]}>
                    Set
                </Text>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    top: {
        flex: 1.3,
        position: 'relative',
        justifyContent: 'center'
    },

    appName: {
        margin: 22,
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
    },

    items: {
        flex: 2,
    },

    addButton: {
        width: 65,
        height: 65,
        padding: 10,
        position: 'absolute',
        top: -35,
        right:50,
        borderRadius: 20,
        zIndex:2
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
