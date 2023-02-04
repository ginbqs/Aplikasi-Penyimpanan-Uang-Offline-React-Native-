import React, { useRef, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, FlatList, Alert, PermissionsAndroid } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import XLSX from 'xlsx';
var RNFS = require('react-native-fs');
import * as transactionFilterAction from '../../store/actions/transactionsfilter'

import Colors from "../../utils/Colors";
import Card from '../../components/atoms/Card';
import { Footnote, Headline, SubHead, Body } from '../../components/atoms/Fonts';
import ButtonOpacity from '../../components/atoms/ButtonOpacity';
import { Currency } from '../../utils/Number';
import Loading from '../../components/atoms/Loading';
import Input from '../../components/molecules/Input';
import DatePicker from '../../components/molecules/DatePicker';
import Select from '../../components/molecules/Select';
import { convertDate, formatDate } from "../../utils/data";
import ItemTransactionFilter from "../../components/organisms/ItemTransactionFilter";

function FilterComponent({ selectedConfig, tempCtagories, showDatePicker, isDatePickerVisible, submitHandler, handleCancelTransaction, inputs, handleConfirmDate, inputChangedHandler, onChangeText }) {
    return (
        <View style={styles.containerRBSheet}>
            {
                selectedConfig.manage == 'Semua' && (
                    <Select
                        label='Tipe'
                        data={[{ id: 'semua', value: 'Semua' }, { id: 'pemasukan', value: 'Pemasukan' }, { id: 'pengeluaran', value: 'Pengeluaran' }]}
                        invalid={true}
                        onChangeText={(item, index) => onChangeText('position', item)}
                        inputConfig={{
                            defaultValue: inputs.position_selected
                        }}
                    />
                )
            }
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8 }}>
                    <Input
                        label='Tanggal Awal'
                        invalid={true}
                        inputConfig={{
                            onFocus: showDatePicker.bind(this, 'date1'),
                            value: formatDate(inputs.date1, 'dd/mm/yyyy')
                        }}
                    />
                </View>
                <View style={{ flex: 1, paddingTop: 20, marginLeft: 5 }}>
                    <ButtonOpacity onPress={showDatePicker.bind(this, 'date1')} variant="primary" outline>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="calendar-outline" size={19} color={Colors.primary500} />
                        </View>
                    </ButtonOpacity>
                </View>
                <DatePicker
                    isVisible={isDatePickerVisible.show}
                    mode="date"
                    date={new Date()}
                    identifier={isDatePickerVisible.identifier}
                    onConfirm={(event, identifier) => handleConfirmDate(event, identifier)}
                />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8 }}>
                    <Input
                        label='Tanggal Akhir'
                        invalid={true}
                        inputConfig={{
                            onFocus: showDatePicker.bind(this, 'date2'),
                            value: formatDate(inputs.date2, 'dd/mm/yyyy')
                        }}
                    />
                </View>
                <View style={{ flex: 1, paddingTop: 20, marginLeft: 5 }}>
                    <ButtonOpacity onPress={showDatePicker.bind(this, 'date2')} variant="primary" outline>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="calendar-outline" size={19} color={Colors.primary500} />
                        </View>
                    </ButtonOpacity>
                </View>
            </View>
            {
                selectedConfig.category && (
                    <Select
                        label='Kategori'
                        data={tempCtagories}
                        invalid={true}
                        onChangeText={(item, index) => onChangeText('category', item)}
                        inputConfig={{
                            defaultValue: inputs.category_selected
                        }}
                    />
                )
            }
            <Input
                label='Deskripsi'
                invalid={true}
                inputConfig={{
                    value: inputs.desc,
                    numberOfLines: 3,
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'desc'),
                }}
            />
            <View style={{ marginBottom: 10 }}>
                <ButtonOpacity onPress={submitHandler} variant="primary" outline>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='ios-save' size={21} color={Colors.primary500} />
                        <Footnote styleProps={{ marginHorizontal: 5, marginVertical: 1, color: Colors.primary500 }}>Simpan</Footnote>
                    </View>
                </ButtonOpacity>
            </View>
            <ButtonOpacity onPress={handleCancelTransaction} variant="default" outline>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='ios-close-circle' size={21} color={Colors.gray} />
                    <Footnote styleProps={{ marginHorizontal: 5, marginVertical: 1, color: Colors.gray }}>Batal</Footnote>
                </View>
            </ButtonOpacity>
        </View>
    )
}

export default function ScreenFilter({ navigation }) {
    const selectedConfig = useSelector(state => state.configs)
    const selectedTransactionsFilter = useSelector(state => state.transactionsFilter)
    const dispatch = useDispatch();

    const selectedCategories = useSelector(state => state.categories.categories)
    let tempCtagories = [{id:'',value:'Pilih Kategori'}];
    if (Object.entries(selectedCategories).length > 0) {
        Object.entries(selectedCategories).map((e) => {
            tempCtagories.push({ 'id': e[0], 'value': e[1] });
        })
    }
    var date = new Date();
    const initialValue = {
        position: 'semua',
        position_selected: { id: 'semua', value: 'Semua' },
        date1: date,
        date2: date,
        desc: '',
        category_id: '',
        category_selected: '',
    }
    const [inputs, setInputs] = useState(initialValue)
    const refRBSheet = useRef();
    const [isDatePickerVisible, setDatePickerVisibility] = useState({ identifier: '', show: false });
    const showDatePicker = (inputIdentifier) => {
        setDatePickerVisibility((curInputs) => {
            return {
                ...curInputs,
                identifier: inputIdentifier,
                show: !curInputs.show,
            }
        })
    };

    const handleConfirmDate = useCallback(async (identifier, event) => {
        const selectedDate = new Date(event.nativeEvent.timestamp)
        showDatePicker(identifier)
        inputChangedHandler(identifier, selectedDate)
    }, []);

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: enteredValue
            }
        })
    }
    const handleCancelTransaction = () => {
        refRBSheet.current.close()
        setInputs(initialValue)
    }
    const onChangeText = (identifier, item) => {
        if (item) {
            inputChangedHandler(identifier + '_id', item.id)
            inputChangedHandler(identifier + '_selected', item)
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await setInputs(initialValue)
            await getData();
        });
        return unsubscribe;
    }, [navigation])
    const submitHandler = () => {
        getData();
        refRBSheet.current.close()
    }
    const handleDeleteTransactions = async () => {
        Alert.alert(
            "Hapus",
            "Kamu yakin akan menghapus semua data ini?",
            [
                {
                    text: "Batal",
                    style: "cancel"
                },
                {
                    text: "Hapus", onPress: async () => {
                        await dispatch(transactionFilterAction.deleteTransactions(inputs))
                        await getData();
                    }
                }
            ]
        );
    }
    const renderEmpty = () => {
        return (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Headline>Transaksi tidak ditemukan</Headline>
                <ButtonOpacity onPress={getData}><Body>Refresh</Body></ButtonOpacity>
            </View>
        )
    }

    const getData = async () => {
        dispatch(transactionFilterAction.setTransactions(inputs))
    }
    const exportDataToExcel = () => {

        // Created Sample data
        let sample_data_to_export = [];
        selectedTransactionsFilter.data.map(function (val, key) {
            sample_data_to_export.push({
                tanggal: convertDate(val.date, 'yyyy-mm-dd', 'dd-mm-yyyy'),
                posisi: val.position == '0' ? 'Pemasukan' : 'Pengeluaran',
                jumlah: val.value,
                kategori: selectedCategories[val.category_id],
                deskripsi: val.desc
            })
        })
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(sample_data_to_export)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
        // console.log(wbout)
        // Write generated excel to Storage
        RNFS.writeFile(RNFS.DownloadDirectoryPath + '/uangku.xlsx', wbout, 'ascii').then((r) => {
            showMessage({
                message: "Data berhasil disimpan. Silahkan cari file UangKu.xlsx pada folder download",
                type: "success",
                duration: 3000
            });
        }).catch((e) => {
            console.log('Error', e);
            showMessage({
                message: "Data gagal disimpan!",
                type: "danger",
            });
        });

    }
    const handleExportTransactions = async () => {
        try {
            // Check for Permission (check if permission is already given or not)
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (!isPermitedExternalStorage) {

                // Ask for permission
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage permission needed",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );


                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted (calling our exportDataToExcel function)
                    exportDataToExcel();
                    console.log("Permission granted");
                } else {
                    // Permission denied
                    console.log("Permission denied");
                }
            } else {
                // Already have Permission (calling our exportDataToExcel function)
                exportDataToExcel();
            }
        } catch (e) {
            console.log('Error while checking permission');
            console.log(e);
            return
        }
    }

    return (
        <View
            style={styles.container}
        >
            {
                    selectedConfig.manage.toLowerCase() == 'semua' ? (
                        <Card styleProps={{ ...styles.containerPemasukanPengeluaran, marginTop: 10 }}>
                            <View>
                                <Headline>{Currency(selectedTransactionsFilter.income, 'rp')}</Headline>
                                <SubHead styleProps={{ color: Colors.primary500 }}>Total Pemasukan</SubHead>
                            </View>
                            <View>
                                <Headline>{Currency(selectedTransactionsFilter.spending, 'rp')}</Headline>
                                <SubHead styleProps={{ color: Colors.primary500 }}>Total Pengeluaran</SubHead>
                            </View>
                        </Card>
                    ) : (
                        <Card styleProps={{ ...styles.containerPemasukanPengeluaran, marginTop: 10,justifyContent:'flex-start' }}>
                            {
                                selectedConfig.manage.toLowerCase() == 'pemasukan' ? (
                                    <View>
                                        <Headline>{Currency(selectedTransactionsFilter.income, 'rp')}</Headline>
                                        <SubHead styleProps={{ color: Colors.primary500 }}>Total Pemasukan</SubHead>
                                    </View>
                                ) : (
                                    <View>
                                        <Headline>{Currency(selectedTransactionsFilter.spending, 'rp')}</Headline>
                                        <SubHead styleProps={{ color: Colors.primary500 }}>Total Pengeluaran</SubHead>
                                    </View>
                                )
                            }
                        </Card>
                    )
                }
            <SafeAreaView style={styles.containerFinance}>
                <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                    <View style={{ marginRight: 5 }}>
                        <ButtonOpacity onPress={() => handleDeleteTransactions()} variant="danger" outline >
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='download' size={21} color={Colors.danger500} />
                                <Footnote styleProps={{ marginHorizontal: 5, marginVertical: 1, color: Colors.danger600 }}>Hapus</Footnote>
                            </View>
                        </ButtonOpacity>
                    </View>
                    <View style={{ marginRight: 5 }}>
                        <ButtonOpacity onPress={() => handleExportTransactions('')} variant="success" outline>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='download' size={21} color={Colors.success500} />
                                <Footnote styleProps={{ marginHorizontal: 5, marginVertical: 1, color: Colors.success600 }}>Export</Footnote>
                            </View>
                        </ButtonOpacity>
                    </View>
                    <View >
                        <ButtonOpacity onPress={() => refRBSheet.current.open()} variant="primary" >
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-search' size={21} color={Colors.white} />
                            </View>
                        </ButtonOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    {
                        !selectedTransactionsFilter.fetched ? (
                            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                <Loading size={50} />
                            </View>
                        ) :
                            <FlatList
                                data={selectedTransactionsFilter.data}
                                renderItem={item => <ItemTransactionFilter item={item.item} />}
                                keyExtractor={(item) => item.id}
                                ListEmptyComponent={renderEmpty}
                            />
                    }
                </View>
            </SafeAreaView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={540}
                openDuration={250}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(52, 52, 52, 0.8)'
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <FilterComponent
                    selectedConfig={selectedConfig}
                    showDatePicker={showDatePicker}
                    isDatePickerVisible={isDatePickerVisible}
                    selectedTransactionsFilter={selectedTransactionsFilter}
                    inputs={inputs}
                    handleConfirmDate={handleConfirmDate}
                    inputChangedHandler={inputChangedHandler}
                    handleCancelTransaction={handleCancelTransaction}
                    submitHandler={submitHandler}
                    tempCtagories={tempCtagories}
                    onChangeText={onChangeText}
                />
            </RBSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray
    },
    containerRBSheet: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.white
    },
    containerPemasukanPengeluaran: {
        marginHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.white,
    },
    containerFinance: {
        padding: 15,
        backgroundColor: Colors.white,
        flex: 1
    },
})