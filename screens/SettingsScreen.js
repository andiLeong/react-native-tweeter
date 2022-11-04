import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthProvider';

function SettingsScreen(props) {
    const { logout } = useContext(AuthContext);
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Text>This is Setting screen</Text>
            {/*<Text>{user.token}</Text>*/}

            <Button onPress={() => logout()} title="logout" />
        </View>
    );
}

export default SettingsScreen;
