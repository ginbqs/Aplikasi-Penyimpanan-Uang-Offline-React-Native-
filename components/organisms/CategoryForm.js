import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../utils/Colors';
import Input from '../molecules/Input';

const CategoryForm = ({ handleCloseCategory, onSubmit, defaultValues }) => {
    const [inputCategory, setInputCategory] = useState({
        id: defaultValues && defaultValues.id ? defaultValues.id : '',
        value: defaultValues && defaultValues.value ? defaultValues.value : '',
        isValid: true
    })
    const inputChangedCategoryHandler = (enteredValue) => {
        setInputCategory((curInputs) => {
            return {
                ...curInputs,
                value: enteredValue,
                isValid: true
            }
        })
    }
    const handleSaveCategory = async () => {
        const inputCategoryIsValid = await inputCategory.value.trim().length > 0
        if (!inputCategoryIsValid) {
            await setInputCategory((curInputs) => {
                return {
                    ...curInputs,
                    isValid: inputCategoryIsValid
                }
            })
            return;
        }
        await setInputCategory({
            id: '',
            value: '',
            isValid: true
        })
        onSubmit(inputCategory)
    }



    return (
        <View style={styles.form}>
            <View style={{ marginBottom: 10, flex: 4 }}>
                <Input
                    label='Kategori'
                    invalid={inputCategory.isValid}
                    inputConfig={{
                        onChangeText: inputChangedCategoryHandler.bind(this),
                        value: inputCategory.value
                    }}
                />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center' }}>
                <Icon name="ios-save" size={35} color={Colors.primary500} onPress={() => handleSaveCategory()} />
                <Icon name="close-circle-outline" size={35} color={Colors.primary500} onPress={() => handleCloseCategory()} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    form: {
        flexDirection: 'row',
        marginBottom: 20
    },
})

export default CategoryForm;