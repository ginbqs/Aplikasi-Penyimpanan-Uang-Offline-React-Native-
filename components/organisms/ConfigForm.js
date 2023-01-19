import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import ButtonOpacity from '../atoms/ButtonOpacity';
import Card from '../atoms/Card';
import { Body, Caption1 } from '../atoms/Fonts';
import Colors from '../../utils/Colors';
import Select from '../molecules/Select';
import SwitchInput from '../molecules/SwitchInput';
import { listType } from '../../utils/data';
import CategoryForm from './CategoryForm';

const ConfigForm = ({ onSubmit, defaultValues }) => {
    const selectedCategories = []
    const initialStateConfig = {
        manage: {
            value: defaultValues ? defaultValues.manage : '',
            isValid: true,
        },
        category: {
            value: defaultValues ? defaultValues.category : false,
            isValid: true,
        }
    }
    const [inputs, setInputs] = useState(initialStateConfig)
    // useEffect(() => {
    //     setInputs(initialStateConfig)
    // },[defaultValues])
    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        })
    }

    const submitHandler = () => {
        const data = {
            manage: inputs.manage.value,
            category: inputs.category.value,
            listCategories: selectedCategories,
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
        onSubmit(data);
    }
    return (
        <>
            {
                defaultValues.manage == undefined && (
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
                        <View>
                            {
                                selectedCategories && selectedCategories.length < 1 && (
                                    <View style={{ marginBottom: 10 }}>
                                        <Caption1 styleProps={{ color: Colors.danger500 }}>Kategori Wajib diisi!</Caption1>
                                    </View>
                                )
                            }
                            <CategoryForm listCategories={selectedCategories} />
                        </View>
                    )
                }

                <ButtonOpacity variant="primary" outline onPress={submitHandler}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='md-save' size={21} color={Colors.primary300} />
                        <Body styleProps={{ color: Colors.primary500, marginHorizontal: 5, marginTop: 2 }}>Simpan</Body>
                    </View>
                </ButtonOpacity>

            </Card>
        </>
    )
}

const styles = StyleSheet.create({
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
})

export default ConfigForm