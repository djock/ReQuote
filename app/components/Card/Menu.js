import React from 'react';
import {
  View,  
  StyleSheet, 
  Text
} from 'react-native';

import Colors from '../../constants/Colors';
import Button from './Button';

export default class Menu extends React.Component {
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.quoteCategory}>Category: {this.props.activeQuoteCategory.toUpperCase()}</Text>
            <Button style={styles.button}  onPress={this._onPressHandler}
                    quoteId = {this.props.activeQuoteId}
            />
        </View>
        )
    }
    _onPressHandler() {
        console.log("Touch");
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 296,
        borderTopWidth: 1.5,
        borderColor: Colors.mainColorAlfa,
    },
    quoteCategory: {
        alignSelf: 'flex-start',
        fontSize: 10,
        width: 210,
        marginTop: 15,
        marginLeft: 10,
        color: 'lightcyan',
        flexDirection: 'row',
    },
    button: {
        alignSelf: 'flex-end',
    }
});
