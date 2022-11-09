import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import FirstToUpper from '../helper/FirstToUpper';

function FormikInput({
    name,
    placeHolder,
    handleChange,
    handleBlur,
    value,
    errors,
    textContentType,
    keyboardType,
    isSecure,
    touched,
}) {
    function getPlaceHolder() {
        if (!placeHolder) {
            return FirstToUpper(name);
        }
        return placeHolder;
    }

    function getTextContentType() {
        if (!textContentType) {
            return 'name';
        }
        return textContentType;
    }

    function getKeyboardType() {
        if (!keyboardType) {
            return 'email-address';
        }
        return keyboardType;
    }

    function getSecureTextEntry() {
        return isSecure;
    }

    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                value={value}
                placeholder={getPlaceHolder()}
                placeholderTextColor="gray"
                textContentType={getTextContentType()}
                autoCapitalize="none"
                keyboardType={getKeyboardType()}
                secureTextEntry={getSecureTextEntry()}
            />

            {touched[name] && errors[name] && (
                <Text style={styles.validationError}>{errors[name]}</Text>
            )}
        </>
    );
}

export default FormikInput;

const styles = StyleSheet.create({
    input: {
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        backgroundColor: 'white',
    },

    validationError: {
        color: 'red',
        marginTop: 5,
    },
});
