import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import axiosConfig from '../helper/axiosConfig';

function NewTweetScreen({ navigation }) {
    let max = 280;
    const [tweet, setTweet] = useState('');
    const [loading, setLoading] = useState(false);

    function remaining() {
        return max - tweet.length;
    }

    function gotoProfile() {
        navigation.navigate('Profile Screen');
    }

    function store() {
        if (tweet.length === 0) {
            Alert.alert('Please enter a tweet');
            return;
        }

        setLoading(true);
        axiosConfig
            .post(`/api/tweets`, {
                body: tweet,
            })
            .then(response => {
                navigation.navigate('Home1', {
                    newTweetAdded: response.data,
                });
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setTweet}
                value={tweet}
                placeholderTextColor="gray"
                placeholder="what's happening"
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
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
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
                    <Text style={styles.submitButtonText}>Tweet</Text>
                </TouchableOpacity>
            </View>
            <Text style={remaining() > 10 ? styles.gray : styles.red}>
                Character left is {remaining()}
            </Text>
        </View>
    );
}

export default NewTweetScreen;

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
});
