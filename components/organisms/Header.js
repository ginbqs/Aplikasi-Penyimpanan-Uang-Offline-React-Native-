import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {
    LineChart, PieChart,
} from "react-native-chart-kit";

import SelectDropdown from 'react-native-select-dropdown'

import { listType, listThisDate } from '../../utils/data'
import Colors from '../../utils/Colors'
import { SubHead, Title2 } from '../atoms/Fonts';
import { Currency } from '../../utils/Number';


const Header = ({ dataChart, urlImage, urLConfig, config, saldo, setDay, hanldeChangeChart, versionAndroid }) => {
    income = [];
    dataChart.dataIncome && dataChart.dataIncome.map(function (val) {
        income.push(val / 1000)
    })
    spending = [];
    dataChart.dataSpending && dataChart.dataSpending.map(function (val) {
        spending.push(val / 1000)
    })
    const newSaldo = config.manage == 'Pengeluaran' ? -1 * saldo : saldo
    const legends = config.manage == 'Semua' ? ["Pemasukan", "Pengeluaran"] : []
    var filterlistType = config.category ? listType : ['Semua']
    let datasets = [];
    if (versionAndroid >= 27) {
        if (dataChart && dataChart.labels && dataChart.labels.length > 0 && (dataChart.type == '' || dataChart.type == 'Semua')) {
            datasets = [
                {
                    data: income,
                    strokeWidth: 2,
                    color: (opacity = 1) => `rgba(228, 206, 235, ${opacity})`,
                },
                {
                    data: spending,
                    strokeWidth: 2,
                    color: (opacity = 1) => `rgba(142, 132, 145, ${opacity})`,
                },
            ]
        }
    }

    const listDate = listThisDate();

    return (
        <View style={styles.chartContainer}>
            <ImageBackground source={{ uri: urlImage }} resizeMode="cover" style={{ ...styles.imageHeader, height: versionAndroid >= 8.1 ? 220 : 115 }}>
                <View style={styles.containerHead}>
                    <View>
                        <SubHead styleProps={styles.saldo}>{(config.manage == 'Semua' ? 'Sisa Saldo' : config.manage)}</SubHead>
                        <Title2 styleProps={styles.saldo}>{Currency(newSaldo, 'rp')}</Title2>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Icon name="ios-settings" color={Colors.white} onPress={() => urLConfig()} size={30} />
                    </View>
                </View>
                {
                    versionAndroid >= 27 ? (
                        <View style={styles.containerChart}>
                            <View style={styles.containerFilter}>
                                <View style={styles.filterYear}>
                                    {
                                        dataChart.type == '' || dataChart.type == 'Semua' && (
                                            <SelectDropdown
                                                data={listDate}
                                                defaultButtonText='Tanggal'
                                                defaultValue={dataChart.day}
                                                onSelect={(selectedItem, index) => {
                                                    setDay(selectedItem)
                                                }}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    // text represented after item is selected
                                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                                    return selectedItem
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    // text represented for each item in dropdown
                                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                                    return item
                                                }}
                                                buttonStyle={styles.dropdown1BtnStyle}
                                                buttonTextStyle={styles.dropdownTextStyle}
                                                rowTextStyle={styles.dropdownTextRowStyle}
                                            />
                                        )
                                    }
                                </View>
                                <View style={styles.filterDebitKredit}>
                                    <SelectDropdown
                                        data={filterlistType}
                                        defaultButtonText={'Pilih Tipe'}
                                        onSelect={(selectedItem, index) => {
                                            hanldeChangeChart(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            // text represented after item is selected
                                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                                            return selectedItem
                                        }}
                                        rowTextForSelection={(item, index) => {
                                            // text represented for each item in dropdown
                                            // if data array is an array of objects then return item.property to represent item in dropdown
                                            return item
                                        }}
                                        buttonStyle={styles.dropdown1BtnStyle}
                                        buttonTextStyle={styles.dropdownTextStyle}
                                        rowTextStyle={styles.dropdownTextRowStyle}
                                    />
                                </View>
                            </View>
                            <View style={styles.contianerChart}>
                                {
                                    dataChart && dataChart.labels && dataChart.labels.length > 0 && dataChart.type == 'Semua' ?
                                        <LineChart
                                            data={{
                                                labels: dataChart.labels,
                                                datasets: datasets,
                                                legend: legends
                                            }}
                                            width={Dimensions.get("window").width * 0.91}
                                            height={180}
                                            yAxisSuffix="k"
                                            yAxisInterval={1}
                                            chartConfig={{
                                                backgroundGradientFrom: Colors.primary800,
                                                backgroundGradientTo: Colors.primary400,
                                                decimalPlaces: 0,
                                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                style: {
                                                    borderRadius: 16
                                                },
                                                propsForDots: {
                                                    r: "6",
                                                    strokeWidth: "2",
                                                    stroke: "#ffa726"
                                                }
                                            }}
                                            bezier
                                            style={{
                                                borderRadius: 9
                                            }}
                                        />
                                        : (
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <PieChart
                                                    data={dataChart.dataPie}
                                                    width={Dimensions.get("window").width - 50} // from react-native
                                                    height={220}
                                                    chartConfig={{
                                                        color: (opacity = 1) => `white`,
                                                        labelColor: (opacity = 1) => `white`,
                                                        style: {
                                                            borderRadius: 16
                                                        },
                                                    }}
                                                    backgroundColor={"transparent"}
                                                    accessor="population"
                                                    paddingLeft="15"
                                                    // absolute
                                                    // hasLegend={true}
                                                    style={{
                                                        marginVertical: 8,
                                                        borderRadius: 16
                                                    }}
                                                />
                                            </View>
                                        )
                                }
                            </View>
                        </View>
                    ) : (
                        <></>
                    )
                }
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
    },
    imageHeader: {
        flex: 1,
    },
    containerHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        top: 16,
    },
    saldo: {
        color: Colors.white
    },
    profile: {
        color: Colors.white
    },
    containerChart: {
        height: 250,
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 5,
        opacity: 0.8,
        backgroundColor: Colors.gray,
    },
    containerFilter: {
        flexDirection: 'row',
        // paddingRight: Dimensions.get('window').width * 0.09,
        paddingTop: 5,
        justifyContent: 'flex-end'
    },
    filterYear: {
        marginHorizontal: 5
    },
    filterMonth: {
        marginHorizontal: 5
    },
    filterDebitKredit: {
        marginHorizontal: 5
    },
    dropdown1BtnStyle: {
        height: 20,
        width: 85,
        paddingHorizontal: 0,
        borderRadius: 2,
        backgroundColor: Colors.gray
    },
    dropdownTextStyle: {
        fontSize: 10,
        padding: 0,
        margin: 0,
    },
    dropdownTextRowStyle: {
        fontSize: 11,
        marginHorizontal: 1
    },
    contianerChart: {
        // flex:1,
        padding: 5,
        height: '100%',
        // backgroundColor:'red'
        // flex:1,
        // marginTop: 5,
        // alignItems: 'center',
        // justifyContent: 'center'
    },



    sectionChart: {
        // position: 'absolute',
        // width: Dimensions.get('window').width,
        // height: 250,
        backgroundColor: 'yellow'
    },





    chart: {
        height: 250,
    },
})

export default Header;