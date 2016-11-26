import React from 'react';
import {
  View,  
  StyleSheet, 
  Text,
  TouchableHighlight
} from 'react-native';

import {Foundation} from '@exponent/vector-icons';
import Colors from '../../constants/Colors';

export default class Button extends React.Component {
    render() {
        return (
            <TouchableHighlight style={styles.button} underlayColor='transparent' onPress={() => this._handleTouch(this.props.quoteId)} >
                <Foundation style={styles.icon} name="heart" size={24} />
            </TouchableHighlight>
        )
    }

    _handleTouch(quoteId) {
        console.log("Quote ID: " + quoteId);
    }
}

const styles = StyleSheet.create({
    icon: {
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
        color: Colors.likeColor
    },
    button: {
        width: 70,
        height:40,
        alignSelf: 'flex-end',
    }
});
