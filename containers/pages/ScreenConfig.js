import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';

import * as configAction from '../../store/actions/config'
import * as categoriesAction from '../../store/actions/categories'
import ButtonOpacity from '../../components/atoms/ButtonOpacity';
import Card from '../../components/atoms/Card';
import { Body, Caption1 } from '../../components/atoms/Fonts';
import Colors from '../../utils/Colors';
import Select from '../../components/molecules/Select';
import SwitchInput from '../../components/molecules/SwitchInput';
import { listType } from '../../utils/data';
import CategoryForm from '../../components/organisms/CategoryForm';
import ItemsCategory from '../../components/organisms/ItemsCategory';

const Separator = () => <View style={styles.itemSeparator} />;

export default function ScreenConfig({ navigation }) {
    const dispatch = useDispatch();
    const selectedConfig = useSelector(state => state.configs)
    const selectedCategories = useSelector(state => state.categories.categories)


    const initialStateConfig = {
        manage: {
            value: selectedConfig ? selectedConfig.manage : '',
            isValid: true,
        },
        category: {
            value: selectedConfig ? selectedConfig.category : false,
            isValid: true,
        }
    }
    const [inputs, setInputs] = useState(initialStateConfig)
    const [isForm, setIsForm] = useState(false)
    const [defaultCategory, setDefaultCategory] = useState({})

    useEffect(() => {
        dispatch(categoriesAction.setCategory())
    }, [isForm, dispatch])

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        })
    }
    const handleCloseCategory = () => {
        setIsForm(false)
    }
    const confirmHandler = async () => {
        const data = {
            manage: inputs.manage.value,
            category: inputs.category.value,
            listCategories: Object.entries(selectedCategories),
        }
        const manageIsValid = data.manage.trim().length > 0
        const categoryIsValid = data.category == true || data.category == false
        const listCategoriesIsValid = data.category ? (data.listCategories && data.listCategories.length > 0 ? true : false) : true
        if (!manageIsValid || !categoryIsValid || !listCategoriesIsValid) {
            setInputs((curInputs) => {
                return {
                    manage: { value: curInputs.manage.value, isValid: manageIsValid },
                    category: { value: curInputs.category.value, isValid: categoryIsValid },
                }
            })
            return;
        }
        if (data.manage != selectedConfig.manage) {
            Alert.alert(
                "Konfigurasi Mengelola Berbeda",
                "Jika konfigurasi pengelolaan berbeda dengan sebelumnya, maka transaksi sebelumnya akan dihapus semua! Apakah Anda yakin?",
                [
                    // The "Yes" button
                    {
                        text: "Yes",
                        onPress: () => {
                            submit(data, selectedConfig);
                        },
                    },
                    // The "No" button
                    // Does nothing but dismiss the dialog when tapped
                    {
                        text: "No",
                    },
                ]
            );
        } else {
            await submit(data, selectedConfig);
        }

    }
    const submit = async (data, config) => {
        try {
            dispatch(configAction.addUpdateConfig(data.manage, data.category, config.manage))
            showMessage({
                message: "Data berhasil disimpan!",
                type: "success",
            });
            navigation.navigate('ScreenHomeTab')
        } catch (error) {
            showMessage({
                message: "Terjadi kesalahan pada sistem!",
                type: "danger",
            });
        }
    }
    const handleEditCategory = async (item) => {
        setDefaultCategory({
            id: item.id,
            value: item.value
        })
        setIsForm(true)
    }
    const handleCategoryDeleteItem = async (item) => {
        try {
            dispatch(categoriesAction.deleteCategory(item.id))
            dispatch(categoriesAction.setCategory())
        } catch (error) {
            showMessage({
                message: "Terjadi kesalahan pada sistem!",
                type: "danger",
            });
        }
    }
    const handleSaveCategory = useCallback(async (item) => {
        setIsForm(false)
        try {
            if (item.id && item.id != '') {
                dispatch(categoriesAction.updateCategory(item.value, item.id))
            } else {
                dispatch(categoriesAction.insertCategory(item.value))
            }
        } catch (error) {
            showMessage({
                message: "Terjadi kesalahan pada sistem!",
                type: "danger",
            });
        }
    }, [dispatch])
    let tempCtagories = [];
    if (Object.entries(selectedCategories).length > 0) {
        tempCtagories = Object.entries(selectedCategories).map((e) => ({ 'id': e[0], 'value': e[1] }));
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.inner}>
                    {
                        selectedConfig.manage == "" && (
                            <Card styleProps={{ backgroundColor: Colors.white, padding: 20, marginHorizontal: 20, marginTop: 20 }}>
                                <Body styleProps={{ color: Colors.danger500 }}>
                                    Silahkan isi konfigurasi terlebih dahulu!
                                </Body>
                            </Card>
                        )
                    }
                    <Card styleProps={{ backgroundColor: Colors.white, padding: 20, margin: 20 }}>
                        <View style={styles.form}>
                            <View style={styles.formInput}>
                                <Select
                                    style={styles.rowInput}
                                    label='Mengelola'
                                    invalid={inputs.manage.isValid}
                                    data={listType}
                                    onChangeText={inputChangedHandler.bind(this, 'manage')}
                                    inputConfig={{
                                        defaultButtonText: 'Pilih Tipe',
                                        defaultValue: inputs.manage.value
                                    }}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <SwitchInput
                                    label='Tampilkan Kategori'
                                    invalid={inputs.category.isValid}
                                    inputConfig={{
                                        onValueChange: inputChangedHandler.bind(this, 'category'),
                                        value: inputs.category.value
                                    }}
                                />
                            </View>
                        </View>
                        {
                            inputs.category.value && (
                                <View style={styles.form}>
                                    {
                                        tempCtagories && tempCtagories.length < 1 && (
                                            <View style={{ marginBottom: 10 }}>
                                                <Caption1 styleProps={{ color: Colors.danger500 }}>Kategori Wajib diisi!</Caption1>
                                            </View>
                                        )
                                    }
                                    <View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
                                        {
                                            !isForm && (
                                                <Icon name="ios-add-circle" color={Colors.primary500} size={40} onPress={() => {
                                                    setIsForm(true)
                                                    setDefaultCategory({
                                                        id: '',
                                                        value: ''
                                                    })
                                                }} />
                                            )
                                        }
                                    </View>
                                    {
                                        isForm ? (
                                            <CategoryForm defaultValues={defaultCategory} handleCloseCategory={handleCloseCategory} onSubmit={handleSaveCategory} />
                                        ) : (
                                            <>
                                                <View style={{ marginBottom: 10, flex: 1 }}>
                                                    {
                                                        tempCtagories.map(function (val, key) {
                                                            return (
                                                                <ItemsCategory item={val} handleDeleteItem={handleCategoryDeleteItem} handleEditCategory={handleEditCategory} key={val.id} />
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </>
                                        )
                                    }
                                </View>
                            )
                        }
                        <View>
                            <ButtonOpacity variant="primary" outline onPress={confirmHandler}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name='md-save' size={21} color={Colors.primary300} />
                                    <Body styleProps={{ color: Colors.primary500, marginHorizontal: 5, marginTop: 2 }}>Simpan</Body>
                                </View>
                            </ButtonOpacity>
                        </View>
                    </Card>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    configuration: {
        margin: 20
    },
    form: {
        marginBottom: 5,
    },
    rowInput: {
        flex: 1,
    },
    configuration: {
        margin: 20
    },
    form: {
        marginBottom: 20
    },
    formInput: {
        marginBottom: 5
    },
    rowInput: {
        flex: 1,
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
})