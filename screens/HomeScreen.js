import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axiosConfig from '../helper/axiosConfig';
import LikeButton from '../component/LikeButton';
import { AuthContext } from '../context/AuthProvider';
import RetweetedContent from '../component/RetweetedContent';
import RetweetButton from '../component/RetweetButton';

function HomeScreen({ route, navigation }) {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [noMoreTweets, setNoMoreTweets] = useState(false);
    const [page, setPage] = useState(1);
    const { user: loginUser } = useContext(AuthContext);
    const [
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
    ] = useState(true);
    const flatListRef = useRef();

    useEffect(() => {
        fetchTweets();
    }, [page]);

    useEffect(() => {
        if (route.params?.newTweetAdded || route.params?.tweetDeleted) {
            getAllTweetsRefresh();
            flatListRef.current.scrollToOffset({
                offset: 0,
            });
        }
    }, [route.params?.newTweetAdded, route.params?.tweetDeleted]);

    function onUnretweeted() {
        getAllTweetsRefresh();
        flatListRef.current.scrollToOffset({
            offset: 0,
        });
    }

    function getAllTweetsRefresh() {
        console.log('on tweet refresh');

        setNoMoreTweets(false);
        setRefreshing(false);

        if (page !== 1) {
            setPage(1);
            return;
        }

        axiosConfig.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${loginUser.token}`;

        axiosConfig
            .get(`/api/tweets`)
            .then(response => {
                setTweets(response.data.data);
                setLoading(false);
                setRefreshing(false);

                if (response.data.data.length === 0) {
                    setNoMoreTweets(true);
                } else {
                    setNoMoreTweets(false);
                }
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setRefreshing(false);
            });
    }

    function fetchTweets() {
        console.log('fetching tweets');
        axiosConfig.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${loginUser.token}`;

        axiosConfig
            .get(`/api/tweets?page=${page}`)
            .then(response => {
                if (page === 1) {
                    setTweets(response.data.data);
                } else {
                    let results = [...tweets, ...response.data.data].filter(
                        (value, index, self) =>
                            index === self.findIndex(t => t.id === value.id)
                    );

                    setTweets(results);
                }

                if (response.data.data.length === 0) {
                    setNoMoreTweets(true);
                }

                setLoading(false);
                setRefreshing(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setRefreshing(false);
            });
    }

    function pull() {
        // setPage(1);
        setNoMoreTweets(false);
        setRefreshing(true);
        // fetchTweets();
        if (page === 1) {
            fetchTweets();
        } else {
            setPage(1);
        }
    }

    function goToNextPage() {
        console.log('on end reach going to next page');
        let next = page + 1;
        setPage(next);
    }

    function gotoProfile(id) {
        navigation.navigate('Profile Screen', { id });
    }

    function gotoTweet(id) {
        navigation.navigate('Tweet Screen', {
            id,
        });
    }

    function gotoNewTweet() {
        navigation.navigate('New Tweet');
    }

    const renderItem = ({ item }) => (
        <View style={styles.tweetContainer}>
            <TouchableOpacity onPress={() => gotoProfile(item.user.id)}>
                <Image
                    style={styles.tweetProfile}
                    source={{
                        uri: item.user.avatar,
                    }}
                />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <View style={styles.tweetsHeader}>
                    <Text
                        numberOfLines={1}
                        style={[styles.mr8, styles.tweetTitle]}
                    >
                        {item.user.name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={[styles.mr8, styles.tweetAuthor]}
                    >
                        @ {item.user.username}
                    </Text>
                    <Text numberOfLines={1} style={[styles.tweetAuthor]}>
                        6m
                    </Text>
                </View>

                <TouchableOpacity onPress={() => gotoTweet(item.id)}>
                    <Text style={[styles.tweetContent]}>{item.body}</Text>
                    {/*<Text style={[styles.tweetContent]}>{item.id}</Text>*/}
                    {item.retweeted_tweet && (
                        <RetweetedContent tweet={item.retweeted_tweet} />
                    )}
                </TouchableOpacity>

                <View style={styles.tweetFooter}>
                    <View style={[styles.row, styles.itemsCenter]}>
                        <TouchableOpacity>
                            <EvilIcons
                                name="comment"
                                size={22}
                                color="gray"
                                style={styles.mr4}
                            />
                        </TouchableOpacity>
                        <Text style={[]}>456</Text>
                    </View>

                    <View style={[styles.row, styles.itemsCenter]}>
                        <RetweetButton
                            tweet={item}
                            navigation={navigation}
                            fetchTweets={onUnretweeted}
                        />
                    </View>

                    <View style={[styles.row, styles.itemsCenter]}>
                        <LikeButton tweet={item} />
                    </View>

                    <TouchableOpacity style={[styles.row, styles.itemsCenter]}>
                        <EvilIcons
                            name={
                                Platform.OS === 'ios'
                                    ? 'share-apple'
                                    : 'share-google'
                            }
                            size={22}
                            color="gray"
                            style={styles.mr4}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {loading ? (
                <ActivityIndicator size="large" style={{ paddingTop: 20 }} />
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={tweets}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => (
                        <View style={styles.tweetSeparator}></View>
                    )}
                    refreshing={refreshing}
                    onRefresh={pull}
                    onMomentumScrollBegin={() => {
                        setOnEndReachedCalledDuringMomentum(false);
                    }}
                    onEndReached={() => {
                        if (!onEndReachedCalledDuringMomentum) {
                            goToNextPage();
                            setOnEndReachedCalledDuringMomentum(true);
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() =>
                        !noMoreTweets &&
                        !onEndReachedCalledDuringMomentum && (
                            <ActivityIndicator size="large" color="gray" />
                        )
                    }
                />
            )}

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
        paddingHorizontal: 30,
        display: 'flex',
        flexDirection: 'row',
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
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tweetContent: {
        marginVertical: 1,
        lineHeight: 20,
    },
    tweetFooter: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tweetSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    row: {
        flexDirection: 'row',
    },
    mr4: {
        marginRight: 4,
    },
    itemsCenter: {
        alignItems: 'center',
    },
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1d9bf1',
        position: 'absolute',
        bottom: 20,
        right: 12,
    },
});
