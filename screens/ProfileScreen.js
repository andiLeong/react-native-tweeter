import React, { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import useAxiosGet from '../hooks/useAxiosGet';
import { format } from 'date-fns';
import { AuthContext } from '../context/AuthProvider';
import FollowButton from '../component/FollowButton';

function ProfileScreen({ route }) {
    const { user } = useContext(AuthContext);
    const [fetch, setFetch] = useState(false);

    const [profileUser, loading] = useAxiosGet(
        `/api/user/${route.params.id}?fetch=${fetch}`,
        null,
        null,
        user.token
    );

    return (
        <View>
            {loading && profileUser === null ? (
                <ActivityIndicator size="large" style={{ paddingTop: 20 }} />
            ) : (
                <>
                    <Image
                        style={styles.backgroundImage}
                        source={{
                            uri: `https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`,
                        }}
                    />
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={styles.avatarContainer}>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: profileUser.avatar,
                                }}
                            />

                            {user.user.id !== profileUser.id && (
                                <FollowButton
                                    setFetch={setFetch}
                                    user={profileUser}
                                />
                            )}
                        </View>

                        <Text style={styles.profileName}>
                            {profileUser.name}
                        </Text>
                        <Text style={styles.profileId}>
                            @{profileUser.username}
                        </Text>
                        {profileUser.bio && (
                            <Text style={styles.bio}>{profileUser.bio}</Text>
                        )}

                        {profileUser.location && (
                            <View style={styles.locationContainer}>
                                <EvilIcons
                                    name="location"
                                    size={20}
                                    color="gray"
                                />
                                <Text style={styles.location}>
                                    {profileUser.location}
                                </Text>
                            </View>
                        )}

                        <View style={styles.linkContainer}>
                            {profileUser.link && (
                                <TouchableOpacity
                                    style={styles.linkItem}
                                    onPress={() =>
                                        Linking.openURL(profileUser.link)
                                    }
                                >
                                    <EvilIcons
                                        name="link"
                                        size={24}
                                        color="gray"
                                    />
                                    <Text style={styles.linkText}>
                                        {profileUser.short_link}
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <View style={[styles.linkItem]}>
                                <EvilIcons
                                    name="calendar"
                                    size={24}
                                    color="gray"
                                />
                                <Text style={styles.joinDate}>
                                    Joined{' '}
                                    {format(
                                        new Date(profileUser.created_at),
                                        'MMM yyyy'
                                    )}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.statContainer}>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>
                                    {profileUser.follow_count}
                                </Text>
                                <Text style={styles.statText}>Following</Text>
                            </View>

                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>
                                    {profileUser.being_follow_count}
                                </Text>
                                <Text style={styles.statText}>Followers</Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        width: 800,
        height: 120,
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: -30,
    },
    avatar: {
        borderColor: 'white',
        borderWidth: 4,
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileContainer: {
        marginTop: 10,
    },

    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222222',
        paddingLeft: 5,
    },

    profileId: {
        marginTop: 2,
        color: 'gray',
        paddingLeft: 5,
    },

    joinDate: {
        color: 'gray',
    },

    bio: {
        lineHeight: 22,
        marginVertical: 10,
        fontSize: 18,
    },

    locationContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },

    location: {
        color: 'gray',
    },

    linkContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },

    linkItem: {
        flexDirection: 'row',
    },

    statContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },

    linkText: {
        color: '#38bdf8',
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
});
