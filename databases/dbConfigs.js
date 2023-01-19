import database from './index'

export const fetchConfig = () => {
    return promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `select * from configs`
                , [],
                (tx, results) => {
                    const row = results.rows;
                    var tempConfig = {}
                    for (let i = 0; i < row.length; i++) {
                        tempConfig = {
                            ...tempConfig,
                            [row.item(i).id]: row.item(i).value
                        }
                    }
                    resolve(tempConfig);
                },
                (error) => {
                    reject(error);
                }
            )
        })
    })
}

export const insertUpdateConfig = (manage, category, configManage) => {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            if (configManage != manage) {
                tx.executeSql(
                    `delete from transactions`,
                    [],
                    (tx, results) => {
                        // resolve(results.rows)
                    },
                    (error) => {
                        reject(error)
                    }
                )
            }
            tx.executeSql('select * from configs where id= ?', ['manage'], (tx, resultManage) => {
                if (resultManage.rows.length > 0) {
                    tx.executeSql('update configs set value= ? where id=?', [manage, 'manage'], (tx, resManage) => {
                        resolve(resManage.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                } else {
                    tx.executeSql('insert into configs (id,value) values (?,?)', ['manage', manage], (tx, resManage) => {
                        resolve(resManage.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                }
            }, (_, error) => {
                reject(error);
            })

            tx.executeSql('select * from configs where id= ?', ['category'], (tx, resultCategory) => {
                if (resultCategory.rows.length > 0) {
                    tx.executeSql('update configs set value= ? where id=?', [category, 'category'], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                } else {
                    tx.executeSql('insert into configs (id,value) values (?,?)', ['category', category], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                }
            }, (_, error) => {
                reject(error);
            })
        })
    })
}