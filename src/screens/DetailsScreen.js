import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {WidgetContext} from '../context/WidgetContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {wsize, hsize} from '../constants/responsive';
import Border from '../components/Border';
import {subnames} from '../utils/subnames';
import {sub} from 'react-native-reanimated';

const DetailsScreen = ({route, navigation}) => {
  const {colors, isDark} = useTheme();
  const widgetContext = useContext(WidgetContext);

  const pressHandler = () => {
    navigation.goBack();
  };

  const deleteWidget = (id) => {
    Alert.alert(
      'Delete',
      'Do you want to delete this?', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'Yes',
          onPress: () => {
            widgetContext.deleteWidgetById(id);
            navigation.goBack();
          },
        },
        {text: 'Cancel'},
      ],
      {cancelable: true},
    );
  };

  const uris = {
    Netflix:
      'https://www.nvidia.com/content/dam/en-zz/Solutions/gfn/webassets/geforce-now-og-no-text-1200x630.jpg',
    Spotify: 'https://www.scdn.co/i/_global/open-graph-default.png ',
  };

  const {
    name,
    amount,
    currency,
    billing_date,
    billing_period,
    iconName,
    description,
    method,
    id,
  } = route.params;

  const getPhoto = async () => {
    for (var i = 0; i < subnames.length; i++) {
      if (subnames[i].value === iconName) {
        console.log(subnames[i].image);
        return subnames[i].image;
      }
    }
  };

  const [imageName, setImageName] = useState('');

  useEffect(() => {
    getPhoto().then((image) => setImageName(image));
    console.log(imageName);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View>
        <ImageBackground
          source={{
            uri: imageName,
          }}
          style={styles.imgBack}>
          <View style={{backgroundColor: 'rgba(0,0,0,0.6)', height: 250}}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity onPress={pressHandler} style={styles.iconBack}>
              <Icon name="arrow-back-outline" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteWidget(id)}
              style={styles.deleteIcon}>
              <Icon2 name="delete" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.tab}>
          <Text style={[styles.tabText1, {color: colors.text}]}>Amount</Text>
          <Text style={[styles.tabText2, {color: colors.text}]}>
            {amount} {currency}
          </Text>
        </View>
        <Border />
        <View style={styles.tab}>
          <Text style={[styles.tabText1, {color: colors.text}]}>Method</Text>
          <Text style={[styles.tabText2, {color: colors.text}]}>{method}</Text>
        </View>
        <Border />

        <View style={styles.tab}>
          <Text style={[styles.tabText1, {color: colors.text}]}>
            Description
          </Text>
          <Text style={[styles.tabText2, {color: colors.text}]}>
            {description}
          </Text>
        </View>
        <Border />

        <View style={styles.tab}>
          <Text style={[styles.tabText1, {color: colors.text}]}>
            Billing date
          </Text>
          <Text style={[styles.tabText2, {color: colors.text}]}>
            {new Date(billing_date).toISOString().slice(0, 10)}
          </Text>
        </View>
        <Border />

        <View style={styles.tab}>
          <Text style={[styles.tabText1, {color: colors.text}]}>
            Billing period
          </Text>
          <Text style={[styles.tabText2, {color: colors.text}]}>
            {billing_period}
          </Text>
        </View>
        <Border />
      </View>
      <TouchableOpacity
        style={styles.icon2}
        onPress={() => {
          navigation.navigate('Edit', {
            name,
            amount,
            currency,
            billing_date,
            billing_period,
            iconName,
            description,
            method,
            id,
          });
        }}>
        <Icon2 name="edit" size={25} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  confirmButton: {
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#FF5357',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    marginTop: 200,
    marginVertical: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 14,
  },
  buttonBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'red',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  imgBack: {
    width: '100%',
    height: 250,
    backgroundColor: 'white',
  },
  tab: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    // borderBottomWidth: 1,
    // borderBottomColor: 'grey',
    height: 65,
    padding: 5,
  },
  tabText1: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
  },
  tabText2: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  iconBack: {
    position: 'absolute',
    left: '5%',
    top: '5%',
    backgroundColor: '#ff6200',
    borderRadius: 40,
    padding: 10,
  },
  icon2: {
    position: 'absolute',
    right: '5%',
    bottom: '5%',
    backgroundColor: '#ff6200',
    borderRadius: 40,
    padding: 10,
  },
  deleteIcon: {
    position: 'absolute',
    right: '5%',
    top: '5%',
    backgroundColor: '#ff6200',
    borderRadius: 40,
    padding: 10,
  },
});
export default DetailsScreen;
