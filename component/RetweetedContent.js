import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function RetweetedContent({ tweet }) {
    return (
        <View style={styles.retweet}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.oldTweetAvatar}
                    source={{
                        uri: tweet.user.avatar,
                    }}
                />
                <Text style={styles.oldTweetUser}>{tweet.user.name}</Text>
            </View>
            <Text style={styles.oldTweetBody}>{tweet.body}</Text>
        </View>
    );
}

export default RetweetedContent;

const styles = StyleSheet.create({
    retweet: {
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 10,
        marginTop: 20,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    oldTweetAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    oldTweetUser: {
        color: '#6b7280',
        fontWeight: 'bold',
    },

    oldTweetBody: {
        marginTop: 10,
        color: '#9ca3af',
    },
});
