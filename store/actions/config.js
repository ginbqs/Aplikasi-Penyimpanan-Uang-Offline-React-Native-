export const CONFIGS_SET = 'CONFIGS_SET'
export const CONFIGS_FETCH = 'CONFIGS_FETCH'

import { fetchCategory } from '../../databases/dbCategories'
import { insertUpdateConfig, fetchConfig } from '../../databases/dbConfigs'
import { sumTransaction } from '../../databases/dbTransactions'
import { CATEGORIES_SET } from './categories'
import { TRANSACTION_SUM } from './transactions'

export const setConfig = () => {
    return async dispatch => {
        try {
            const dbResultConfig = await fetchConfig()
            if (dbResultConfig.manage) {
                await dispatch({
                    type: CONFIGS_SET,
                    config: dbResultConfig
                })
                const dbResultCategory = await fetchCategory()
                await dispatch({
                    type: CATEGORIES_SET,
                    categories: dbResultCategory
                })
            } else {
                await dispatch({
                    type: CONFIGS_FETCH,
                    fetch: true
                })
            }
            return true
        } catch (error) {
            throw error
        }
    }
}

export const addUpdateConfig = (manage, category, configManage) => {
    return async dispatch => {
        try {
            const dbResult = await insertUpdateConfig(manage, category, configManage)
            await dispatch({
                type: CONFIGS_SET,
                config: {
                    manage: manage,
                    category: category
                }
            })
            return dbResult
        } catch (error) {
            throw error
        }
    }
}