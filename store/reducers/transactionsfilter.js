import { SprintF } from "../../utils/Number";
import { TRANSACTION_FILTER_SET } from "../actions/transactionsfilter";
let dateFilter = new Date();
const initialState = {
    filter: {
        position: 1,
        date1: SprintF(dateFilter.getDate(), 2) + '/' + SprintF(dateFilter.getMonth(), 2) + '/' + dateFilter.getFullYear(),
        date2: SprintF(dateFilter.getDate(), 2) + '/' + SprintF(dateFilter.getMonth(), 2) + '/' + dateFilter.getFullYear(),
        category: '',
        desc: '',
    },
    data: [],
    spending: 0,
    income: 0,
    saldo: 0,
    fetched: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTION_FILTER_SET:
            return {
                ...state,
                data: action.data,
                spending: action.spending,
                income: action.income,
            }
        default:
            return state;
    }
}