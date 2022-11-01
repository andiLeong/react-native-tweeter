import React, { useContext, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { login, error, isLoading } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={{ width: 280 }}>
                {error && (
                    <Text style={{ color: 'red', marginBottom: 10 }}>
                        {error}
                    </Text>
                )}
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Name"
                    placeholderTextColor="gray"
                    textContentType="name"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username"
                    placeholderTextColor="gray"
                    textContentType="username"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirm Your Password"
                    placeholderTextColor="gray"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => login(email, password)}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <ActivityIndicator
                            style={{ marginRight: 8 }}
                            size="small"
                            color="white"
                        />
                    )}
                    <Text
                        style={{ color: 'white', textTransform: 'uppercase' }}
                    >
                        Register
                    </Text>
                </TouchableOpacity>

                <View style={styles.registerButtonContainer}>
                    <Text style={{ color: 'white' }}>Got account ? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login Screen')}
                    >
                        <Text
                            style={{
                                color: 'white',
                                textDecorationLine: 'underline',
                            }}
                        >
                            Login Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0ea5e9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0284c7',
        padding: 12,
        borderRadius: 5,
    },
    input: {
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        backgroundColor: 'white',
    },
    registerButtonContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignSelf: 'center',
    },
});
