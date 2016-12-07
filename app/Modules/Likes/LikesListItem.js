import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Colors from '../../Constants/Colors';
import Layout from '../../Constants/Layout';

let halfLayoutWidth = Layout.witdh / 2;

export default class LikesListItem extends React.Component {

  render() {
      if(this.props.quote != null) {
        return (
            <View style={styles.container}>
                <Text style={styles.quote}>{this.props.quote}</Text>
                <View style={styles.quoteInfo}>
                    <Text style={styles.author}>{this.props.author}</Text>
                    <Text style={styles.category}>Category: {this.props.category.toUpperCase()}</Text> 
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
        padding: 10
    },
    quoteInfo:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 5
    },
    quote: {
        color: Colors.mainColor,
        fontSize: 18,
        marginTop: 5,
        fontWeight: '500'
        
    },
    author: {
        flex:0.5,
        height: 30,
        lineHeight: 30,
        color: Colors.fadeMainColor,
        width: halfLayoutWidth,
        fontStyle: 'italic',
    },
    category: {
        flex:0.5,
        height: 30,
        lineHeight: 30,
        textAlign: 'right',
        fontSize: 8,
        width: halfLayoutWidth,
        color: 'darkgrey',
        alignSelf: 'flex-end'
    }
});
