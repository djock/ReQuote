import React from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage
} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import Quote from '../Quote';
import quotesJSON from '../../Constants/Quotes.json';
import Colors from '../../Constants/Colors';
import MessageScreen from './MessageScreen';
import Toast, {DURATION} from 'react-native-easy-toast';

let QuotesArray = [];

export default class QuotesBrowser extends React.Component {
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
        };
    }

    componentDidMount() {
        this.getQuotes();
        // AsyncStorage.clear();
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

    likeQuote() {
        let id = JSON.stringify(QuotesArray[0].id);
        let jsonObj = {};
        jsonObj["id"] = QuotesArray[0].id;
        jsonObj["quote"] = QuotesArray[0].quote;
        jsonObj["category"] = QuotesArray[0].category;
        jsonObj["author"] = QuotesArray[0].author;

        let quoteData = JSON.stringify(jsonObj);
        
        // Save the quote on the device
        try {
            AsyncStorage.setItem(id, quoteData);
            console.log("Save",id);
        } catch (error) {
            console.log(error)
        }
        this.refs.toast.show('Quote saved!');
        this.updateQuotes();
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
            <MessageScreen text={'Loading...'}/>
        );
    }
    handleDown() {
        this.likeQuote();
    }
    handleUp() {
        this.updateQuotes();
    }
    handleRight() {
        this.updateQuotes();
    }
    handleLeft() {
        this.updateQuotes();
    }

    renderQuote(quote) {
        return (
            <View style={styles.container}>
                <SwipeCards
                    cards={this.state.quotes}
                    renderCard={(cardData) => <Quote {...cardData}/>}
                    handleRight={this.handleRight.bind(this)}
                    handleLeft={this.handleLeft.bind(this)}
                    handleDown={this.handleDown.bind(this)}
                    handleUp={this.handleUp.bind(this)}                    
                    showYup={false}
                    showNope={false}
                    containerStyle={styles.swipeCards}
                    frictionValue={20}
                    rotation={false}
                    />
                <Toast 
                    ref="toast"
                    style={{backgroundColor: Colors.likeColor}}
                    position='bottom'
                    positionValue={100}
                />
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