import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {useTheme} from '../context/ThemeContext';

const Item = ({colorStyle, ...props}) => {
  const {colors, isDark} = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: colors.widgetBackground}]}>
      <Image
        style={styles.icons}
        source={require('../assets/logos/netflix.png')}></Image>
      <View style={{flexDirection: 'column', margin: 20}}>
        <Text style={{fontSize: 15, color: colors.text}}>{props.name}</Text>
        <Text style={{fontSize: 20, color: colors.text}}>
          {props.amount}$/{props.billing_period}
        </Text>
      </View>
      <View style={styles.progessDate}>
        <ProgressCircle
          percent={30}
          radius={35}
          borderWidth={8}
          color="#3399FF"
          shadowColor="#246890"
          bgColor={colors.widgetBackground}>
          <Text style={{fontSize: 18, color: colors.text}}>{'30%'}</Text>
        </ProgressCircle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: 15,
    flexDirection: 'row',
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
    position: 'absolute',
    right: 15,
    alignSelf: 'center',
  },
});
export default Item;
