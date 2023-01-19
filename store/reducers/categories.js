import { CATEGORIES_ADD, CATEGORIES_SET, CATEGORIES_DELETE_ITEM, CATEGORIES_UPDATE } from "../actions/categories";

const initialState = {
    categories: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_SET:
            return {
                categories: action.categories
            }
        case CATEGORIES_ADD:
            var newCategories = state.categories
            newCategories[action.id] = action.category;
            return {
                categories: newCategories
            }
        case CATEGORIES_DELETE_ITEM:
            var id = action.id
            var newCategories = state.categories
            delete newCategories[id];
            return {
                categories: newCategories
            }
        case CATEGORIES_UPDATE:
            var id = action.id
            var value = action.value
            var newCategories = state.categories
            newCategories[id] = value
            return {
                categories: newCategories
            }
        default:
            return state;
    }
}