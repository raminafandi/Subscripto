import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Modal
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
                <Icon style={{marginTop:40,textAlign:'center'}} name='wallet' size={70} color='#FDD12C' />
                <View style={styles.textInfo}>
                    <Text style={styles.textAmount}>Total Amount</Text>
                    <Text style={styles.textNumber}>22.5$</Text>
                </View>
            </View>


            {/* Items */}
            <View style={[styles.items, { backgroundColor: colors.primary }]}>
                <View style={{ flex: 1, backgroundColor: colors.background, borderTopLeftRadius: 80 }}>
                    <Text style={[styles.itemsHeader, { color: colors.text }]}>
                        Subscriptions
                </Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {items.map((item, i) => (
                            <Item
                                lastChild={items.length - 1 == i ? true : false}
                                colorStyle={{ backgroundColor: colors.widgetBackground }}
                                name={item.name}
                                amount={item.amount}
                                billing_date={item.billingDate}
                                billing_period={item.billingPeriod}
                                color={item.color}/>
                          
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
                <View style={[styles.addButton, { backgroundColor: colors.button }]}>
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
        flex: 3,
        zIndex: 1,
        borderBottomRightRadius: 80,
    },

    header: {
        position: 'relative',
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
    },

    textInfo: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        bottom: 50,
        left: 10,
    },

    textAmount: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
    },
    textNumber: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FDD12C',
    },

    items: {
        flex: 7,
    },

    itemsHeader: {
        marginLeft: 30,
        marginTop: 40,
        marginBottom: 10,
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
