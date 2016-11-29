import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import Colors from '../../constants/Colors';
export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
      title: 'Anchored Quotes',
    },
  }

  render() {
    return (
      <ScrollView style={styles.container}>
          <Text style={styles.text}>Favourite quotes page</Text>
          <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          <Text style={styles.text}>Mauris ultrices mauris hendrerit, hendrerit arcu sit amet, porttitor orci</Text>
          <Text style={styles.text}>Aliquam urna lacus, euismod id finibus non, dignissim a libero.</Text>
          <Text style={styles.text}>Pellentesque sit amet odio quis lorem vestibulum molestie</Text>
          <Text style={styles.text}>Mauris ut mauris sit amet eros tincidunt sollicitudin imperdiet vel ligula</Text>
          <Text style={styles.text}>Praesent ac tincidunt nibh</Text>
          <Text style={styles.text}>In hac habitasse platea dictumst</Text>
          <Text style={styles.text}>Pellentesque facilisis sollicitudin iaculis</Text>
          <Text style={styles.text}>Morbi condimentum, magna eget venenatis dictum, enim orci consequat nulla, ac interdum neque ex a tortor</Text>
          <Text style={styles.text}>Vivamus eget neque a felis rutrum fermentum et et ligula</Text>
          <Text style={styles.text}>Sed vel vulputate velit</Text>
          <Text style={styles.text}>Nulla facilisi</Text>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: Colors.backgroundColor,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    color: Colors.mainColor,
    padding: 10,
  }
});
