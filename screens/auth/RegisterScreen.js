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
import { Formik } from 'formik';
import * as yup from 'yup';
import appAxios from '../../helper/appAxios';

function RegisterScreen({ navigation }) {
    const { loginSuccess } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const Validation = yup.object().shape({
        password: yup.string().min(3).required(),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref('password')], 'Your passwords do not match')
            .required('Password needs to confirm'),
        email: yup.string().email().required(),
        name: yup.string().required(),
        username: yup.string().required(),
    });

    function store(values) {
        values.device_name = 'ios';
        appAxios
            .via('post')
            .to('/api/register')
            .setPayload(values)
            .before(() => setIsLoading(true))
            .onSuccess(({ data }) => {
                console.log(data);
                loginSuccess(data);
            })
            .onFailure(error => {
                const key = Object.keys(error.response.data.errors)[0];
                setError(error.response.data.errors[key][0]);
            })
            .after(() => setIsLoading(false))
            .fire();
    }

    return (
        <View style={styles.container}>
            <View style={{ width: 280 }}>
                {error && (
                    <Text style={{ color: 'red', marginBottom: 10 }}>
                        {error}
                    </Text>
                )}

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                        username: '',
                        password_confirmation: '',
                    }}
                    validationSchema={Validation}
                    onSubmit={values => store(values)}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                placeholder="Name"
                                placeholderTextColor="gray"
                                textContentType="name"
                                autoCapitalize="none"
                            />

                            {touched.name && errors.name && (
                                <Text style={styles.validationError}>
                                    {errors.name}
                                </Text>
                            )}

                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                placeholder="Username"
                                placeholderTextColor="gray"
                                textContentType="username"
                                autoCapitalize="none"
                            />

                            {touched.username && errors.username && (
                                <Text style={styles.validationError}>
                                    {errors.username}
                                </Text>
                            )}

                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder="Email"
                                placeholderTextColor="gray"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            {touched.email && errors.email && (
                                <Text style={styles.validationError}>
                                    {errors.email}
                                </Text>
                            )}

                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                placeholder="Password"
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                secureTextEntry={true}
                            />

                            {touched.password && errors.password && (
                                <Text style={styles.validationError}>
                                    {errors.password}
                                </Text>
                            )}

                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange(
                                    'password_confirmation'
                                )}
                                onBlur={handleBlur('password_confirmation')}
                                value={values.password_confirmation}
                                placeholder="Password"
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                secureTextEntry={true}
                            />

                            {touched.password_confirmation &&
                                errors.password_confirmation && (
                                    <Text style={styles.validationError}>
                                        {errors.password_confirmation}
                                    </Text>
                                )}

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
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
                                    style={{
                                        color: 'white',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>

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
    validationError: {
        color: 'red',
        marginTop: 5,
    },
});
