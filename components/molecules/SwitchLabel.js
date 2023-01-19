import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import { Body } from '../atoms/Fonts'
import Colors from '../../utils/Colors'

const SwitchLabel = ({ value, label, labelSwitch, handleSwitch, identifier }) => {
    return (
        <View style={styles.container}>
            <Body>{label}</Body>
            <View style={styles.switch}>
                <TouchableOpacity style={{ ...styles.on, backgroundColor: (value ? Colors.primary500 : Colors.gray) }} onPress={() => handleSwitch(identifier, true)}>
                    <Body styleProps={{ fontWeight: (value ? 'bold' : 'normal'), color: (value ? Colors.white : Colors.black) }}>{labelSwitch && labelSwitch.on ? labelSwitch.on : 'ON'}</Body>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.off, backgroundColor: (!value ? Colors.primary500 : Colors.gray) }} onPress={() => handleSwitch(identifier, false)}>
                    <Body styleProps={{ fontWeight: (!value ? 'bold' : 'normal'), color: (!value ? Colors.white : Colors.black) }}>{labelSwitch && labelSwitch.off ? labelSwitch.off : 'OFF'}</Body>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    switch: {
        flexDirection: 'row',
        marginTop: 5
    },
    on: {
        // width:60,
        height: 40,
        padding: 10,
        backgroundColor: Colors.gray,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    off: {
        // width:60,
        height: 40,
        padding: 10,
        backgroundColor: Colors.gray,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default SwitchLabel;