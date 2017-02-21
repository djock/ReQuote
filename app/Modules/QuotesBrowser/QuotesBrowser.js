import React from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import Toast, {DURATION} from 'react-native-easy-toast';

import Quote from './Quote';
import quotesJSON from '../../Constants/Quotes.json';

import Colors from '../../Constants/Colors';
import MessageScreen from '../MessageScreen/MessageScreen';

let QuotesArray = [];
let CategoriesArray =[];
const STORAGE_KEY = 'categories';

const localCategories = ['art', 'popular', 'courage', 'failure', 'faith', 'fear', 'forgiveness', 
                    'friendship', 'funny', 'gratitude', 'hope', 'inspirational', 'knowledge', 'leadership', 'life', 
                    'love', 'music', 'motivational', 'positive', 'strength', 'success', 'wisdom'];

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
            categories: CategoriesArray
        };
    }

    componentDidMount() {
        this.getQuotes();
        //AsyncStorage.clear();
    }

    getRandom(obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    }


    async getCategories() {
        userCategories = await AsyncStorage.getItem(STORAGE_KEY);
        CategoriesArray = [];
        let data = JSON.parse(userCategories);
        if(data === null) {
            CategoriesArray = localCategories;
        } else {
            for( let i = 0; i< data.length; i++) {
                CategoriesArray.push(data[i])
            }
        }
        this.setState({categories: CategoriesArray});
    }

    async getQuotes() {
        await this.getCategories();
        for(let i=0; i<=1; i++) {
            let randomQuote = this.getRandom(quotesJSON);
            if(CategoriesArray.indexOf(randomQuote.category) != -1) {
                QuotesArray.push(randomQuote);
            } else {
                i--;
            }
        }
        this.setState({quotes: QuotesArray});
    }
    async updateQuotes(shouldGetCategories = true) {
        if(shouldGetCategories)
            await this.getCategories();
        QuotesArray.shift();
        let randomQuote = this.getRandom(quotesJSON);
        if(CategoriesArray.indexOf(randomQuote.category) != -1) {
            QuotesArray.push(randomQuote);
        } else {
            this.updateQuotes(false);
        }
        
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
            console.log("Error", error)
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
            <View style={styles.activityIndicator}>
                <ActivityIndicator
                    animating={this.state.animating}
                    style={[styles.centering, styles.gray, {height: 80}]}
                    size="large"
                />
            </View>
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
                    renderNoMoreCards={() => this.renderLoadingView }                  
                    showYup={false}
                    showNope={false}
                    containerStyle={styles.swipeCards}
                    />
                <Toast 
                    ref="toast"
                    style={styles.toast}
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
    menu: {
        height: 75
    },
    toast: {
        backgroundColor: Colors.likeColor,
    },
    activityIndicator: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    }
});