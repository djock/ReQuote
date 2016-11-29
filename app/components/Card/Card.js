import React from 'react';
import {
  View,  
  StyleSheet, 
  Text
} from 'react-native';
import {Foundation} from '@exponent/vector-icons';

import Colors from '../../constants/Colors';
import Menu from './Menu';
import Layout from '../../constants/Layout';

export default class Card extends React.Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.quoteText}>{this.props.quote}</Text>
                    <Text style={styles.quoteAuthor}>― {this.props.author} ―</Text>
                    <Text style={styles.quoteCategory}>{this.props.category}</Text>
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
    quoteText: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        padding: 20,
        color: Colors.mainColor,
        fontWeight: 'bold',
    },
    quoteAuthor: {
        textAlign: 'right',
        color: Colors.fadeMainColor,
        fontStyle: 'italic',
        alignSelf: 'center',
    },
    quoteCategory: {
        color: 'lightsteelblue',
        fontSize: 10,
        marginTop: 10
    }
});
