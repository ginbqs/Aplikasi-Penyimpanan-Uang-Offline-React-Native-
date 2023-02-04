import React, { useState, useCallback } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../utils/Colors';
import { Footnote } from '../../components/atoms/Fonts';
import Input from '../../components/molecules/Input';
import InputNumber from '../../components/molecules/InputNumber';
import SwitchLabel from '../../components/molecules/SwitchLabel';
import Select from '../../components/molecules/Select';
import ButtonOpacity from '../../components/atoms/ButtonOpacity'
import * as transactionAction from '../../store/actions/transactions'
import DatePicker from '../../components/molecules/DatePicker';
import { SprintF } from '../../utils/Number';

const ScreenHomeForm = ({ navigation, route }) => {
    const { transId } = route.params;
    const dispatch = useDispatch();
    const selectedConfig = useSelector(state => state.configs)
    const selectedChart = useSelector(state => state.charts)
    var editedTrans = useSelector(state =>
        state.transactions.data.find(trans => trans.id === transId)
    )
    const selectedCategories = useSelector(state => state.categories.categories)
    let tempCtagories = [];
    if (Object.entries(selectedCategories).length > 0) {
        tempCtagories = Object.entries(selectedCategories).map((e) => ({ 'id': e[0], 'value': e[1] }));
    }
    if (editedTrans && editedTrans.category_id) {
        editedTrans = {
            ...editedTrans,
            category_selected: { id: editedTrans.category_id.toString(), value: selectedCategories[editedTrans.category_id] }
        }
    }
    const handleCancelTransaction = () => {
        navigation.navigate('ScreenHomeTab')
    }
    if (editedTrans) {
        const date = editedTrans.date;
        var today = date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4)
        var dateSelected = new Date(date.substring(0, 4) + '-' + date.substring(5, 7) + '-' + date.substring(8, 10))
    } else {
        var today = new Date();
        var dateSelected = today
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        today = dd + '/' + mm + '/' + yyyy;
    }

    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 1);
    var minDate = new Date();
    minDate.setDate(minDate.getDate() - 14);
    const initialValue = {
        id: {
            value: editedTrans ? editedTrans.id : '',
            isValid: true,
        },
        position: {
            value: selectedConfig.manage == 'Semua' ? (editedTrans ? (editedTrans.position == '0' ? false : true) : true) : (selectedConfig.manage == 'Pengeluaran' ? true : false),
            isValid: true,
        },
        date: {
            value: today,
            isValid: true,
        },
        value: {
            value: editedTrans ? editedTrans.value : 0,
            isValid: true,
        },
        desc: {
            value: editedTrans ? editedTrans.desc : '',
            isValid: true,
        },
        category_id: {
            value: editedTrans ? editedTrans.category_id : '',
            isValid: true,
        },
        category_selected: {
            value: editedTrans ? editedTrans.category_selected : '',
            isValid: true,
        },
    }
    const [inputs, setInputs] = useState(initialValue)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const handleConfirmDate = useCallback(async (event, selectedDate) => {
        setDatePickerVisibility(false);
        var today = new Date(selectedDate.nativeEvent.timestamp);
        const yyyy = today.getFullYear();
        let mm = SprintF(today.getMonth() + 1,2); // Months start at 0!
        let dd = SprintF(today.getDate(),2);
        today = dd + '/' + mm + '/' + yyyy;
        inputChangedHandler('date', today)
    }, []);

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        })
    }
    const submitHandler = async () => {
        const data = {
            id: inputs.id.value,
            position: inputs.position.value,
            date: inputs.date.value,
            value: inputs.value.value,
            desc: inputs.desc.value,
            category_id: inputs.category_id.value,
        }
        const positionIsValid = data.position == true || data.position == false
        const valueIsValid = data.value > 0 ? true : false
        const category_idIsValid = data.category_id > 0

        if (!positionIsValid || !valueIsValid || (!category_idIsValid && selectedConfig.category)) {
            await setInputs((curInputs) => {
                return {
                    ...curInputs,
                    position: { value: curInputs.position.value, isValid: positionIsValid },
                    date: { value: curInputs.date.value, isValid: true },
                    value: { value: curInputs.value.value, isValid: valueIsValid },
                    desc: { value: curInputs.desc.value, isValid: true },
                    category_id: { value: curInputs.category_id.value, isValid: category_idIsValid },
                }
            })
            return;
        } else {
            try {
                if (data.id && data.id != '') {
                    dispatch(transactionAction.updateTransaction(data.id, data.position, data.date, data.value, data.desc, data.category_id, selectedConfig.category, selectedChart))
                } else {
                    dispatch(transactionAction.insertTransactionItem(data.date, data.position, data.value, data.desc, data.category_id, selectedConfig.category, selectedChart))
                }
                showMessage({
                    message: "Data berhasil disimpan!",
                    type: "success",
                });
                await navigation.goBack()
            } catch (error) {
                showMessage({
                    message: "Terjadi kesalahan pada sistem!",
                    type: "danger",
                });
            }
        }
    }
    const onChangeText = (item) => {
        if (item) {
            inputChangedHandler('category_id', item.id)
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.inner}>
                    <View style={styles.container}>
                        {
                            selectedConfig.manage == 'Semua' && (
                                <SwitchLabel
                                    label="Tipe"
                                    labelSwitch={{
                                        on: 'Pengeluaran',
                                        off: 'Pemasukan'
                                    }}
                                    identifier='position'
                                    value={inputs.position.value}
                                    handleSwitch={(inputIdentifier, enteredValue) => inputChangedHandler(inputIdentifier, enteredValue)}
                                />
                            )
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 8 }}>
                                <Input
                                    label='Tanggal'
                                    invalid={inputs.date.isValid}
                                    inputConfig={{
                                        onFocus: showDatePicker.bind(this),
                                        value: inputs.date.value
                                    }}
                                />
                            </View>
                            <View style={{ flex: 1, paddingTop: 20, marginLeft: 5 }}>
                                <ButtonOpacity onPress={showDatePicker.bind(this)} variant="primary" outline>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="calendar-outline" size={19} color={Colors.primary500} />
                                    </View>
                                </ButtonOpacity>
                            </View>
                            <DatePicker
                                minimumDate={minDate}
                                maximumDate={maxDate}
                                isVisible={isDatePickerVisible}
                                mode="date"
                                date={dateSelected}
                                onConfirm={handleConfirmDate}
                            />
                        </View>
                        <InputNumber
                            label='Jumlah'
                            invalid={inputs.value.isValid}
                            inputConfig={{
                                value: inputs.value.value,
                                onChangeValue: inputChangedHandler.bind(this, 'value'),
                                prefix: "Rp. ",
                                delimiter: ",",
                                separator: ".",
                                precision: 0
                            }}
                        />
                        {
                            selectedConfig.category && (
                                <Select
                                    label='Kategori'
                                    data={tempCtagories}
                                    invalid={inputs.category_id.isValid}
                                    onChangeText={(item, index) => onChangeText(item, index)}
                                    inputConfig={{
                                        defaultValue: inputs.category_selected.value
                                        // defaultValueByIndex:inputs.category_id.value
                                    }}
                                />
                            )
                        }

                        <Input
                            label='Deskripsi'
                            invalid={inputs.value.isValid}
                            inputConfig={{
                                value: inputs.desc.value,
                                numberOfLines: 3,
                                multiline: true,
                                onChangeText: inputChangedHandler.bind(this, 'desc'),
                            }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 10 }}>
                                <ButtonOpacity onPress={submitHandler} variant="primary" outline>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name='ios-save' size={21} color={Colors.primary500} />
                                        <Footnote styleProps={{ marginHorizontal: 5, marginVertical: 1, color: Colors.primary500 }}>Simpan</Footnote>
                                    </View>
                                </ButtonOpacity>
                            </View>
                            <ButtonOpacity onPress={handleCancelTransaction} variant="default" outline>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name='ios-close-circle' size={21} color={Colors.gray} />
                                    <Footnote styleProps={{ marginHorizontal: 5, marginVertical: 1, color: Colors.gray }}>Batal</Footnote>
                                </View>
                            </ButtonOpacity>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    }
})
export default ScreenHomeForm;