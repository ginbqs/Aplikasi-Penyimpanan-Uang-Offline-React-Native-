import { CONFIGS_SET, CONFIGS_FETCH } from "../actions/config";

const initialState = {
    fetched: false,
    manage: '',
    category: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CONFIGS_SET:
            return {
                ...state,
                manage: action.config.manage,
                category: action.config.category == 1 ? true : false,
                fetched: true
            }
        case CONFIGS_FETCH:
            return {
                ...state,
                fetched: action.fetch
            }
        default:
            return state;
    }
}