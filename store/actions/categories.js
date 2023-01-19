import { insertCategoryItem, fetchCategory, deleteCategoryItem, updateCategoryItem } from "../../databases/dbCategories"


export const CATEGORIES_SET = 'CATEGORIES_SET'
export const CATEGORIES_ADD = 'CATEGORIES_ADD'
export const CATEGORIES_UPDATE = 'CATEGORIES_UPDATE'
export const CATEGORIES_DELETE_ITEM = 'CATEGORIES_DELETE_ITEM'

export const setCategory = () => {
    return async dispatch => {
        try {
            const dbResultCategory = await fetchCategory()
            dispatch({
                type: CATEGORIES_SET,
                categories: dbResultCategory
            })
        } catch (error) {
            throw error
        }
    }
}
export const insertCategory = (text) => {
    return async dispatch => {
        try {
            const dbResult = await insertCategoryItem(text)
            await dispatch({ type: CATEGORIES_ADD, category: text, id: dbResult.insertId })
        } catch (error) {
            throw error
        }
    }
}
export const updateCategory = (text, id) => {
    return async dispatch => {
        try {
            const dbResult = await updateCategoryItem(text, id)
            await dispatch({ type: CATEGORIES_UPDATE, value: text, id: id })
        } catch (error) {
            throw error
        }
    }
}

export const deleteCategory = (id) => {
    return async dispatch => {
        try {
            const dbResult = await deleteCategoryItem(id)
            await dispatch({
                type: CATEGORIES_DELETE_ITEM,
                id: id
            })
            return dbResult
        } catch (error) {
            throw error
        }
    }
}