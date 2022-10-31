import 'react-native-gesture-handler';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from './screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthProvider';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import AppStack from './navigation/AppStack';

const Drawer = createDrawerNavigator();

export default function Root() {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // check if user is logged in or not.
        // Check SecureStore for the user object/token
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
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
                    <Drawer.Navigator
                        useLegacyImplementation
                        initialRouteName="Home"
                        screenOptions={{ headerShown: true }}
                    >
                        <Drawer.Screen name="Home" component={AppStack} />
                        <Drawer.Screen
                            name="Settings"
                            component={SettingsScreen}
                        />
                    </Drawer.Navigator>
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                    <AuthStackNavigator />
                </NavigationContainer>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
