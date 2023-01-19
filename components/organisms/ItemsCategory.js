import React from 'react';
import { View, StyleSheet, Alert } from 'react-native'
import {
    GestureHandlerRootView,
    Swipeable,
} from 'react-native-gesture-handler';
import ButtonOpacity from '../atoms/ButtonOpacity';
import Colors from '../../utils/Colors';
import { Body } from '../atoms/Fonts'

const ItemsCategory = ({ item, handleDeleteItem, handleEditCategory }) => {
    const handleDeleteItemCategory = (item) => {
        Alert.alert(
            "Hapus",
            `Apakah kamu yakin akan menghapus kategori ${item.value}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => { handleDeleteItem(item) }
                }
            ]
        );
    }

    const rightSwipeActions = (item) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <ButtonOpacity onPress={() => handleDeleteItemCategory(item)}>
                    <View style={{ backgroundColor: Colors.danger400, height: '100%', width: 70, justifyContent: 'center', alignItems: 'center' }} >
                        <Body
                            styleProps={{
                                color: Colors.black,
                                paddingHorizontal: 10,
                                paddingHorizontal: 10,

                            }}
                        >
                            Delete
                        </Body>
                    </View>
                </ButtonOpacity>

                <ButtonOpacity onPress={() => handleEditCategory(item)}>
                    <View style={{ backgroundColor: Colors.success400, height: '100%', width: 70, justifyContent: 'center', alignItems: 'center' }} onPress={() => swipeFromRightOpen()}>
                        <Body
                            styleProps={{
                                color: Colors.black,
                                paddingHorizontal: 10,
                                paddingHorizontal: 10,
                            }}
                        >
                            Edit
                        </Body>
                    </View>
                </ButtonOpacity>
            </View>

        );
    };
    return (
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={() => rightSwipeActions(item)}
            >
                <View>
                    <View style={{ ...styles.item, backgroundColor: item.id % 2 == 0 ? Colors.primary100 : Colors.white }}>
                        <Body>{item.value}</Body>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexdirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.gray,
    },
    id: [

    ],
    value: {

    }
})

export default ItemsCategory;