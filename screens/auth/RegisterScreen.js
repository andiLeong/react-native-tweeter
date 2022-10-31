import React from 'react';
import { Button, Text, View } from 'react-native';

function RegisterScreen({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>register now</Text>

            <Button
                onPress={() => navigation.navigate('Login Screen')}
                title={'login'}
            />
        </View>
    );
}

export default RegisterScreen;
