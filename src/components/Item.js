import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {useTheme} from '../context/ThemeContext';
import {hsize, wsize} from '../constants/responsive';
import {subnames} from '../utils/subnames';
import {repeatType} from '../utils/repeattype';

const Item = ({navigation, colorStyle, ...props}) => {
  const {colors, isDark} = useTheme();
  const [days, setDays] = useState();
  const [percentage, setPercentage] = useState(0);
  const [iconName, setIconName] = useState('');

  const getLogo = async () => {
    for (var i = 0; i < subnames.length; i++) {
      if (subnames[i].value === props.iconName) {
        console.log(subnames[i]);
        return subnames[i].icon;
      }
    }
  };

  const dayResolver = async () => {
    let nextDate = new Date(props.billing_date);
    while (nextDate - Date.now() < 0) {
      nextDate.setSeconds(
        nextDate.getSeconds() + repeatType[props.billing_period][1],
      );
    }
    return ((nextDate - Date.now()) / 86400000).toFixed(0);
  };

  const percentageFinder = async (dayNumber) => {
    console.log();
    return (dayNumber / repeatType[props.billing_period][2]) * 100;
  };

  useEffect(() => {
    dayResolver().then((val) => {
      setDays(val);
      percentageFinder(val).then((valur) => {
        setPercentage(valur);
        console.log(valur);
      });
    });

    getLogo().then((icon) => setIconName(icon));
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.widgetBackground,
          },
          props.lastItem && {marginBottom: hsize(60)},
        ]}
        onPress={() => {
          navigation.navigate('Details', {
            currency: props.currency,
            name: props.name,
            amount: props.amount,
            billing_date: props.billing_date,
            billing_period: props.billing_period,
            color: props.color,
            iconName: props.iconName,
            description: props.description,
            method: props.method,
            id: props.id,
          });
        }}>
        <View style={styles.iconContainer}>
          <Image source={iconName} style={styles.icon} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            margin: 20,
          }}>
          <Text
            style={{
              fontSize: wsize(15),
              color: colors.text,
            }}>
            {props.name}
          </Text>
          <Text
            style={{
              fontSize: wsize(10),
              color: colors.text,
            }}>
            {props.amount} {props.currency} / {props.billing_period}
          </Text>
        </View>
        <View style={styles.progessDate}>
          <ProgressCircle
            percent={percentage}
            radius={wsize(20)}
            borderWidth={5}
            color="#ff6200"
            shadowColor="#6c757d"
            bgColor={colors.widgetBackground}>
            <Text
              style={{
                fontSize: wsize(11),
                textAlign: 'center',
                color: colors.text,
              }}>
              {days} days
            </Text>
          </ProgressCircle>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 80,
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 8,
    flexDirection: 'row',
    borderRadius: 10,
    zIndex: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F7F7F9',
  },
  icon: {
    width: 50,
    height: 50,
  },
  progessDate: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },
  modalContainer: {
    marginTop: 150,
    marginHorizontal: 10,
    borderRadius: 20,
    height: 400,
    backgroundColor: 'white',
  },
  modalImage: {
    width: Dimensions.width,
    height: 200,
  },
  lineContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 8,
    paddingLeft: 19,
  },
  lineTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    width: 104,
  },
  lineInput: {
    fontSize: 14,
    width: 253,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  modalButton: {
    borderRadius: 20,
  },
});
export default Item;
