import React from 'react';
import {
  ScrollView,
  StyleSheet,
  AsyncStorage,
  View,
  ActivityIndicator
} from 'react-native';

import Colors from '../../../Constants/Colors';
import LikesList from './LikesList';
import MessageScreen from '../MessageScreen';

export default class Likes extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
            title: 'Likes',
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            savedQuotesArray: [],
            savedQuotesIds: [],
            isReady: false,
        };
    }
    componentDidMount() {
        this.getSavedQuotes();
    }

    async getSavedQuotes() {
        let quotesObj = {};
        let quotesObjKeys = [];
        let quotesObjVals = [];

        allKeys = await AsyncStorage.getAllKeys();

        AsyncStorage.multiGet(allKeys, (err, results) => {
            results.map( (results, i, store) => {
                let key = store[i][0];
                let val = store[i][1];

                parsedValue = JSON.parse(val);
                quotesObj[key] = parsedValue;

                quotesObjVals.push(parsedValue);
                quotesObjKeys.push(key)
            });
        }).then(() => {
            this.setState({savedQuotesArray:quotesObjVals});
            this.setState({isReady: true});
            this.setState({savedQuotesIds: quotesObjKeys});
        });
    }

    async checkNewQuotes() {
        let currentQuoteIds = [];

        allKeys = await AsyncStorage.getAllKeys();
        
        AsyncStorage.multiGet(allKeys, (err, results) => {
            results.map( (results, i, store) => {
                let key = store[i][0];
                let val = store[i][1];

                currentQuoteIds.push(key);
            });
        }).then(() => {
            if(currentQuoteIds.length != this.state.savedQuotesIds.length) {
                console.log("New Quote detected in storage, REFRESH");
                this.setState({isReady: false});
                this.getSavedQuotes();
            }
        });
    }

    render() {
        this.checkNewQuotes();
        if(this.state.isReady) {
            return (
                <View style={styles.container}>
                    <LikesList savedQuotesArray={this.state.savedQuotesArray}/>
                </View>
            );
        } else {
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
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: Colors.backgroundColor,
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        color: Colors.mainColor,
        padding: 10,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
