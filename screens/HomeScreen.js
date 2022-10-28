import React from 'react';
import {FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {EvilIcons} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function HomeScreen({navigation}) {


    const DATA = [
        {
            id: '1',
            title: 'First Item',
        },
        {
            id: '2',
            title: 'Second Item',
        },
        {
            id: '3',
            title: 'Third Item',
        },
        {
            id: '4',
            title: 'Four Item',
        },
        {
            id: '5',
            title: 'Fifth Item',
        },
        {
            id: '6',
            title: 'Sixth Item',
        },
        {
            id: '7',
            title: 'Seventh Item',
        },
        {
            id: '8',
            title: 'Eighth Item',
        },
        {
            id: '9',
            title: 'Ninth Item',
        },
        {
            id: '10',
            title: 'Tenth Item',
        },
    ];


    function gotoProfile() {
        navigation.navigate('Profile Screen')
    }

    function gotoTweet() {
        navigation.navigate('Tweet Screen')
    }

    function gotoNewTweet(){
        navigation.navigate('New Tweet')
    }

    const renderItem = ({item}) => (

            <View style={styles.tweetContainer}>
                <TouchableOpacity onPress={() => gotoProfile()}>
                    <Image
                        style={styles.tweetProfile}
                        source={{
                            uri: `https://i.pravatar.cc/64?u=${Math.floor(Math.random() * 100000)}`,
                        }}
                    />
                </TouchableOpacity>
                <View style={{flex:1}}>
                    <View style={styles.tweetsHeader}>
                        <Text style={[styles.mr8, styles.tweetTitle]}>{item.title}</Text>
                        <Text style={[styles.mr8, styles.tweetAuthor]}>@andiliang413</Text>
                        <Text style={[styles.tweetAuthor]}>6m</Text>
                    </View>

                    <TouchableOpacity onPress={() => gotoTweet()}>
                        <Text style={[styles.tweetContent]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                            dolore error hic itaque libero, molestiae molestias rerum sint! Atque dolorum eius enim hic,
                            itaque molestiae natus perspiciatis quia similique voluptatibus?</Text>
                    </TouchableOpacity>

                    <View style={styles.tweetFooter}>
                        <TouchableOpacity
                            style={[styles.row, styles.itemsCenter]}
                        >
                            <EvilIcons
                                name="comment"
                                size={22}
                                color="gray"
                                style={styles.mr4}
                            />
                            <Text style={[]}>456</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.row, styles.itemsCenter]}
                        >
                            <EvilIcons
                                name="retweet"
                                size={22}
                                color="gray"
                                style={styles.mr4}
                            />
                            <Text style={[]}>99</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.row, styles.itemsCenter]}
                        >
                            <EvilIcons
                                name="heart"
                                size={22}
                                color="gray"
                                style={styles.mr4}
                            />
                            <Text style={[]}>10</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.row, styles.itemsCenter]}
                        >
                            <EvilIcons
                                name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
                                size={22}
                                color="gray"
                                style={styles.mr4}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    ;

    return (
        <View style={{marginHorizontal: 30}}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (
                    <View style={styles.tweetSeparator}></View>
                )}
            />

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => gotoNewTweet()}
            >
                <AntDesign name="plus" size={26} color="white" />
            </TouchableOpacity>


        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    TweetsContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tweetContainer: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tweetProfile: {
        width: 42,
        height: 42,
        marginRight: 10,
        borderRadius: 21,
    },
    mr8: {
        marginRight: 8,
    },
    tweetTitle: {
        fontWeight: 'bold',
        color: '#222222',
    },
    tweetAuthor: {
        color: 'gray',
    },
    tweetsHeader: {
        display: 'flex',
        flexDirection: 'row'
    },
    tweetContent: {
        marginVertical: 1,
        lineHeight: 20,
    },
    tweetFooter: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    tweetSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    row: {
        flexDirection: 'row'
    },
    mr4: {
        marginRight: 4,
    },
    itemsCenter: {
        alignItems: 'center'
    },
    floatingButton:{
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d9bf1',
        position: 'absolute',
        bottom: 20,
        right: 12,
    }

});