import React, { useContext, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AuthContext } from '../../context/AuthProvider';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikInput from '../../component/FormikInput';

function LoginScreen({ navigation }) {
    const { login, error, isLoading } = useContext(AuthContext);

    const Validation = yup.object().shape({
        password: yup
            .string()
            .min(3, 'Too Short!')
            .required('Password is Required'),
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is Required'),
    });

    let fields = [
        {
            name: 'email',
            textContentType: 'emailAddress',
        },
        {
            name: 'password',
            isSecure: true,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={{ width: 280 }}>
                {error && (
                    <Text style={{ color: 'red', marginBottom: 10 }}>
                        {error}
                    </Text>
                )}

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Validation}
                    onSubmit={values => login(values.email, values.password)}
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
                            {fields.map((field, index) => (
                                <FormikInput
                                    key={index}
                                    name={field.name}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    value={values[field.name]}
                                    touched={touched}
                                    placeHolder={field?.placeHolder}
                                    isSecure={field?.isSecure}
                                    textContentType={field?.textContentType}
                                />
                            ))}

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
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>

                <View style={styles.registerButtonContainer}>
                    <Text style={{ color: 'white' }}>No account ? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register Screen')}
                    >
                        <Text
                            style={{
                                color: 'white',
                                textDecorationLine: 'underline',
                            }}
                        >
                            Register Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;

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
    registerButtonContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignSelf: 'center',
    },
});
