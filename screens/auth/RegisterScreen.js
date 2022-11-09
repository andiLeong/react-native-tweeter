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
import FormikInput from '../../component/FormikInput';

function RegisterScreen({ navigation }) {
    const { loginSuccess } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let fields = [
        {
            name: 'username',
        },
        {
            name: 'name',
            placeHolder: 'Your Name',
        },

        {
            name: 'email',
            textContentType: 'emailAddress',
        },
        {
            name: 'password',
            isSecure: true,
        },
        {
            name: 'password_confirmation',
            isSecure: true,
            placeHolder: 'Confirm your password',
        },
    ];

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
    registerButtonContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignSelf: 'center',
    },
});
