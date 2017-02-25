import React from 'react';
import {
  ScrollView,
  StyleSheet,
  AsyncStorage,
  View,
  ActivityIndicator
} from 'react-native';

import Colors from '../../Constants/Colors';
import LikesList from './LikesList';
import MessageScreen from '../MessageScreen/MessageScreen';

export default class Likes extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            savedData: [],
            savedDataIds: [],
            isReady: false,
        };
    }
    componentDidMount() {
        this.getSavedData();
    }

    async getSavedData() {
        let dataObj = {};
        let dataObjKeys = [];
        let dataObjVals = [];

        allKeys = await AsyncStorage.getAllKeys();
        console.log(allKeys);

        
        AsyncStorage.multiGet(allKeys, (err, results) => {
            results.map( (results, i, store) => {
                let key = store[i][0];
                let val = store[i][1];

                parsedValue = JSON.parse(val);
                dataObj[key] = parsedValue;
                dataObjVals.push(parsedValue);
                dataObjKeys.push(key)
            });
        }).then(() => {
            this.setState({savedData:dataObjVals});
            this.setState({isReady: true});
            this.setState({savedDataIds: dataObjKeys});
        });
    }

    async checkNewData() {
        let currentDataIds = [];

        allKeys = await AsyncStorage.getAllKeys();
        
        AsyncStorage.multiGet(allKeys, (err, results) => {
            results.map( (results, i, store) => {
                let key = store[i][0];
                let val = store[i][1];

                currentDataIds.push(key);
            });
        }).then(() => {
            if(currentDataIds.length != this.state.savedDataIds.length) {
                this.setState({isReady: false});
                this.getSavedData();
            }
        });
    }

    render() {
        this.checkNewData();
        if(this.state.isReady) {
            return (
                <View style={styles.container}>
                    <LikesList savedData={this.state.savedData}/>
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
        paddingTop: 35,
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
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
