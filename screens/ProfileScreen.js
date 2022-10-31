import React from 'react';
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

function ProfileScreen({ route }) {
    const [user, loading] = useAxiosGet(`/api/user/${route.params.id}`);

    return (
        <View>
            {loading && user === null ? (
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
                                    uri: user.avatar,
                                }}
                            />
                            <TouchableOpacity style={styles.followButton}>
                                <Text style={styles.followButtonText}>
                                    Follow
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.profileName}>{user.name}</Text>
                        <Text style={styles.profileId}>@{user.username}</Text>
                        {user.bio && <Text style={styles.bio}>{user.bio}</Text>}

                        {user.location && (
                            <View style={styles.locationContainer}>
                                <EvilIcons
                                    name="location"
                                    size={20}
                                    color="gray"
                                />
                                <Text style={styles.location}>
                                    {user.location}
                                </Text>
                            </View>
                        )}

                        <View style={styles.linkContainer}>
                            {user.link && (
                                <TouchableOpacity
                                    style={styles.linkItem}
                                    onPress={() => Linking.openURL(user.link)}
                                >
                                    <EvilIcons
                                        name="link"
                                        size={24}
                                        color="gray"
                                    />
                                    <Text style={styles.linkText}>
                                        {user.short_link}
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
                                        new Date(user.created_at),
                                        'MMM yyyy'
                                    )}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.statContainer}>
                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>341</Text>
                                <Text style={styles.statText}>Following</Text>
                            </View>

                            <View style={styles.stat}>
                                <Text style={styles.statNumber}>39</Text>
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
    followButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
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
