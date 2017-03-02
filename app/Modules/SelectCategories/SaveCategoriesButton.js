import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Colors from '../../Constants/Colors';
import Layout from '../../Constants/Layout';

export default class SaveCategoriesButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaved: false,
            text: 'Save'
        };
    }

    animateButton() {
        this.setState(
            {
                isSaved: true,
                text: 'Saved'
            }
        );
        setTimeout(() => {
            this.setState(
                {
                    isSaved: false,
                    text: 'Save'
                }
            );
        }, 2000);
    }

    render() {
        return (
            <TouchableOpacity style={this.state.isSaved? styles.savedButton : styles.normalButton} 
                onPress={ () => {this.props.onSave(); this.animateButton();}}
                activeOpacity ={0.7}
                >
                <Text style={this.state.isSaved ? styles.savedText : styles.normalText}>{this.state.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    normalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 70,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: Colors.mainColor,
        borderRadius: 5,
        marginBottom: 10
    },
    savedButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 70,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 5,
        marginBottom: 10
    },
    normalText: {
        color: Colors.mainColor
    },
    savedText: {
        color: 'green'
    }
});