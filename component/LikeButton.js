import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import appAxios from '../helper/appAxios';
import { AuthContext } from '../context/AuthProvider';

function LikeButton({ tweet }) {
    const { user: loginUser } = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState(tweet.likes_count);
    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(tweet.liked_by_user);

    useEffect(() => {
        setLikeCount(tweet.likes_count);
        setIsLiked(tweet.liked_by_user);
    }, [tweet.likes_count, tweet.liked_by_user]);

    function toggleCount() {
        setLoading(true);
        appAxios
            .bearToken(loginUser.token)
            .via('post')
            .to(`/api/like-tweet-toggle/${tweet.id}`)
            .onSuccess(() => {
                setLoading(false);
                if (isLiked) {
                    setLikeCount(pre => pre - 1);
                    setIsLiked(false);
                } else {
                    setLikeCount(pre => pre + 1);
                    setIsLiked(true);
                }
            })
            .onFailure(err => console.log(err))
            .fire();
    }

    return (
        <>
            <TouchableOpacity onPress={toggleCount} disabled={loading}>
                <EvilIcons
                    name="heart"
                    size={22}
                    color={isLiked ? '#ec4899' : 'gray'}
                    style={styles.mr4}
                />
            </TouchableOpacity>
            <Text style={[isLiked ? styles.liked : '']}>{likeCount}</Text>
        </>
    );
}

export default LikeButton;

const styles = StyleSheet.create({
    mr4: {
        marginRight: 4,
    },
    liked: {
        color: '#ec4899',
    },
});
