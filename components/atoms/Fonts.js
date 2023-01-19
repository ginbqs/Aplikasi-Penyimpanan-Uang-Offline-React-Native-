import React from 'react';
import { Text, StyleSheet } from 'react-native'
export const LargeTitle = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.largeTitle, ...styleProps }}>{children}</Text>
    )
}

export const Title1 = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.title1, ...styleProps }}>{children}</Text>
    )
}

export const Title2 = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.title2, ...styleProps }}>{children}</Text>
    )
}

export const Title3 = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.title3, ...styleProps }}>{children}</Text>
    )
}

export const Headline = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.headline, ...styleProps }}>{children}</Text>
    )
}

export const Body = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.body, ...styleProps }}>{children}</Text>
    )
}
export const Callout = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.callout, ...styleProps }}>{children}</Text>
    )
}

export const SubHead = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.subhead, ...styleProps }}>{children}</Text>
    )
}

export const Footnote = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.footnote, ...styleProps }}>{children}</Text>
    )
}

export const Caption1 = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.caption1, ...styleProps }}>{children}</Text>
    )
}

export const Caption2 = ({ children, styleProps }) => {
    return (
        <Text style={{ ...styles.caption2, ...styleProps }}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    largeTitle: {
        fontWeight: 'normal',
        fontSize: 34,
        lineHeight: 41,
        letterSpacing: 11
    },
    title1: {
        fontWeight: 'normal',
        fontSize: 28,
        lineHeight: 34,
        letterSpacing: 3
    },
    title2: {
        fontWeight: 'normal',
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 1
    },
    title3: {
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 25,
        letterSpacing: 0
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: 1
    },
    body: {
        fontWeight: 'normal',
        fontSize: 17,
        lineHeight: 22,
        letterSpacing: 0
    },
    callout: {
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0
    },
    subhead: {
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 20,
    },
    footnote: {
        fontWeight: 'normal',
        fontSize: 13,
        lineHeight: 18,
    },
    caption1: {
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0
    },
    caption2: {
        fontWeight: 'normal',
        fontSize: 11,
        lineHeight: 13,
        letterSpacing: 0
    }
})