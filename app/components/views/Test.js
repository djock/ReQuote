import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text } from 'native-base';

const cards = [
    {
        text: 'Puppy one',
        name: 'Like',
        image: require('../../assets/images/1.jpg'),
    },
    {
        text: 'Puppy Two',
        name: 'Like',
        image: require('../../assets/images/4.jpeg'),
    },
    {
        text: 'Puppy Three',
        name: 'Like',
        image: require('../../assets/images/5.jpg'),
    }
];

export default class DeckSwiperExample extends Component {

    render() {
        return (
            <Container>
                <View>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card >
                                <CardItem>
                                    <Text>{item.text}</Text>
                                </CardItem>
                                <CardItem>
                                    <Image style={{ resizeMode: 'cover', width: null }} source={item.image} />
                                </CardItem>
                                <CardItem>
                                    <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                                    <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                                    <Text>{item.name}</Text>
                                </CardItem>

                            </Card>
                        }
                    />
                </View>
            </Container>
        );
    }
}