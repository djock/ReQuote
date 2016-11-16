import React from 'react';
import {
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {MonoText} from '../components/StyledText';
import SwipeCards from 'react-native-swipe-cards';

import quotesJSON from '../data/Quotes.json';
import Colors from '../constants/Colors';

let Card = React.createClass({
    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.quoteText}>{this.props.quote}</Text>
                <Text style={styles.quoteAuthor}>― {this.props.author}</Text>
                <Text style={styles.quoteCategory}>Category: {this.props.category}</Text>
            </View>
        )
    }
})

let NoMoreCards = React.createClass({
    render() {
        return (
            <View style={styles.noMoreCards}>
                <Text style={styles.quoteAuthor}>Loading...</Text>
            </View>
        )
    }
})

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
                renderNoMoreCards={() => <NoMoreCards/>}
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

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will run slightly slower but you have
                    access to useful development tools. {learnMoreButton}.
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.mainColor
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        minHeight: 300,
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
    },
    quoteCategory: {
        alignSelf: 'flex-end',
        fontSize: 8,
        marginTop: 15,
        marginRight: 10,
        color: 'lightcyan'
    }
});