import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ListView
} from 'react-native';

import Colors from '../../Constants/Colors';
import LikesListItem from './LikesListItem';
import MessageScreen from '../MessageScreen/MessageScreen';

export default class LikesList extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.savedQuotesArray)
        };
    }
    render() {
        if(this.props.savedQuotesArray.length != 0 && this.props.savedQuotesArray[0].quote != null) {
            return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data) => <LikesListItem {...data} />} 
                        enableEmptySections={true}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
                </View>
            );
        } else {
            return (
                <MessageScreen text='Swipe down on a quote to save it'/>
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
        backgroundColor: Colors.backgroundColor
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        marginTop: 10,
        backgroundColor: 'darkgray',
    }
});
