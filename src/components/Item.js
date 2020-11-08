import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { useTheme } from '../context/ThemeContext';

const Item = ({ colorStyle, ...props }) => {
  const { colors, isDark } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.widgetBackground },props.lastChild && {marginBottom:85}]}>
      <Image
        style={styles.icons}
        source={require('../assets/logos/netflix.png')}></Image>
      <View style={{ flexDirection: 'column', margin: 20 }}>
        <Text style={{ fontSize: 15, color: colors.text }}>{props.name}</Text>
        <Text style={{ fontSize: 20, color: colors.text }}>
          {props.amount}$/{props.billing_period}
        </Text>
      </View>
      <View style={styles.progessDate}>
        <ProgressCircle
          percent={80}
          radius={30}
          borderWidth={8}
          color="#3399FF"
          shadowColor="#246890"
          bgColor={colors.widgetBackground}>
          <Text style={{ fontSize: 18, color: colors.text }}>{'24d'}</Text>
        </ProgressCircle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 80,
    alignSelf: 'center',
    marginTop: 7,
    marginBottom:8,
    flexDirection: 'row',
    borderRadius: 20,
    elevation:3,
    zIndex:2
  },
  icons: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignSelf: 'center',
    margin: 20,
  },
  progessDate: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },
});
export default Item;
