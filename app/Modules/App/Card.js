import React from 'react';
import {
  View,  
  StyleSheet, 
  Text
} from 'react-native';
import {Foundation} from '@exponent/vector-icons';

import Colors from '../../Constants/Colors';
import Layout from '../../Constants/Layout';

export default class Card extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.text}>{this.props.text}</Text>
                    <Text style={styles.author}>{this.props.author}</Text>
                    <Text style={styles.category}>{this.props.category.toUpperCase()}</Text> 
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
 container: {
        flex: 1,     
        justifyContent: 'center',
        alignItems: 'center',
        width: Layout.width,
    },
    card: {
        width: Layout.width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        marginTop: 10,
        textAlign: 'center',
        padding: 20,
        fontFamily: 'palatino-bold',
        color: Colors.mainColor,
        lineHeight: 35
    },
    author: {
        textAlign: 'right',
        color: Colors.fadeMainColor,
        alignSelf: 'center',
        padding: 10,
        fontFamily: 'palatino-italic'
    },
    category: {
        lineHeight: 30,
        alignSelf: 'center',
        fontSize: 8,
        color: 'darkgrey'
    }
});
