import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            colors={['#2193b0', '#6dd5ed']}
            style={styles.linearGradient}>
            <Text style={styles.headerText}>Subscriptions</Text>
          </LinearGradient>
          <View>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              colors={['#614385', '#516395']}
              style={styles.widget}>
              <Image
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1200px-Netflix_2015_N_logo.svg.png',
                }}
                style={styles.logoWidget}
              />
              <View>
                <Text style={styles.titleWidget}>Netflix</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.priceWidget}>$ 9.99</Text>
                  <Text style={styles.subsTypeWidget}>/month</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <View>
                    <Progress.Bar
                      progress={0.8}
                      width={220}
                      height={8}
                      borderColor="black"
                      color="red"
                      style={styles.pbar}
                    />
                  </View>
                  <Text style={styles.remainingTime}>4 days</Text>
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              colors={['#de6262', '#ffb88c']}
              style={styles.widget}>
              <Image
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/1200px-Netflix_2015_N_logo.svg.png',
                }}
                style={styles.logoWidget}
              />
              <View>
                <Text style={styles.titleWidget}>Netflix</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.priceWidget}>$ 9.99</Text>
                  <Text style={styles.subsTypeWidget}>/month</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <View>
                    <Progress.Bar
                      progress={0.25}
                      width={220}
                      height={8}
                      borderColor="black"
                      color="red"
                      style={styles.pbar}
                    />
                  </View>
                  <Text style={styles.remainingTime}>4 days</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  linearGradient: {
    height: 200,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  widget: {
    height: 80,
    borderRadius: 10,
    marginVertical: 16,
    marginHorizontal: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  logoWidget: {
    width: 30,
    height: 50,
    marginHorizontal: 40,
  },
  titleWidget: {
    color: 'white',
    fontSize: 20,
  },
  priceWidget: {
    fontSize: 17,
  },
  subsTypeWidget: {
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
  pbar: {
    marginTop: 6,
    borderRadius: 8,
  },
  remainingTime: {
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 10,
  },
});

export default App;
