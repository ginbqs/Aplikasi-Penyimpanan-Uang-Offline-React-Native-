import React from 'react';
import { StyleSheet, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { Body, Caption1 } from '../atoms/Fonts';
import Colors from '../../utils/Colors'

const Input = ({ label, invalid, inputConfig }) => {
    return (
        <View>
            <Body>{label}</Body>
            <CurrencyInput style={{ ...styles.input, marginBottom: (invalid ? 10 : 3) }} {...inputConfig} />
            {!invalid && (
                <View style={{ marginBottom: 5 }}>
                    <Caption1 styleProps={{ color: Colors.danger500 }}>{label} wajib diisi!</Caption1>
                </View>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: Colors.gray,
        color: Colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
});

export default Input;