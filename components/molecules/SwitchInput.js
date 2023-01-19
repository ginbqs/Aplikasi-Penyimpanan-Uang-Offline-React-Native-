import React from 'react';
import { View, Switch, StyleSheet } from 'react-native'
import Colors from '../../utils/Colors';
import { Body, Caption1 } from '../atoms/Fonts';

const SwitchInput = ({ label, invalid, isEnabled, inputConfig }) => {
    return (
        <View style={styles.switch}>
            <Body>{label}</Body>
            <Switch
                trackColor={{ false: "#767577", true: Colors.primary500 }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                {...inputConfig}
            />
            {!invalid && (
                <View style={{ marginBottom: 5 }}>
                    <Caption1 styleProps={{ color: Colors.danger500 }}>{label} wajib diisi!</Caption1>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    switch: {
        alignItems: "flex-start",
    }
})

export default SwitchInput