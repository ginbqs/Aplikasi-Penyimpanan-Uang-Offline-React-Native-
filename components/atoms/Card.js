import React from 'react';
import { View, StyleSheet } from 'react-native'


const Card = ({ children, styleProps }) => {
    return (
        <View style={{ ...styles.card, ...styleProps }}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})

export default Card;