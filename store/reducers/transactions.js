import {
    TRANSACTION_SET, TRANSACTION_FETCHING, TRANSACTION_ADD, TRANSACTION_UPDATE, TRANSACTION_DELETE, TRANSACTION_SUM, CHART_DAY, CHART_LINE_SET, CHART_PIE_SET, CHART_TYPE, TRANSACTION_END
} from "../actions/transactions";


const initialState = {
    fetched: false,
    error: null,
    data: [],
    dataChart: {
        dataIncome: [],
        dataSpending: [],
        day: new Date().getDate(),
        labels: [],
        type: 'Semua',
        dataPie: []
    },
    page: 1,
    isEnd: false,
    saldo: 0,
    income: 0,
    spending: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTION_SET:
            if(action.page == 1){
                var newData = action.data
            }else{
                var newData = [...state.data, ...action.data]
            }
            return {
                ...state,
                data: newData,
                page: action.page,
                fetched: true,
                isEnd: action.isEnd
            }
        case TRANSACTION_END:
            return {
                ...state,
                fetched: true,
                isEnd: action.isEnd
            }
        case TRANSACTION_FETCHING:
            return {
                ...state,
                fetched: action.status
            }
        case TRANSACTION_SUM:
            return {
                ...state,
                income: action.data?.income || 0,
                spending: action.data?.spending || 0,
                saldo: action.data?.saldo || 0
            }
        case TRANSACTION_ADD:
            var data = [action.data]
            var saldo = state.saldo;
            var income = state.income
            var spending = state.spending
            var chart = state.dataChart
            var chartIndex = chart.labels.indexOf(parseInt(action.data.date.substring(8, 10)))
            var chartSpending = state.dataChart.dataSpending
            var chartIncome = state.dataChart.dataIncome
            var chartPie = state.dataChart.dataPie

            if (action.data && action.data.position && action.data.position == '1') {
                saldo -= parseInt(action.data.value)
                spending += parseInt(action.data.value)
                chartSpending[chartIndex] = parseInt(chartSpending[chartIndex]) + parseInt(action.data.value)
            } else {
                saldo += parseInt(action.data.value)
                income += parseInt(action.data.value)
                chartIncome[chartIndex] = parseInt(chartIncome[chartIndex]) + parseInt(action.data.value)
            }

            return {
                ...state,
                data: [...data, ...state.data],
                saldo: saldo,
                income: income,
                spending: spending,
                dataChart: {
                    ...chart,
                    dataSpending: chartSpending,
                    dataIncome: chartIncome,
                }
            }
        case TRANSACTION_UPDATE:
            var { id, position, date, value, desc, category_id } = action

            var newData = state.data
            var dataIndex = newData.findIndex((val => val.id == id))
            var saldo = state.saldo
            var income = state.income
            var spending = state.spending
            var chart = state.dataChart
            var chartIndex = chart.labels.indexOf(parseInt(action.date.substring(8, 10)))
            var chartSpending = state.dataChart.dataSpending
            var chartIncome = state.dataChart.dataIncome
            var chartPie = state.dataChart.dataPie

            if (position != newData[dataIndex].position) {
                if (position == '1') {
                    if (chart.type === 'Pemasukan') {
                        var chartPieIndex = chartPie.findIndex(f => f.id === category_id);
                        chartPie[chartPieIndex].population = parseInt(chartPie[chartPieIndex].population) - parseInt(newData[dataIndex].value)
                    } else if (chart.type === 'Pengeluaran') {
                        var chartPieIndex = chartPie.findIndex(f => f.id === category_id);
                        chartPie[chartPieIndex].population = parseInt(chartPie[chartPieIndex].population) + parseInt(value)
                    }
                    income -= parseInt(newData[dataIndex].value)
                    spending += parseInt(value)
                    chartIncome[chartIndex] = parseInt(chartIncome[chartIndex]) - parseInt(newData[dataIndex].value)
                    chartSpending[chartIndex] = parseInt(chartSpending[chartIndex]) + parseInt(value)
                } else {
                    if (chart.type === 'Pengeluaran') {
                        var chartPieIndex = chartPie.findIndex(f => f.id === category_id);
                        chartPie[chartPieIndex].population = parseInt(chartPie[chartPieIndex].population) - parseInt(newData[dataIndex].value)
                    } else if (chart.type === 'Pemasukan') {
                        var chartPieIndex = chartPie.findIndex(f => f.id === category_id);
                        chartPie[chartPieIndex].population = parseInt(chartPie[chartPieIndex].population) + parseInt(value)
                    }
                    spending -= parseInt(newData[dataIndex].value)
                    income += parseInt(value)
                    chartSpending[chartIndex] = parseInt(chartSpending[chartIndex]) - parseInt(newData[dataIndex].value)
                    chartIncome[chartIndex] = parseInt(chartIncome[chartIndex]) + parseInt(value)
                }
            }
            if (position == newData[dataIndex].position && value != newData[dataIndex].value) {
                if (position == '1') {
                    spending -= parseInt(newData[dataIndex].value)
                    spending += parseInt(value)
                    chartSpending[chartIndex] = parseInt(chartSpending[chartIndex]) - parseInt(newData[dataIndex].value)
                    chartSpending[chartIndex] = parseInt(chartSpending[chartIndex]) + parseInt(value)
                } else {
                    income -= parseInt(newData[dataIndex].value)
                    income += parseInt(value)
                    chartIncome[chartIndex] = parseInt(chartIncome[chartIndex]) - parseInt(newData[dataIndex].value)
                    chartIncome[chartIndex] = parseInt(chartIncome[chartIndex]) + parseInt(value)
                }
                if (chart.type === 'Pemasukan' || chart.type === 'Pengeluaran') {
                    var chartPieIndex = chartPie.findIndex(f => f.id === category_id);
                    chartPie[chartPieIndex].population = parseInt(chartPie[chartPieIndex].population) - parseInt(newData[dataIndex].value)
                    chartPie[chartPieIndex].population = parseInt(chartPie[chartPieIndex].population) + parseInt(value)
                }
            }
            saldo = income - spending

            newData[dataIndex].position = position
            newData[dataIndex].date = date
            newData[dataIndex].value = value
            newData[dataIndex].desc = desc
            newData[dataIndex].category_id = category_id

            return {
                ...state,
                data: newData,
                saldo: saldo,
                income: income,
                spending: spending,
                dataChart: {
                    ...chart,
                    dataSpending: chartSpending,
                    dataIncome: chartIncome,
                }
            }
        case TRANSACTION_DELETE:
            var newData = state.data
            var id = action.id
            var saldo = state.saldo
            var income = state.income
            var spending = state.spending
            var chart = state.dataChart
            var chartSpending = state.dataChart.dataSpending
            var chartIncome = state.dataChart.dataIncome
            var chartPie = state.dataChart.dataPie

            var findData = newData.filter(function (item) {
                return item.id == id
            })
            findData = findData[0]
            var chartIndex = state.dataChart.labels.indexOf(parseInt(findData.date.substring(8, 10)))
            if (findData.position == '1') {
                spending -= findData.value;
                saldo += findData.value
                chartSpending[chartIndex] = parseInt(chartSpending[chartIndex]) - parseInt(findData.value)
            } else {
                saldo -= findData.value
                income -= findData.value;
                chartIncome[chartIndex] = parseInt(chartIncome[chartIndex]) - parseInt(findData.value)
            }

            var deleteCategories = newData.filter(function (item) {
                return item.id != id
            })

            return {
                ...state,
                data: deleteCategories,
                saldo: saldo,
                income: income,
                spending: spending,
                dataChart: {
                    ...chart,
                    dataSpending: chartSpending,
                    dataIncome: chartIncome,
                }
            }
        case CHART_PIE_SET:
            var oldDataChart = state.dataChart
            return {
                ...state,
                dataChart: {
                    ...oldDataChart,
                    dataPie: action.dataChart,
                }
            }
        case CHART_DAY:
            var oldDataChart = state.dataChart
            return {
                ...state,
                dataChart: {
                    ...oldDataChart,
                    day: action.day,
                }
            }
        case CHART_TYPE:
            var oldDataChart = state.dataChart
            return {
                ...state,
                dataChart: {
                    ...oldDataChart,
                    type: action.typeChart,
                }
            }
        case CHART_LINE_SET:
            var oldDataChart = state.dataChart
            return {
                ...state,
                dataChart: {
                    ...oldDataChart,
                    dataIncome: action.dataChart.dataIncome,
                    dataSpending: action.dataChart.dataSpending,
                    labels: action.dataChart.labels,
                }
            }
        default:
            return state;
    }
}