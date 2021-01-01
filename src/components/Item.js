import React, { useState } from 'react';
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
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';

const Item = ({ navigation, colorStyle, ...props }) => {
  const { colors, isDark } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  // const { } = route.params;
  return (
    <View>
        <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.widgetBackground,
          },
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
            method: props.method
          });
        }}>
        <Icon2
          name={props.iconName.toLowerCase()}
          size={30}
          style={styles.icons}
          color="#000"
        />
        <View
          style={{
            flexDirection: 'column',
            margin: 20,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: colors.text,
            }}>
            {props.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colors.text,
            }}>
            {props.amount} {props.currency} / {props.billing_period}
          </Text>
        </View>
        <View style={styles.progessDate}>
          {/* <ProgressCircle
                percent={80}
                radius={30}
                borderWidth={8}
                color="#3399FF"
                shadowColor="#246890"
                bgColor={colors.widgetBackground}>
                <Text style={{ fontSize: 18, color: colors.text }}>{'24d'}</Text>
              </ProgressCircle> */}
        </View>
      </TouchableOpacity>
      {/* <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            height: 1200, //deyisilmeli
          }}>
          <View style={styles.modalContainer}>
            <Image
              source={{
                uri:
                  'https://variety.com/wp-content/uploads/2020/05/netflix-logo.png',
              }}
              style={styles.modalImage}
            />
            <View>
              <View style={styles.lineContainer}>
                <Text style={styles.lineTitle}>Price</Text>
                <Text style={styles.lineInput}> {props.billing_period} </Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={styles.lineTitle}>Billing Period</Text>
                <Text style={styles.lineInput}> {props.billing_period} </Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={styles.lineTitle}></Text>
                <Text style={styles.lineInput}> {props.billing_period} </Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={styles.lineTitle}>Price</Text>
                <Text style={styles.lineInput}> {props.billing_period} </Text>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, {backgroundColor: 'orange'}]}>
                <Icon name="edit" size={32} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, {backgroundColor: 'red'}]}>
                <Icon name="delete" size={32} color="black" />
              </TouchableOpacity>
            </View>
            <Text
              style={styles.closeText}
              onPress={() => {
                setModalVisible(false);
              }}>
              Close Modal
            </Text>
          </View>
        </View>
      </Modal> */}
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
  icons: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F7F7F9',
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
