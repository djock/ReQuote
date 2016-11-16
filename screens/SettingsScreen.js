import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import {
  ExponentConfigView,
} from '@exponent/samples';

import Colors from '../constants/Colors';
export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
      title: 'Account'
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}>
        <Text>Account page</Text>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor
  },
});
