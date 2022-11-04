import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
} from 'react-native';
import appAxios from '../helper/appAxios';

function FollowButton({ user, setFetch }) {
    const [loading, setLoading] = useState(false);
    const [followed, setFollowed] = useState(null);

    useEffect(() => {
        setFollowed(user.follow_by_logged_in_user);
    }, []);

    function follow() {
        setLoading(true);
        appAxios
            .via('post')
            .to(`/api/follow-toggle/${user.id}`)
            .onSuccess(() => {
                setLoading(false);
                setFollowed(pre => !pre);
                setFetch(pre => !pre);
            })
            .onFailure(err => console.log(err))
            .fire();
    }

    return (
        <TouchableOpacity
            onPress={follow}
            style={[
                styles.followButton,
                followed ? styles.bgBlue : styles.bgBlack,
            ]}
            disabled={loading}
        >
            {loading && (
                <ActivityIndicator style={{ marginRight: 8 }} color="white" />
            )}
            <Text style={styles.followButtonText}>
                {followed ? 'Unfollow' : 'Follow'}
            </Text>
        </TouchableOpacity>
    );
}

export default FollowButton;

const styles = StyleSheet.create({
    bgBlack: {
        backgroundColor: 'black',
    },
    bgBlue: {
        backgroundColor: '#0284c7',
    },
    followButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
