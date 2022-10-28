import React from 'react';
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

function ProfileScreen(props) {
    return (
        <View>
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
                            uri: `https://i.pravatar.cc/64?u=${Math.floor(
                                Math.random() * 100000
                            )}`,
                        }}
                    />
                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followButtonText}>Follow</Text>
                    </TouchableOpacity>
                </View>

                {/*<View style={styles.profileContainer}>*/}
                <Text style={styles.profileName}>Andi Liang</Text>
                <Text style={styles.profileId}>@andiliang9988</Text>
                <Text style={styles.bio}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                    atque aut autem cum deserunt doloribus eaque
                </Text>
                {/*</View>*/}

                <View style={styles.locationContainer}>
                    <EvilIcons name="location" size={24} color="gray" />
                    <Text style={styles.location}>Manila,Philippine</Text>
                </View>

                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        style={styles.linkItem}
                        onPress={() => Linking.openURL('https://andiliang.com')}
                    >
                        <EvilIcons name="link" size={24} color="gray" />
                        <Text style={styles.linkText}>andiliang.com</Text>
                    </TouchableOpacity>
                    <View style={[styles.linkItem]}>
                        <EvilIcons name="calendar" size={24} color="gray" />
                        <Text style={styles.joinDate}>Joined March 2009</Text>
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
    },

    profileId: {
        marginTop: 2,
        color: 'gray',
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
        color: 'blue',
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
