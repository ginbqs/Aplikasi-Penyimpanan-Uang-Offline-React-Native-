import React from 'react';
import { View, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

import Colors from '../../utils/Colors'
import { Body, Caption1 } from '../atoms/Fonts'

const Select = ({ label, data, inputConfig, onChangeText, invalid }) => {
    return (
        <View>
            <Body>{label}</Body>
            <SelectDropdown
                {...inputConfig}
                data={data}
                onSelect={(selectedItem, index) => {
                    onChangeText(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.value ? selectedItem.value : selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.value ? item.value : item
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdownTextStyle}
                rowTextStyle={styles.dropdownTextRowStyle}
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
    dropdown1BtnStyle: {
        height: 40,
        width: '100%',
        paddingHorizontal: 0,
        borderRadius: 6,
        backgroundColor: Colors.gray,
        color: Colors.primary700,
        marginBottom: 10
    },
    dropdownTextStyle: {
        fontSize: 14,
        textAlign: 'left',
        color: Colors.primary700,
        padding: 0,
        margin: 0,
    },
    dropdownTextRowStyle: {
        fontSize: 14,
        color: Colors.primary700,
        marginHorizontal: 1
    },
})

export default Select;