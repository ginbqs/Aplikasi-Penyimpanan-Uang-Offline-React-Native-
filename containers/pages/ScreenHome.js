import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    View,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux'

import * as configAction from '../../store/actions/config'
import * as transactionAction from '../../store/actions/transactions'
import Colors from '../../utils/Colors'
import { Footnote, Headline, SubHead, Body } from '../../components/atoms/Fonts';
import Card from '../../components/atoms/Card';
import Header from '../../components/organisms/Header';
import ButtonOpacity from '../../components/atoms/ButtonOpacity';
import { urlImage } from '../../utils/data'
import ItemTransactions from '../../components/organisms/ItemTransactions';
import { Currency } from '../../utils/Number';
import Loading from '../../components/atoms/Loading';
import { seeder } from '../../databases/dbSeeder';


export default function ScreenHome({ navigation }) {
    const dispatch = useDispatch();
    const selectedConfig = useSelector(state => state.configs)
    const selectedTransactions = useSelector(state => state.transactions)
    const selectedChart = selectedTransactions.dataChart

    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        dispatch(configAction.setConfig())
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData(1)
            getDataChart()
            // seeder();
        });
        if (selectedConfig.fetched) {
            return unsubscribe;
        }
    }, [selectedConfig.fetched,navigation])

    useEffect(() => {
        if (selectedConfig.fetched && selectedConfig?.manage == "") {
            navigation.navigate('ScreenConfig')
        }
    }, [selectedConfig])
    useEffect(() => {
        if (selectedChart.day && selectedChart.type != '' && selectedConfig.fetched) {
            getDataChart()
        }
    }, [selectedChart.day, selectedChart.type, selectedConfig.fetched]);
    const getData = async (page) => {
        dispatch(transactionAction.setTransactions(page))
    }

    const getDataChart = async () => {
        dispatch(transactionAction.setChart(selectedChart.day, selectedChart.type))
    }

    const handleTransactionDeleteItem = async (item) => {
        try {
            dispatch(transactionAction.deleteTransaction(item.id, selectedConfig.category))
        } catch (error) {
            showMessage({
                message: "Terjadi kesalahan pada sistem!",
                type: "danger",
            });
        }
    }


    const handleEditTransactions = async (id) => {
        navigation.navigate('ScreenHomeForm', {
            transId: id
        })
    }
    const requestTransactions = async () => {
        await getData(selectedTransactions.page)
    }
    const fetchMoreTransaction = async () => {
        if (!selectedTransactions.isEnd) {
            getData(parseInt(selectedTransactions.page) + 1)
        }
    }
    const renderEmpty = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Headline>Transaksi tidak ditemukan</Headline>
                <ButtonOpacity onPress={requestTransactions}><Body>Refresh</Body></ButtonOpacity>
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                {selectedTransactions.moreLoading && <ActivityIndicator size={40} />}
                {selectedTransactions.isListEnd && selectedTransactions.data.length > 0 && <Body>Data transaksi sudah semua ditampilkan</Body>}
            </View>
        )
    }

    const redirectToConfig = () => {
        navigation.navigate('ScreenConfig')
    }
    const handleChangeDay = async (day) => {
        dispatch(transactionAction.setDayChart(day))
    }
    const hanldeChangeChart = async (type) => {
        dispatch(transactionAction.setTypeChart(type))
    }
    const versionAndroid = Platform.constants['Version'];
    if (!selectedConfig.fetched) return <Loading size={70} />
    // console.log('selectedTransactions \n\n')
    // console.log(selectedTransactions)
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ ...styles.containerHeader, height: (versionAndroid >= 27 ? 325 : 75) }}>
                <Header dataChart={selectedChart} urlImage={urlImage} urLConfig={redirectToConfig} config={selectedConfig} saldo={selectedTransactions.saldo} setDay={handleChangeDay} hanldeChangeChart={hanldeChangeChart} versionAndroid={versionAndroid} />
            </View>
            <View style={styles.main}>
                {
                    selectedConfig.manage.toLowerCase() == 'semua' && (
                        <Card styleProps={{ ...styles.containerPemasukanPengeluaran, marginTop: 10 }}>
                            <View>
                                <Headline>{Currency(selectedTransactions.income, 'rp')}</Headline>
                                <SubHead styleProps={{ color: Colors.primary500 }}>Total Pemasukan</SubHead>
                            </View>
                            <View>
                                <Headline>{Currency(selectedTransactions.spending, 'rp')}</Headline>
                                <SubHead styleProps={{ color: Colors.primary500 }}>Total Pengeluaran</SubHead>
                            </View>
                        </Card>
                    )
                }
                <SafeAreaView style={styles.containerFinance}>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <ButtonOpacity onPress={() => handleEditTransactions('')} variant="primary" outline>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name='ios-add-circle' size={21} color={Colors.primary300} />
                                <Footnote styleProps={{ marginHorizontal: 5, marginVertical: 1, color: Colors.primary500 }}>Tambah</Footnote>
                            </View>
                        </ButtonOpacity>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        {
                            !selectedTransactions.fetched ? (
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Loading size={50} />
                                </View>
                            ) :
                                <FlatList
                                    data={selectedTransactions.data}
                                    renderItem={item => <ItemTransactions item={item.item} handleDeleteItem={handleTransactionDeleteItem} handleEditTransactions={handleEditTransactions} />}
                                    keyExtractor={(item) => item.id}
                                    scrollEnabled
                                    onRefresh={() => requestTransactions()}
                                    refreshing={isFetching}
                                    ListEmptyComponent={renderEmpty}
                                    ListFooterComponent={renderFooter}
                                    onEndReachedThreshold={0.2}
                                    onEndReached={fetchMoreTransaction}
                                />
                        }
                    </View>
                </SafeAreaView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        position: 'relative',
        backgroundColor: 'white'
    },
    main: {
        flex: 1,
    },
    containerPemasukanPengeluaran: {
        marginHorizontal: 20,
        marginBottom: 20,
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