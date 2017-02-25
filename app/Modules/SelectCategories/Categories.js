import React from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import CheckBox from 'react-native-check-box'
import App from '../App/App';
import Colors from '../../Constants/Colors';
import Toast, {DURATION} from 'react-native-easy-toast';

const AppCategories = ['art', 'popular', 'courage', 'failure', 'faith', 'fear', 'forgiveness', 
                    'friendship', 'funny', 'gratitude', 'hope', 'inspirational', 'knowledge', 'leadership', 'life', 
                    'love', 'music', 'motivational', 'positive', 'strength', 'success', 'wisdom'];

let UserSavedCategories = [];
const STORAGE_KEY = 'AppCategories';

export default class Categories extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
            title: 'Categories'
        }
    }
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(AppCategories),
            savedCategories: UserSavedCategories,
            isReady: false,
            hasBeenSaved: false,
            areAllChecked: true,
        };
    }

    componentWillMount() {
        this.getUserSavedCategories();
    }

    async getUserSavedCategories() {
        userCategories = await AsyncStorage.getItem(STORAGE_KEY);

        let data = JSON.parse(userCategories);
        if(data === null) {
            UserSavedCategories = AppCategories;
        } else {
            for( let i = 0; i< data.length; i++) {
                UserSavedCategories.push(data[i])
            }
        }

        this.setState({savedCategories: UserSavedCategories});
        this.setState({isReady: true});
    }

    onSave() {
        let AppCategories = JSON.stringify(UserSavedCategories);
        try {
            AsyncStorage.setItem(STORAGE_KEY, AppCategories);
        } catch (error) {
            console.log("Error", error)
        }
    }

    onCheck(data) {
        let isAlreadySaved = this.isCategorySaved(data);
        
        if(!isAlreadySaved) {
            UserSavedCategories.push(data);
        } else {
            let index = UserSavedCategories.indexOf(data);
            UserSavedCategories.splice(index, 1);
        }
        this.setState({savedCategories: UserSavedCategories});
    }

    onCheckAll(isChecked) {
        this.setState({isReady: false});
        console.log("is checked?", isChecked);
        // console.log("1. Categories:", UserSavedCategories);
        //hack to refresh view
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState(
            {
                dataSource: ds.cloneWithRows(AppCategories),
                areAllChecked: isChecked,
                isReady: true
            }
        );
    }

    isCategorySaved(data) {
        return this.state.savedCategories.indexOf(data) != -1 ? true : false;
    }

    renderListItem(data) {
        if(!this.state.areAllChecked) {
            UserSavedCategories = [];
        } else {
            UserSavedCategories = AppCategories;
        }
        let isChecked = UserSavedCategories.indexOf(data) != -1 ? true : false; 

        return(
            <CheckBox style={styles.listItem}
                leftText={data.toUpperCase()} 
                isChecked={isChecked}
                onClick={() => this.onCheck(data)}
            />
        );
    }

    renderHeader(data) {
        let isChecked = this.state.areAllChecked;

        return(
            <CheckBox style={styles.header}
                leftText={'Categories'}
                isChecked={isChecked}
                leftTextStyle={styles.title}
                onClick={() => {console.log("test")}}
            />
        );
    }

    render() {
        if(this.state.isReady) {
            return (
                <View style={styles.container}>
                    {this.renderHeader(this.state.areAllChecked)}
                    <ListView style={styles.listView}
                            dataSource={this.state.dataSource}
                            renderRow={(data) => this.renderListItem(data)} 
                            enableEmptySections={true}
                            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
                    <Toast 
                        ref="toast"
                        style={styles.toast}
                        position='center'
                        positionValue={100}
                    />
                    <TouchableOpacity style={styles.saveButton} 
                        onPress={ () => { this.onSave(); this.refs.toast.show('Saved!'); }}
                        activeOpacity ={0.7}
                        >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    
                </View>
            );
        } else if (this.state.hasBeenSaved) {
            return (
                <App />
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
        backgroundColor: Colors.backgroundColor,
        padding: 5
    },
    header: {
        marginTop: 35,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'palatino-bold',
        // marginTop: 20,
        // marginBottom: 10
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'lightgrey',
    },
    activityIndicator: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listView: {
        padding: 10
    }, 
    listItem: {
        padding: 10
    },
    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 35,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.mainColor,
        borderRadius: 5,
        marginTop: 20
    },
    saveButtonText: {
        color: Colors.mainColor
    },
    toast: {
        backgroundColor: Colors.fadeMainColor,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'

    }
});