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
                <Text style={styles.appName}>Subscripto</Text>

                <View style={{width: '80%', height: 160, backgroundColor: colors.widgetBackground, alignSelf: 'center',borderRadius:10,justifyContent:'center' }}>
                    <Text style={{fontSize:40,color:colors.text,textAlign:'center'}}>Total Amount</Text>
                </View>

            </View>

            {/* Items */}
            <View style={[styles.items, { backgroundColor: colors.primary }]}>
                <View style={{ flex: 1, backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Text style={{padding:15,fontWeight:'bold',fontSize:15,color:colors.text}}>Subscriptions</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
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

            {/* Buttons */}
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('Add');
                }}>
                <View style={styles.addButton}>
                    <Icon name="plus" size={40} color={colors.icon} />
                </View>
            </TouchableWithoutFeedback>

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
        top: 25,
        right: 0,
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
