import React from 'react';
import {Button, Text, View} from "react-native";

function HomeScreen({navigation }) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>This is Home screen</Text>

            <Button
                title={`create new tweet`}
                onPress={() => navigation.navigate('New Tweet')}
            />

            <Button
                title={`tweet page`}
                onPress={() => navigation.navigate('Tweet Screen')}
            />

            <Button
                title={`Profile`}
                onPress={() => navigation.navigate('Profile Screen')}
            />

        </View>
    );
}

export default HomeScreen;