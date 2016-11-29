import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import Card from '../Card/Card';

import quotesJSON from '../../constants/Quotes.json';
import Colors from '../../constants/Colors';
import Menu from '../Card/Menu';

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
            quotes: QuotesArray,
            visibleQuoteId: 0
        };
    }

    componentDidMount() {
        this.getQuotes();
        console.log("Init: " + this.state.visibleQuoteId);
    }

    getRandom(obj) {
        var keys = Object.keys(obj);
        this.setState({refreshQuote: false});
        return obj[keys[ keys.length * Math.random() << 0]];
    }

    getQuotes() {
        for(let i=0; i<=1; i++) {
            let randomQuote = this.getRandom(quotesJSON);
            QuotesArray.push(randomQuote);
        }
        this.setState({quotes: QuotesArray});
        console.log(QuotesArray[0].id);
        this.setState({visibleQuoteId: QuotesArray[0].id })
    }
    updateQuotes() {
        QuotesArray.shift();
        QuotesArray.push(this.getRandom(quotesJSON));
        this.setState({refreshQuote: true});
        this.setState({visibleQuoteId: QuotesArray[0].id })
        console.log(this.state.visibleQuoteId);
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
            <View style={styles.container}>
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
                    containerStyle={styles.swipeCards}
                    frictionValue={20}
                    />
                <Menu style={styles.menu} localProps={this.state.visibleQuoteId}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    swipeCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: Colors.backgroundColor
    },
    menu :{
        height: 75
    }
});