import React from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text
} from 'react-native';

import CheckBox from 'react-native-checkbox';

import Colors from '../../Constants/Colors';
import Toast, {DURATION} from 'react-native-easy-toast';

const categories = ['art', 'best', 'courage', 'failure', 'faith', 'fear', 'forgiveness', 
                    'friendship', 'funny', 'hope', 'inspirational', 'knowledge', 'leadership', 'life', 
                    'love', 'music', 'motivational', 'positive', 'strength', 'success', 'thankful', 'wisdom'];

export default class SelectCategories extends React.Component {
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
            dataSource: ds.cloneWithRows(categories)
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Select your favorite categories through which you can browse</Text>
                <ListView
                        dataSource={this.state.dataSource}
                        labelBefore={true}
                        renderRow={(data) => <CheckBox
                            label={data}
                            checked={true}
                            onChange={(checked) => console.log('I am checked', checked)}
                        />} 
                        enableEmptySections={true}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});