import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Entypo, EvilIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import useAxiosGet from '../hooks/useAxiosGet';

function TweetScreen({ route, navigation }) {
    const [tweet, loading] = useAxiosGet(`/api/tweets/${route.params.id}`);

    function gotoProfile(id) {
        navigation.navigate('Profile Screen', { id });
    }

    return (
        <View style={styles.container}>
            {loading && tweet === null ? (
                <ActivityIndicator size="large" style={{ paddingTop: 20 }} />
            ) : (
                <>
                    <View style={styles.header}>
                        <View style={styles.author}>
                            <TouchableOpacity
                                onPress={() => gotoProfile(tweet.user.id)}
                            >
                                <Image
                                    style={styles.avatar}
                                    source={{
                                        uri: tweet.user.avatar,
                                    }}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text
                                    numberOfLines={1}
                                    style={styles.authorName}
                                >
                                    {tweet.user.name}
                                </Text>
                                <Text style={styles.authorId}>
                                    @{tweet.user.username}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Entypo
                                name="dots-three-vertical"
                                size={22}
                                color="gray"
                            />
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.content}>{tweet.body}</Text>
                        <View style={styles.tweetTimestampContainer}>
                            <Text style={styles.tweetTimestampText}>
                                {format(new Date(tweet.created_at), 'h:mm a')}
                            </Text>
                            <Text style={styles.tweetTimestampText}>
                                &middot;
                            </Text>
                            <Text style={styles.tweetTimestampText}>
                                {format(new Date(tweet.created_at), 'd MMM.yy')}
                            </Text>
                            <Text style={styles.tweetTimestampText}>
                                &middot;
                            </Text>
                            <Text
                                style={[
                                    styles.tweetTimestampText,
                                    styles.linkColor,
                                ]}
                            >
                                Twitter for iPhone
                            </Text>
                        </View>
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
                </>
            )}
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
        // flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    authorName: {
        // flexWrap: 'wrap',
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

    tweetTimestampContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    tweetTimestampText: {
        color: 'gray',
        marginRight: 6,
    },
    linkColor: {
        color: '#1d9bf1',
    },
});
