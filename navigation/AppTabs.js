import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';

function AppTabs() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home1"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search Screen"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="notifications"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting Screen"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="ios-settings"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppTabs;
