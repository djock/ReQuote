import React from 'react';
import {
  View,  
  StyleSheet, 
  Text
} from 'react-native';
import {Foundation} from '@exponent/vector-icons';

import Colors from '../Constants/Colors';
import Layout from '../Constants/Layout';

export default class Quote extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.quote}>{this.props.quote}</Text>
                    <Text style={styles.author}>{this.props.author}</Text>
                    {/* <Text style={styles.category}>{this.props.category.toUpperCase()}</Text> */}
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
    quote: {
        fontSize: 22,
        marginTop: 10,
        textAlign: 'center',
        padding: 20,
        color: Colors.mainColor,
        fontFamily: 'palatino-bold',
    },
    author: {
        textAlign: 'right',
        color: Colors.fadeMainColor,
        fontStyle: 'italic',
        alignSelf: 'center',
        fontFamily: 'palatino',
    },
    category: {
        lineHeight: 30,
        alignSelf: 'center',
        fontSize: 8,
        color: 'darkgrey',
    }
});
