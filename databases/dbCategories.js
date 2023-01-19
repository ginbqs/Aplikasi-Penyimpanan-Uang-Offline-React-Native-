import database from './index'
export const fetchCategory = () => {
    return promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `select * from categories`
                , [],
                (tx, results) => {
                    var tempCategories = {}
                    var row = results.rows;
                    for (let i = 0; i < row.length; i++) {
                        tempCategories[row.item(i).id] = row.item(i).value;
                    }
                    resolve(tempCategories)
                },
                (error) => {
                    reject(error);
                }
            )
        })
    })
}
export const insertCategoryItem = (category) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `insert into categories (value) values (?)`
                , [category],
                (tx, results) => {
                    resolve(results);
                },
                (_, error) => {
                    reject(error);
                }
            )
        })
    })
}
export const updateCategoryItem = (category, id) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `update categories set value=? where id=?`
                , [category, id],
                (tx, results) => {
                    resolve(results);
                },
                (_, error) => {
                    reject(error);
                }
            )
        })
    })
}
export const deleteCategoryItem = (id) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `delete from categories where id=?`
                , [id],
                (tx, results) => {
                    resolve(results);
                },
                (ee, error) => {
                    reject(error);
                }
            )
        })
    })
}