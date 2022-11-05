import 'react-native-gesture-handler';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthProvider';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import AppStack from './navigation/AppStack';
import * as SecureStore from 'expo-secure-store';

export default function Root() {
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        SecureStore.getItemAsync('user')
            .then(userString => {
                if (userString) {
                    setUser(JSON.parse(userString));
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="large" color="gray" />
            </View>
        );
    }

    return (
        <>
            {user ? (
                <NavigationContainer>
                    <AppStack />
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                    <AuthStackNavigator />
                </NavigationContainer>
            )}
        </>
    );
}
