import AppTabs from './AppTabs';
import NewTweetScreen from '../screens/NewTweetScreen';
import TweetScreen from '../screens/TweetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';

function AppStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={AppTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="New Tweet"
                component={NewTweetScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="Tweet Screen"
                component={TweetScreen}
                options={{ title: '' }}
            />
            <Stack.Screen
                name="Profile Screen"
                component={ProfileScreen}
                options={{ title: '' }}
            />
        </Stack.Navigator>
    );
}

export default AppStack;
