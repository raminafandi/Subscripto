import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

const Item = (props) => {
    return (
        <View style={styles.container}>
            <Image style={{width:60,height:60,borderRadius:20,alignSelf:'center',margin:10}} source={require('../assets/logos/netflix.png')}></Image>
            <View style={{flexDirection:"column",margin:20}}>
                <Text style={{fontSize:15}}>{props.name}</Text>
                <Text style={{fontSize:20}}>{props.amount}$</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height:100,
        backgroundColor:'#fff',
        marginTop:10,
        flexDirection:"row",
        borderRadius:20,
    }

});
export default Item;
