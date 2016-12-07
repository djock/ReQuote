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
import QuotesBrowser from '../QuotesBrowser/QuotesBrowser';
import Colors from '../../Constants/Colors';
import Toast, {DURATION} from 'react-native-easy-toast';

const categories = ['art', 'popular', 'courage', 'failure', 'faith', 'fear', 'forgiveness', 
                    'friendship', 'funny', 'gratitude', 'hope', 'inspirational', 'knowledge', 'leadership', 'life', 
                    'love', 'music', 'motivational', 'positive', 'strength', 'success', 'wisdom'];

let SavedCategories = [];
const STORAGE_KEY = 'categories';

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
            dataSource: ds.cloneWithRows(categories),
            savedCategories: SavedCategories,
            isDataChecked: false,
            isReady: false,
            hasBeenSaved: false
        };
    }

    componentWillMount() {
        this.getSavedCategories();
    }

    async getSavedCategories() {
        userCategories = await AsyncStorage.getItem(STORAGE_KEY);

        let data = JSON.parse(userCategories);
        if(data === null) {
            SavedCategories = categories;
        } else {
            for( let i = 0; i< data.length; i++) {
                SavedCategories.push(data[i])
            }
        }

        this.setState({category: SavedCategories});
        this.setState({isReady: true});
    }

    onSaveCategories() {
        let categories = JSON.stringify(SavedCategories);
        try {
            AsyncStorage.setItem(STORAGE_KEY, categories);
            console.log("Update categories", categories);
        } catch (error) {
            console.log("Error", error)
        }
    }

    onCheckCategory(data) {
        let isAlreadySaved = this.isCategorySaved(data)

        if(!isAlreadySaved) {
            SavedCategories.push(data);
        } else {
            let index = SavedCategories.indexOf(data);
            SavedCategories.splice(index, 1);
        }
        this.setState({savedCategories: SavedCategories});
    }

    isCategorySaved(data) {
        if (this.state.savedCategories.indexOf(data) != -1) {
            return true;
        } else {
            return false;
        }
    }

    renderListItem(data) {
        let isChecked = SavedCategories.indexOf(data) != -1 ? true : false;

        return(
            <CheckBox style={styles.listItem}
                leftText={data.toUpperCase()}
                isChecked={isChecked}
                onClick={() => this.onCheckCategory(data)}
            />
        );
    }

    render() {
        if(this.state.isReady) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Choose categories</Text>
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
                        onPress={ () => { this.onSaveCategories(); this.refs.toast.show('Saved!'); }}
                        activeOpacity ={0.7}
                        >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    
                </View>
            );
        } else if (this.state.hasBeenSaved) {
            return (
                <QuotesBrowser />
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
    title: {
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'palatino-bold',
        marginTop: 10,
        marginBottom: 10
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