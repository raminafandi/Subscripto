import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'


const Item = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.icons} source={require('../assets/logos/netflix.png')}></Image>
            <View style={{ flexDirection: "column", margin: 20 }}>
                <Text style={{ fontSize: 15 }}>{props.name}</Text>
                <Text style={{ fontSize: 20 }}>{props.amount}$/{props.billing_period}</Text>
            </View>
            <View style={styles.progessDate}>
                <ProgressCircle
                    percent={30}
                    radius={35}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#246890"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{'30%'}</Text>
                </ProgressCircle>
            </View>

        </View>);
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#fff',
        marginTop: 15,
        flexDirection: "row",
        borderRadius: 20,
    },
    icons: {
        width: 60,
        height: 60,
        borderRadius: 15,
        alignSelf: 'center',
        margin: 20,
    },
    progessDate: {
        position:'absolute',
        right:15,
        alignSelf:'center',
    }

});
export default Item;
