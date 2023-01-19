import database from './index'

export const getDataChart = (date1, date2) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `select substr(date,1,10) as date,SUM(CASE WHEN position='0' THEN value ELSE 0 END) as income,
                SUM(CASE WHEN position='1' THEN value ELSE 0 END) as spending 
                from transactions where date BETWEEN date('${date2}') AND date('${date1}') group by substr(date,1,10)
                order by date asc`,
                [],
                (tx, results) => {
                    resolve(results.rows)
                },
                (error) => {
                    reject(error)
                }
            )
        })
    })
}
export const getDataChartCategory = (type) => {
    return promise = new Promise((resolve, reject) => {
        if (type == 'Pemasukan') {
            var typeChart = 0
        } else {
            var typeChart = 1
        }
        database.transaction(tx => {
            tx.executeSql(`select IFNULL(categories.id,'1') as id,IFNULL(categories.value,'UNCATEGORY') as category,sum(transactions.value) as value from transactions left join categories on (categories.id = transactions.category_id) where transactions.position=? group by transactions.category_id`,
                [typeChart],
                (tx, results) => {
                    resolve(results.rows)
                },
                (error) => {
                    reject(error)
                }
            )
        })
    })
}