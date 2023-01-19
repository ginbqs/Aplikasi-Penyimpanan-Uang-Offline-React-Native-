import { SprintF } from '../utils/Number'
import database from './index'

export const fetchTransaction = (page) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `select * from transactions order by date desc limit 10 offset ?`,
                [((page - 1) * 10)],
                (tx, results) => {
                    var tempTransactions = []
                    var row = results.rows;
                    for (let i = 0; i < row.length; i++) {
                        tempTransactions.push({
                            id: row.item(i).id,
                            date: row.item(i).date,
                            position: row.item(i).position,
                            value: row.item(i).value,
                            desc: row.item(i).desc,
                            category_id: row.item(i).category_id,
                        })
                    }
                    resolve(tempTransactions)
                },
                (error) => {
                    reject(error)
                }
            )
        })
    })
}

export const fetchTransactionFilter = (filters) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            let where = '';
            if (filters?.date1 !== '' && filters?.date2 !== '') {
                let date1 = new Date(filters?.date1)
                let date2 = new Date(filters?.date2)
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} date >= '${date1.getFullYear()}-${SprintF(parseInt(date1.getMonth()) + 1, 2)}-${SprintF(parseInt(date1.getDate()), 2)} 00:00:00' and date <= '${date2.getFullYear()}-${SprintF(parseInt(date2.getMonth()) + 1, 2)}-${SprintF(date2.getDate(), 2)} 23:59:59' `
            }
            if (filters?.position_id === 'pengeluaran') {
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} position= '1' `
            }
            if (filters?.position_id === 'pemasukan') {
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} position= '0' `
            }
            if (filters?.category_id !== '') {
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} category_id= '${filters?.category_id}' `
            }
            if (filters?.desc !== '') {
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} desc like '%${filters?.desc}%' `
            }
            tx.executeSql(
                `select * from transactions ${where !== '' ? ` WHERE ${where}` : ''} order by date desc`,
                [],
                (tx, results) => {
                    var tempTransactions = []
                    var row = results.rows;
                    var totalSpending = 0;
                    var totalIncome = 0;
                    for (let i = 0; i < row.length; i++) {
                        tempTransactions.push({
                            id: row.item(i).id,
                            date: row.item(i).date,
                            position: row.item(i).position,
                            value: row.item(i).value,
                            desc: row.item(i).desc,
                            category_id: row.item(i).category_id,
                        })
                        if (row.item(i).position == 1) {
                            totalSpending += row.item(i).value;
                        } else {
                            totalIncome += row.item(i).value;
                        }
                    }
                    resolve({ data: tempTransactions, totalSpending: totalSpending, totalIncome: totalIncome })
                },
                (error) => {
                    reject(error)
                }
            )
        })
    })
}

export const deleteTransactionFilter = (filters) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            let where = '';
            if (filters?.date1 !== '' && filters?.date2 !== '') {
                let date1 = new Date(filters?.date1)
                let date2 = new Date(filters?.date2)
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} date >= '${date1.getFullYear()}-${SprintF(parseInt(date1.getMonth()) + 1, 2)}-${SprintF(parseInt(date1.getDate()), 2)} 00:00:00' and date <= '${date2.getFullYear()}-${SprintF(parseInt(date2.getMonth()) + 1, 2)}-${SprintF(date2.getDate(), 2)} 23:59:59' `
            }
            if (filters?.position_id === 'pengeluaran') {
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} position= '1' `
            }
            if (filters?.position_id === 'pemasukan') {
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} position= '0' `
            }
            if (filters?.category_id !== '') {
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} category_id= '${filters?.category_id}' `
            }
            if (filters?.desc !== '') {
                var and = '';
                and = `${where != '' ? ' AND ' : ''}`
                where += `${and} desc like '%${filters?.desc}%' `
            }
            tx.executeSql(
                `delete from transactions ${where !== '' ? ` WHERE ${where}` : ''}`,
                [],
                (tx, results) => {
                    resolve(true)
                },
                (error) => {
                    reject(error)
                }
            )
        })
    })
}

export const insertTransaction = (date, position, value, desc, category_id) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `insert into transactions (date,position,value,desc,category_id) values (?,?,?,?,?) `,
                [date, position, value, desc, category_id],
                (tx, results) => {
                    resolve(results)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
}
export const deleteTransactionItem = (id) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `delete from transactions where id=? `,
                [id],
                (tx, results) => {
                    resolve(results)
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })
}
export const updateTransactionItem = (id, position, date, value, desc, category_id) => {
    return promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `update transactions set position=?,date=?,value=?,desc=?,category_id=? where id=?`
                , [position, date, value, desc, category_id, id],
                (tx, results) => {
                    resolve(results);
                },
                (error) => {
                    reject(error);
                }
            )
        })
    })
}

export const sumTransaction = () => {
    return promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                `select SUM(CASE WHEN position='0' THEN value ELSE 0 END) as income,SUM(CASE WHEN position='1' THEN value ELSE 0 END) as spending from transactions`,
                [],
                (tx, results) => {
                    const row = results.rows;
                    var tempSum = {}
                    for (let i = 0; i < row.length; i++) {
                        tempSum = {
                            spending: row.item(i).spending,
                            income: row.item(i).income,
                            saldo: row.item(i).income - row.item(i).spending
                        }
                    }
                    resolve(tempSum)
                },
                (error) => {
                    reject(error)
                }
            )
        })
    })
}