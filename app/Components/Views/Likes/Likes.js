import React from 'react';
import {
  ScrollView,
  StyleSheet,
  AsyncStorage,
  View
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
            quoteObj: [],
            isReady: false,
        };
    }
    componentDidMount() {
        this.getQuoteObj();
    }

    async getQuoteObj() {
        let quotesList = {};
        let quotesArray = [];
        allKeys = await AsyncStorage.getAllKeys();
        AsyncStorage.multiGet(allKeys, (err, results) => {
            results.map( (results, i, store) => {
                let key = store[i][0];
                let val = store[i][1];

                parsedValue = JSON.parse(val);
                quotesList[key] = parsedValue;
                quotesArray.push(parsedValue);
            });
        }).then(() => {
            this.setState({quoteObj: quotesArray});
            this.setState({isReady: true});
        });
    }

    render() {
        if(this.state.isReady) {
            return (
                <View style={styles.container}>
                    <LikesList savedQuotesList={this.state.quoteObj}/>
                </View>
            );
        } else {
            return (
                <MessageScreen text={'Loading...'} />
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
    }
});
