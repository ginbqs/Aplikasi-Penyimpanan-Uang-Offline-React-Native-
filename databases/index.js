import SQLite from 'react-native-sqlite-storage';

const database = SQLite.openDatabase(
    { 
        name: 'uangku.db',
        location: 'default'
    },
    () => {},
    (error) => { console.log(error); }
)

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction(function(tx) {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS configs (
                id TEXT PRIMARY KEY NOT NULL,
                value TEXT NOT NULL
            )`);
            tx.executeSql(`CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                value TEXT NOT NULL
            )`);
            tx.executeSql(`CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                date TEXT NOT NULL,
                position TEXT NOT NULL,
                value REAL NOT NULL,
                desc TEXT NULL,
                category_id INTEGER NULL
            )`);
        }, function(error) {
            reject(error);
        }, function() {
            resolve();
        });
    })
    return promise
}

export default database