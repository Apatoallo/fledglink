import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Picker from 'react-native-picker';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

class DatePicker extends Component {
    componentWillUnmount = () => {
        Picker.hide();
    }

    getYears = (startDate, endDate) => {
        const result = [];
        for (let i = startDate; i <= endDate; i++) {
            result.push(i);
        }
        return result;
    }

    createData = (startDate) => {
        const date = [[], []];
        const { yearStep = 20 } = this.props;
        date[1] = this.getYears(startDate - yearStep, startDate + yearStep);
        date[0] = months;
        return date;
    };

    getMonthNumber = (textMonth) => {
        for (let i = 0; i < months.length; i++) {
            if (months[i] === textMonth) {
                return i;
            }
        }
    };

    _onPressHandle() {
        Picker.toggle();
    }

    render() {
        const {
            value,
            startDate,
            onChange,
            label,
            colorText,
        } = this.props;
        let selectedYear;
        let selectedMonth;
        if (value) {
            selectedMonth = moment(value).format('MMMM');
            selectedYear = moment(value).format('YYYY');
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    Picker.init({
                        pickerData: this.createData(startDate),
                        selectedValue: value ? [selectedMonth, selectedYear] : ['January', 2019],
                        isLoop: true,
                        pickerToolBarBg: [255, 255, 255, 1],
                        pickerTitleText: 'Please, select date',
                        pickerBg: [255, 255, 255, 1],
                        pickerCancelBtnText: 'Clear',
                        pickerConfirmBtnText: 'Confirm',
                        onPickerConfirm: (data) => {
                            const numberMonths = this.getMonthNumber(data[0]);
                            const date = new Date();
                            date.setFullYear(data[1]);
                            date.setMonth(numberMonths);
                            onChange(date.toISOString());
                        },
                        onPickerCancel: () => {
                            onChange('');
                        },
                    });
                    Picker.show();
                }}
            >
                <Text style={{ color: colorText, fontSize: 16 }}>
                    {value
                        ? moment(value).format('MMM YYYY')
                        : label}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default DatePicker;
