import React from 'react';
import {
    StyleSheet,
} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import Card from '../Card/Card';

import quotesJSON from '../../constants/Quotes.json';
import Colors from '../../constants/Colors';

let QuotesArray = [];

export default class HomeScreen extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
            title: 'ReQuote'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            quotes: QuotesArray
        };
    }

    componentDidMount() {
        this.getQuotes();
    }

    getRandom(obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    }

    getQuotes() {
        for(let i=0; i<=1; i++) {
            let randomQuote = this.getRandom(quotesJSON);
            QuotesArray.push(randomQuote);
        }
        
        this.setState({quotes: QuotesArray});
    }
    updateQuotes() {
        QuotesArray.shift();
        QuotesArray.push(this.getRandom(quotesJSON));
    }

    render() {
        if (!this.state.quotes) {
            return this.renderLoadingView();
        }

        let quote = this.state.quotes;
        return this.renderQuote(quote);
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text style={styles.quoteAuthor}>
                    Loading quotes...
                </Text>
            </View>
        );
    }

    renderQuote(quote) {
        return (
            <SwipeCards
                cards={this.state.quotes}
                renderCard={(cardData) => <Card {...cardData}/>}
                handleYup={this
                .updateQuotes
                .bind(this)}
                handleNope={this
                .updateQuotes
                .bind(this)}
                showYup={false}
                showNope={false}
                containerStyle={styles.container}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor
    }
});