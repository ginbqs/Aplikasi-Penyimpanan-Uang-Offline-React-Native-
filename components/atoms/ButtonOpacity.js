import React from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Colors from '../../utils/Colors'
import { Body } from './Fonts'
export default function ButtonOpacity({ children, onPress, variant, type, outline, title }) {
    let Touchable = TouchableOpacity
    if (Platform.OS == 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback
    }
    let backgroundColor = (variant === 'primary' ? Colors.primary400 : (variant === 'info' ? Colors.info500 : (variant === 'success' ? Colors.success500 : (variant === 'warning' ? Colors.warning500 : (variant === 'danger' ? Colors.danger400 : (variant === 'default' ? Colors.gray : ''))))))
    let color = (!variant ? Colors.black : (variant === 'info' || variant === 'success' || variant === 'danger' ? Colors.white : Colors.black))
    let child = type && type === 'button' ? <Body styleProps={{ color: color }}>{title}</Body> : children
    let content = <View>{child}</View>
    if (variant) {
        content = <View style={{ ...styles.button, backgroundColor: !outline ? backgroundColor : '', borderWidth: 1, borderColor: backgroundColor }}>{child}</View>
    }
    return (
        <Touchable onPress={onPress} useForeground>
            {content}
        </Touchable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 4,
    }
})