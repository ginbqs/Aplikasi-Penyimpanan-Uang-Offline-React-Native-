
import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Alert,
    View,
    Dimensions
} from 'react-native';
import {
    GestureHandlerRootView,
    Swipeable,
} from 'react-native-gesture-handler';
import Colors from '../../utils/Colors'
import { Body, Caption1 } from '../../components/atoms/Fonts';
import ButtonOpacity from '../../components/atoms/ButtonOpacity'
import { Currency } from '../../utils/Number';
import { formatDate } from '../../utils/data';

const ItemTransactionFilter = ({ item }) => {
    const newDate = formatDate(new Date(item.date), 'dd-MM-yyyy')
    return (
        <View style={[styles.item, { backgroundColor: Colors.primary500 }]}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <View>
                    <Body styleProps={{ color: Colors.white }}>{item.desc}</Body>
                </View>
                <View>
                    <Body styleProps={{ color: Colors.white }}>{item.position == '1' ? '-' : '+'} {Currency(item.value, 'rp')}</Body>
                </View>
            </View>
            <Caption1 styleProps={{ color: Colors.white }}>{newDate}</Caption1>
        </View>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        height: Dimensions.get('window').height * 0.4,
        position: 'relative',
    },
    main: {
        flex: 1,
    },
    containerPemasukanPengeluaran: {
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.white,
    },
    containerFinance: {
        padding: 15,
        backgroundColor: Colors.white,
        flex: 1
    },

    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
    },
    title: {
        fontSize: 20,
    },
})
export default ItemTransactionFilter;
