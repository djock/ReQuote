import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import Colors from '../../Constants/Colors';

export default class QuotesBrowser extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,        
        backgroundColor: Colors.backgroundColor
    },
     text: {
        color: Colors.mainColor,
        fontSize: 24,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontFamily: 'palatino-bold',
        textAlign: 'center',
     }
});