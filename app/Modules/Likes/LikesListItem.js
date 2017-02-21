import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Colors from '../../Constants/Colors';
import Layout from '../../Constants/Layout';
// import Swipeout from 'react-native-swipeout';

let halfLayoutWidth = Layout.witdh / 2;
let swipeoutBtns = [
  {
    text: 'Delete', type: 'delete'
  }
]
export default class LikesListItem extends React.Component {

    removeQuote(quoteId) {

    }

  render() {
      if(this.props.quote != null) {
        return (
            <View 
            style={styles.container}>
                <View>
                    <Text style={styles.quote}>{this.props.quote}</Text>
                    <View style={styles.quoteInfo}>
                        <Text style={styles.author}>{this.props.author}</Text>
                        <Text style={styles.category}>Category: {this.props.category.toUpperCase()}</Text> 
                    </View>
                </View>
            </View>
        );
      } else {
          return (null);
      }
    
  }

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: Colors.backgroundColor,
    },
    quoteInfo:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.backgroundColor,
        paddingTop: 5
    },
    quote: {
        color: Colors.mainColor,
        fontSize: 18,
        backgroundColor: Colors.backgroundColor,
        paddingTop: 5,
        fontFamily: 'palatino-bold'
    },
    author: {
        flex:0.5,
        height: 30,
        lineHeight: 30,
        backgroundColor: Colors.backgroundColor,
        color: Colors.fadeMainColor,
        fontFamily: 'palatino-italic'
    },
    category: {
        flex:0.5,
        height: 30,
        lineHeight: 30,
        textAlign: 'right',
        fontSize: 8,
        color: 'darkgrey',
        alignSelf: 'flex-end'
    }
});
