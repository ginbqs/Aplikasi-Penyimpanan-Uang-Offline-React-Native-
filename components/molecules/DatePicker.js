import React from 'react';
import { View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ minimumDate, maximumDate, date, isVisible, identifier, mode, onConfirm }) => {
    return (
        <View>
            {isVisible && (
                <DateTimePicker
                    testID={identifier}
                    value={date}
                    // default={defaultDate}
                    mode={mode}
                    is24Hour={false}
                    onChange={onConfirm.bind(this, identifier)}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                />
            )}
        </View>
    )
}

export default DatePicker;