import { fetchTransactionFilter, deleteTransactionFilter } from "../../databases/dbTransactions"


export const TRANSACTION_FILTER_SET = 'TRANSACTION_FILTER_SET'
export const TRANSACTION_FILTER_END = 'TRANSACTION_FILTER_END'



export const setTransactions = (filters) => {
    return async dispatch => {
        try {
            const dbRestultTransactionsFilter = await fetchTransactionFilter(filters)
            await dispatch({
                type: TRANSACTION_FILTER_SET,
                data: dbRestultTransactionsFilter.data,
                income: dbRestultTransactionsFilter.totalIncome,
                spending: dbRestultTransactionsFilter.totalSpending,
            })
        } catch (error) {
            throw error
        }
    }
}

export const deleteTransactions = (filters) => {
    return async dispatch => {
        try {
            const dbRestultTransactionsFilter = await deleteTransactionFilter(filters)
        } catch (error) {
            throw error
        }
    }
}