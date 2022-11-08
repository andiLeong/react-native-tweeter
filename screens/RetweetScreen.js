import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import appAxios from '../helper/appAxios';
import { AuthContext } from '../context/AuthProvider';
import RetweetedContent from '../component/RetweetedContent';

function RetweetScreen({ navigation, route }) {
    let max = 280;
    const oldTweet = route.params.tweet;
    const [tweet, setTweet] = useState('');
    const [loading, setLoading] = useState(false);
    const { user: loginUser } = useContext(AuthContext);

    function remaining() {
        return max - tweet.length;
    }

    function gotoProfile() {
        navigation.navigate('Profile Screen');
    }

    function newTweetAdded(data) {
        navigation.navigate('Home1', {
            newTweetAdded: data,
        });
    }

    function store() {
        appAxios
            .bearToken(loginUser.token)
            .via('post')
            .to(`/api/retweet/${oldTweet.id}`)
            .setPayload({
                body: tweet,
            })
            .before(() => setLoading(true))
            .onSuccess(response => newTweetAdded(response.data))
            .onFailure(error => console.log(error))
            .after(() => setLoading(false))
            .fire();
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setTweet}
                value={tweet}
                placeholderTextColor="gray"
                placeholder="say something about the tweet"
                autoFocus
                multiline
                numberOfLines={4}
                maxLength={280}
            />
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => gotoProfile()}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: loginUser.user.avatar,
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => store()}
                    style={[
                        loading ? styles.bgGray : styles.bgBlue,
                        styles.submitButton,
                    ]}
                >
                    <Text style={styles.submitButtonText}>Retweet</Text>
                </TouchableOpacity>
            </View>
            <Text style={remaining() > 10 ? styles.gray : styles.red}>
                Character left is {remaining()}
            </Text>

            {oldTweet && <RetweetedContent tweet={oldTweet} />}
        </View>
    );
}

export default RetweetScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    gray: {
        color: 'gray',
    },
    red: {
        color: 'red',
    },
    input: {
        marginTop: 10,
        fontSize: 18,
        // lineHeight: 28,
        padding: 10,
        // borderWidth: 1.5,
        // borderColor: '#0ea5e9',
        borderRadius: 10,
        textAlignVertical: 'top',
    },
    footer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    bgGray: {
        backgroundColor: '#d4d4d4',
    },
    bgBlue: {
        backgroundColor: '#1d9bf1',
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        // backgroundColor: '#1d9bf1',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
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
