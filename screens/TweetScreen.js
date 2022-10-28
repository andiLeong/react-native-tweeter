import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Entypo, EvilIcons } from '@expo/vector-icons';

function TweetScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.author}>
                    <TouchableOpacity>
                        <Image
                            style={styles.avatar}
                            source={{
                                uri: `https://i.pravatar.cc/64?u=${Math.floor(
                                    Math.random() * 100000
                                )}`,
                            }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.authorName}>Andi Liang</Text>
                        <Text style={styles.authorId}>@andiliang413</Text>
                    </View>
                </View>
                <View>
                    <Entypo name="dots-three-vertical" size={22} color="gray" />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.content}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Architecto cupiditate, dolorum eligendi expedita nemo
                    numquam perspiciatis placeat praesentium qui quisquam quos
                    recusandae sapiente similique temporibus voluptatibus! Amet
                    assumenda ipsam voluptatum!
                </Text>
            </View>

            <View style={styles.statContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>612</Text>
                    <Text style={styles.statText}>Retweets</Text>
                </View>

                <View style={styles.stat}>
                    <Text style={styles.statNumber}>8</Text>
                    <Text style={styles.statText}>Quote Retweets</Text>
                </View>

                <View style={styles.stat}>
                    <Text style={styles.statNumber}>10</Text>
                    <Text style={styles.statText}>Likes</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity>
                    <EvilIcons name="comment" size={32} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <EvilIcons name="retweet" size={32} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <EvilIcons name="heart" size={32} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <EvilIcons
                        name={
                            Platform.OS === 'ios'
                                ? 'share-apple'
                                : 'share-google'
                        }
                        size={32}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default TweetScreen;

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    author: {
        flexDirection: 'row',
    },

    authorName: {
        fontWeight: 'bold',
        color: '#222222',
    },
    authorId: {
        color: 'gray',
        marginTop: 4,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 18,
    },

    contentContainer: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },

    content: {
        fontSize: 20,
        lineHeight: 30,
    },

    statContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },

    stat: {
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 12,
    },

    statNumber: {
        marginRight: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },

    statText: {
        color: 'gray',
    },

    footer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
});
