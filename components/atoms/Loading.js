import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import Colors from '../../utils/Colors'

export default function Loading({ size }) {
    return <View style={styles.container}>
        <ActivityIndicator size={size} color={Colors.primary500} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})