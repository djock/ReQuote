import React from 'react';
import {
  View,  
  StyleSheet, 
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import {FontAwesome} from '@exponent/vector-icons';
import Colors from '../../constants/Colors';

import * as Animatable from 'react-native-animatable';

export default class Button extends React.Component {
    componentWillReceiveProps() {
        if(this.props.localProps)
            this.renderButton();
    }
    renderButton() {
        return (
            <TouchableWithoutFeedback style={styles.button} underlayColor='transparent' 
                onPress={() => {this._handleTouch(this.props.quoteId);
                                this.refs.view.bounceOut(800).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
                                }
                } >
                <Animatable.View ref="view">
                    <FontAwesome style={styles.icon} name="heart" size={24} />
                </Animatable.View>
            </TouchableWithoutFeedback>
        )
    }

    _handleTouch(quoteId) {
        console.log("Quote ID: " + quoteId);
    }
    render() {
        return this.renderButton();
    }
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
        color: Colors.likeColor
    },
    button: {
        width: 60,
        height:40,
    }
});
