import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import appAxios from '../helper/appAxios';
import { AuthContext } from '../context/AuthProvider';

function RetweetButton({ tweet, navigation, fetchTweets }) {
    const { user: loginUser } = useContext(AuthContext);

    function retweet() {
        if (tweet.retweeted_id !== null) {
            Alert.alert('A retweet cant retweet again');
            return;
        }

        if (tweet.retweeted_by_user) {
            appAxios
                .bearToken(loginUser.token)
                .via('post')
                .to(`/api/retweet/${tweet.id}`)
                .onSuccess(response => fetchTweets())
                .onFailure(error => console.log(error.message))
                .fire();
            return;
        }
        navigation.navigate('Retweet Screen', {
            tweet,
        });
    }

    return (
        <>
            <TouchableOpacity onPress={() => retweet()}>
                <EvilIcons
                    name="retweet"
                    size={22}
                    color={tweet.retweeted_by_user ? '#ec4899' : 'gray'}
                    style={{ marginRight: 4 }}
                />
            </TouchableOpacity>
            <Text
                style={{
                    color: tweet.retweeted_by_user ? '#ec4899' : 'gray',
                }}
            >
                {tweet.retweets_count}
            </Text>
        </>
    );
}

export default RetweetButton;
