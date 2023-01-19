import { SprintF } from '../../utils/Number';
import { fetchTransaction, insertTransaction, updateTransactionItem, deleteTransactionItem } from "../../databases/dbTransactions"
import { getDataChart, getDataChartCategory } from "../../databases/dbCharts"
import { listColors } from "../../utils/data";


export const TRANSACTION_SET = 'TRANSACTION_SET'
export const TRANSACTION_END = 'TRANSACTION_END'
export const TRANSACTION_FETCHING = 'TRANSACTION_FETCHING'
export const TRANSACTION_ADD = 'TRANSACTION_ADD'
export const TRANSACTION_DELETE = 'TRANSACTION_DELETE'
export const TRANSACTION_UPDATE = 'TRANSACTION_UPDATE'
export const TRANSACTION_SUM = 'TRANSACTION_SUM'

export const CHART_LINE_SET = 'CHART_LINE_SET'
export const CHART_PIE_SET = 'CHART_PIE_SET'
export const CHART_TYPE = 'CHART_TYPE'
export const CHART_DAY = 'CHART_DAY'



export const setTransactions = (page) => {
    return async dispatch => {
        try {
            const dbRestultTransactions = await fetchTransaction(page)
            if (dbRestultTransactions.length > 0) {
                await dispatch({
                    type: TRANSACTION_SET,
                    data: dbRestultTransactions,
                    page: page
                })
            } else {
                await dispatch({
                    type: TRANSACTION_END,
                    isEnd: true
                })
            }
        } catch (error) {
            throw error
        }
    }
}

export const insertTransactionItem = (date, position, value, desc, category_id, configCategory, chart) => {
    return async dispatch => {
        try {
            const now = new Date(date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2));
            const hours = new Date();
            const newDate = now.getFullYear() + "-" + SprintF((now.getMonth() + 1), 2) + "-" + SprintF(now.getDate(), 2) + " " + SprintF(hours.getHours(), 2) + ":" + SprintF(hours.getMinutes(), 2) + ":" + SprintF(hours.getSeconds(), 2)
            const dbResult = await insertTransaction(newDate, position, value, desc, category_id)
            var data =
            {
                id: dbResult.insertId,
                date: newDate,
                position: position,
                value: value,
                desc: desc,
                category_id: category_id

            }
            await dispatch({ type: TRANSACTION_ADD, data: data, configCategory: configCategory })
        } catch (error) {
            throw error
        }
    }
}

export const deleteTransaction = (id, configCategory) => {
    return async dispatch => {
        try {
            const dbResult = await deleteTransactionItem(id)
            await dispatch({
                type: TRANSACTION_DELETE,
                id: id,
                configCategory: configCategory
            })
            return dbResult
        } catch (error) {
            throw error
        }
    }
}
export const updateTransaction = (id, position, date, value, desc, category_id, configCategory, chart) => {
    return async dispatch => {
        try {
            const now = new Date(date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2));
            const hours = new Date();
            const newDate = now.getFullYear() + "-" + SprintF((now.getMonth() + 1), 2) + "-" + SprintF(now.getDate(), 2) + " " + SprintF(hours.getHours(), 2) + ":" + SprintF(hours.getMinutes(), 2) + ":" + SprintF(hours.getSeconds(), 2)
            const dbResult = await updateTransactionItem(id, position, newDate, value, desc, category_id)
            if (position) {

            } else {

            }
            await dispatch({ type: TRANSACTION_UPDATE, id: id, position: position, date: newDate, value: value, desc: desc, category_id: category_id, configCategory: configCategory })
        } catch (error) {
            throw error
        }
    }
}

export const setChart = (day, typeChart) => {
    return async dispatch => {
        try {
            if (typeChart == 'Semua') {
                const now = new Date()
                const endDay = new Date(now.getFullYear() + '-' + SprintF(now.getMonth() + 1, 2) + '-' + SprintF(day, 2))
                endDay.setDate(endDay.getDate() + 1);
                const date1 = endDay.getFullYear() + '-' + SprintF(endDay.getMonth() + 1, 2) + '-' + SprintF(endDay.getDate(), 2);

                const startDay = new Date(now.getFullYear() + '-' + SprintF(now.getMonth() + 1, 2) + '-' + SprintF(day, 2))
                startDay.setDate(startDay.getDate() - 6);
                const date2 = startDay.getFullYear() + '-' + SprintF(startDay.getMonth() + 1, 2) + '-' + SprintF(startDay.getDate(), 2);
                const dbResult = await getDataChart(date1, date2)
                var dataChart = {
                    dataIncome: [],
                    dataSpending: [],
                    labels: []
                }
                var chartDateIncome = {}
                var chartDateSpending = {}
                if (dbResult.length > 0) {
                    for (let i = 0; i < dbResult.length; i++) {
                        chartDateIncome[parseInt(dbResult.item(i).date.substring(8, 10))] = dbResult.item(i).income
                        chartDateSpending[parseInt(dbResult.item(i).date.substring(8, 10))] = dbResult.item(i).spending
                    }
                }

                var arrDays = [];
                var arrIncomeOrigin = [];
                var arrSpendingOrigin = [];
                for (var d = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate()); d <= new Date(endDay.getFullYear(), endDay.getMonth(), endDay.getDate()); d.setDate(d.getDate() + 1)) {
                    var thisDate = new Date(d).getDate()
                    arrDays.push(thisDate);
                    var valueIncome = chartDateIncome[thisDate] ? chartDateIncome[thisDate] : 0
                    arrIncomeOrigin.push(valueIncome)
                    var valueSpending = chartDateSpending[thisDate] ? chartDateSpending[thisDate] : 0
                    arrSpendingOrigin.push(valueSpending)
                }
                await arrDays.pop();
                dataChart['dataIncome'] = await arrIncomeOrigin
                dataChart['dataSpending'] = await arrSpendingOrigin
                dataChart['labels'] = await arrDays
                await dispatch({ type: CHART_LINE_SET, dataChart: dataChart })
            } else {
                const dbResult = await getDataChartCategory(typeChart)
                var tempChart = [{
                    id: 1,
                    name: "UnCategory",
                    population: 0,
                    color: listColors[0],
                    legendFontColor: "#7F7F7F"
                }]
                if (dbResult.length > 0) {
                    tempChart = [];
                }
                for (let i = 0; i < dbResult.length; i++) {
                    tempChart.push({
                        id: dbResult.item(i).id,
                        name: dbResult.item(i).category,
                        population: dbResult.item(i).value,
                        color: listColors[i],
                        legendFontColor: "#7F7F7F"
                    })
                }
                await dispatch({ type: CHART_PIE_SET, dataChart: tempChart })
            }
        } catch (error) {
            throw error
        }
    }
}

export const setTypeChart = (typeChart) => {
    return async dispatch => {
        try {
            await dispatch({ type: CHART_TYPE, typeChart: typeChart })
        } catch (error) {
            throw error
        }
    }
}

export const setDayChart = (day) => {
    return async dispatch => {
        try {
            await dispatch({ type: CHART_DAY, day: day })
        } catch (error) {
            throw error
        }
    }
}