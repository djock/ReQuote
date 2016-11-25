import React from 'react';
import {
  View,  
  StyleSheet, 
  Text
} from 'react-native';
import {Foundation} from '@exponent/vector-icons';
import Colors from '../../constants/Colors';
import Menu from './Menu';

export default class Card extends React.Component {
    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.quoteText}>{this.props.quote}</Text>
                <Text style={styles.quoteAuthor}>― {this.props.author}</Text>
                <Menu localQuoteCategory={this.props.category}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
 card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        backgroundColor: Colors.mainColorAlfa,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.cardColor
    },
    quoteText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        padding: 25,
        color: 'white',
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 0.5,
            width: 0.5
        }
    },
    quoteAuthor: {
        textAlign: 'right',
        color: 'white',
        fontStyle: 'italic',
        marginRight: 10,
        alignSelf: 'flex-end',
        flexGrow: 1,
        paddingBottom: 20
    },
    actionButton: {
        borderColor: Colors.cardColor,
        borderWidth: 2
    },
});
