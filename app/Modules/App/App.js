import React from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import Toast, { DURATION } from 'react-native-easy-toast';

import Card from './Card';
import dataJSON from '../../Constants/data.json';

import Colors from '../../Constants/Colors';
import MessageScreen from '../MessageScreen/MessageScreen';

let CurrentData = [];
let AppCategories = [];

const STORAGE_KEY = 'AppCategories';

const PredefinedCategories = ['art', 'popular', 'courage', 'failure', 'faith', 'fear', 'forgiveness',
    'friendship', 'funny', 'gratitude', 'hope', 'inspirational', 'knowledge', 'leadership', 'life',
    'love', 'music', 'motivational', 'positive', 'strength', 'success', 'wisdom'
];

export default class App extends React.Component {
        static route = {
            navigationBar: {
                visible: false,
            }
        }
        constructor(props) {
            super(props);
            this.state = {
                data: CurrentData,
                categories: AppCategories
            };
        }

        componentDidMount() {
            this.getData();
            AsyncStorage.clear();
        }

        getRandom(obj) {
            var keys = Object.keys(obj);
            return obj[keys[keys.length * Math.random() << 0]];
        }


        async getCategories() {
            userCategories = await AsyncStorage.getItem(STORAGE_KEY);
            AppCategories = [];
            let data = JSON.parse(userCategories);
            if (data === null) {
                AppCategories = PredefinedCategories;
            } else {
                for (let i = 0; i < data.length; i++) {
                    AppCategories.push(data[i])
                }
            }
            this.setState({ categories: AppCategories });
        }

        async getData() {
            await this.getCategories();
            for (let i = 0; i <= 1; i++) {
                let randomObj = this.getRandom(dataJSON);
                if (AppCategories.indexOf(randomObj.category) != -1) {
                    CurrentData.push(randomObj);
                } else {
                    i--;
                }
            }
            this.setState({ data: CurrentData });
        }
        async updateData(shouldGetCategories = true) {
            if (shouldGetCategories)
                await this.getCategories();
            CurrentData.shift();
            let randomObj = this.getRandom(dataJSON);
            if (AppCategories.indexOf(randomObj.category) != -1) {
                CurrentData.push(randomObj);
            } else {
                this.updateData(false);
            }

        }

        likeCurrentData() {
            let id = JSON.stringify(CurrentData[0].id);
            let jsonObj = {};
            jsonObj["id"] = CurrentData[0].id;
            jsonObj["text"] = CurrentData[0].text;
            jsonObj["category"] = CurrentData[0].category;
            jsonObj["author"] = CurrentData[0].author;

            let dataObj = JSON.stringify(jsonObj);

            try {
                AsyncStorage.setItem(id, dataObj);
            } catch (error) {
                console.log("Error", error)
            }
            this.refs.toast.show('Quote saved!');
            this.updateData();
        }

        render() {
            if (!this.state.data) {
                return this.renderLoadingView();
            }

            let currentData = this.state.data;
            return this.renderData(currentData);
        }

        renderLoadingView() {
            return ( 
                <View 
                    style = { styles.activityIndicator }>
                    <ActivityIndicator 
                        animating = { this.state.animating }
                        style = {[styles.centering, styles.gray, { height: 80 }] }
                        size = "large" />
                </View>
            );
        }
        handleDown() {
            this.likeCurrentData();
        }
        handleUp() {
            this.updateData();
        }
        handleRight() {
            this.updateData();
        }
        handleLeft() {
            this.updateData();
        }

        renderData(data) {
            return ( 
                <View style = { styles.container }>
                    <SwipeCards cards = { this.state.data }
                        renderCard = {(cardData) => <Card {...cardData }/>}
                        handleRight = { this.handleRight.bind(this) }
                        handleLeft = { this.handleLeft.bind(this) }
                        handleDown = { this.handleDown.bind(this) }
                        handleUp = { this.handleUp.bind(this) }
                        renderNoMoreCards = {() => this.renderLoadingView }
                    showYup = { false }
                    showNope = { false }
                    containerStyle = { styles.swipeCards }/> 
                    <Toast
                        ref = "toast"
                        style = { styles.toast }
                        position = 'bottom'
                        positionValue = { 100 }/> 
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
