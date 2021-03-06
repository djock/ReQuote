import Exponent from 'exponent';
import React from 'react';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';
import Colors from './app/Constants/Colors';

import Router from './app/Routes/Router';
import cacheAssetsAsync from './app/Utils/cacheAssetsAsync';

class ReQuote extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        fonts: [
          FontAwesome.font,
          {'palatino': require('./app/Assets/Fonts/Palatino-Regular.ttf')},
          {'palatino-bold': require('./app/Assets/Fonts/Palatino-Bold.ttf')},
          {'palatino-italic': require('./app/Assets/Fonts/Palatino-Italic.ttf')},
        ],
      });
    } catch(e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
        'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({appIsReady: true});
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          <NavigationProvider style={styles.navigation}  router={Router}>
            <StackNavigation style={styles.navigation} id="root" initialRoute={Router.getRoute('rootNavigation')} />
          </NavigationProvider>

          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" translucent={true} hidden={false}  />}
          
          {Platform.OS === 'android' && <StatusBar barStyle="dark-content" translucent={true} hidden={false}  />}
        </View>
      );
    } else {
      return (
        <Exponent.Components.AppLoading />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor
  },
  navigation: {
    backgroundColor: Colors.backgroundColor,
    height: 70
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: Colors.backgroundColor
  },
});

Exponent.registerRootComponent(ReQuote);
