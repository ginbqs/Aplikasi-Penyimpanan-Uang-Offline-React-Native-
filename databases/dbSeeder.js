import { SprintF } from '../utils/Number'
import database from './index'


export const seeder = () => {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql('select * from configs where id= ?', ['manage'], (tx, resultManage) => {
                if (resultManage.rows.length > 0) {
                    tx.executeSql('update configs set value= ? where id=?', ['Semua', 'manage'], (tx, resManage) => {
                        resolve(resManage.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                } else {
                    tx.executeSql('insert into configs (id,value) values (?,?)', ['manage', 'Semua'], (tx, resManage) => {
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
                    tx.executeSql('update configs set value= ? where id=?', ['1', 'category'], (tx, resConfigCategory) => {
                        resolve(resConfigCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                } else {
                    tx.executeSql('insert into configs (id,value) values (?,?)', ['category', '1'], (tx, resConfigCategory) => {
                        resolve(resConfigCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                }
            }, (_, error) => {
                reject(error);
            })

            tx.executeSql('select * from categories where value= ?', ['Gaji Bulanan'], (tx, resultCategories) => {
                if (resultCategories.rows.length < 1) {
                    tx.executeSql('insert into categories (value) values (?)', ['Gaji Bulanan'], (tx, resCategories) => {
                        resolve(resCategories.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into categories (value) values (?)', ['Project'], (tx, resCategories) => {
                        resolve(resCategories.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into categories (value) values (?)', ['Belanja Mingguan'], (tx, resCategories) => {
                        resolve(resCategories.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into categories (value) values (?)', ['Jalan-jalan'], (tx, resCategories) => {
                        resolve(resCategories.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into categories (value) values (?)', ['Kebutuhan Pribadi'], (tx, resCategories) => {
                        resolve(resCategories.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into categories (value) values (?)', ['Belanja Anak'], (tx, resCategories) => {
                        resolve(resCategories.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                }
            }, (_, error) => {
                reject(error);
            })
            tx.executeSql('select * from transactions where desc= ?', ['Kerjaan'], (tx, resultTransaction) => {
                const date = new Date();
                if (resultTransaction.rows.length < 1) {
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 7), 1, 200000, 'Pangandaran', 4], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 7), 1, 200000, 'Pangandaran', 4], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 7), 1, 200000, 'Pangandaran', 4], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 7), 1, 200000, 'Pangandaran', 4], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 7), 1, 200000, 'Pangandaran', 4], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 7), 0, 200000, 'Kerjaan', 1], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 7), 0, 200000, 'Kerjaan', 1], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 7), 0, 200000, 'Kerjaan', 1], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                    // 
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 6), 1, 300000, 'Ciwidey', 4], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 6), 1, 300000, 'Ciwidey', 4], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                    // 
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 5), 1, 200000, 'daging,baso dan sayuran', 3], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 5), 1, 200000, 'daging,baso dan sayuran', 3], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 5), 1, 200000, 'daging,baso dan sayuran', 3], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 5), 1, 200000, 'daging,baso dan sayuran', 3], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 5), 1, 200000, 'daging,baso dan sayuran', 3], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                    // 
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 4), 1, 150000, 'popok', 5], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 4), 1, 150000, 'popok', 5], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 4), 0, 200000, 'Projekan', 2], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 4), 0, 200000, 'Projekan', 2], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 4), 0, 200000, 'Projekan', 2], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 4), 0, 200000, 'Projekan', 2], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 4), 0, 200000, 'Projekan', 2], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 4), 0, 200000, 'Projekan', 2], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                    // 
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 3), 1, 50000, 'sayuran dan daging', 3], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 3), 1, 100000, 'sayuran dan daging', 3], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 3), 1, 150000, 'sayuran dan daging', 3], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 3), 0, 300000, 'Projekan', 2], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 3), 0, 400000, 'Projekan', 2], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                    // 
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 2), 1, 100000, 'earphone', 5], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 2), 1, 100000, 'earphone', 5], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                    // 
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 1), 1, 25000, 'susu', 6], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 1), 1, 25000, 'susu', 6], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 1), 0, 200000, 'Kerjaan', 1], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 1), 0, 200000, 'Kerjaan', 1], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 1), 0, 200000, 'Kerjaan', 1], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 1), 0, 200000, 'Kerjaan', 1], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })

                    // 
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 0), 1, 200000, 'Baju', 6], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 0), 0, 300000, 'Kerjaan', 1], (tx, resCategory) => {
                        resolve(resCategory.rowsAffected)
                    }, (_, error) => {
                        reject(error);
                    })
                    tx.executeSql('insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?)', [minusDays(date, 0), 0, 300000, 'Kerjaan', 1], (tx, resCategory) => {
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

function minusDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);

    return result.getFullYear() + '-' + SprintF(result.getMonth() + 1, 2) + '-' + SprintF(result.getDate(), 2);
}