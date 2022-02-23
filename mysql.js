const mysql = require('mysql');
require("dotenv").config();

const pool = mysql.createPool(
    {
        connectionLimit:10,
        password:process.env.db_password,
        user:process.env.db_user,
        database:process.env.db_database,
        host:process.env.db_host,
        port:process.env.db_port
    }
)

let mysqldb = {};

mysqldb.all = () => {
    return new Promise((resolve,reject) => {
        pool.query('SELECT * FROM cryptos',(err,result) => {
            if (err) {
                return reject(err);
            }else {
                return resolve(result)
            }
        })
    })
};1

mysqldb.exchanges = () => {
    return new Promise((resolve,reject) => {
        pool.query('SELECT exchange FROM cryptos',(err,result) => {
            if (err) {
                return reject(err);
            }else {
                let exchanges = []
                result.forEach(element => {
                    exchanges.push(element.exchange)
                });
                return resolve(exchanges)
            }
        })
    })
}

mysqldb.coins = () => {
    return new Promise((resolve,reject) => {
        pool.query('SHOW COLUMNS FROM cryptos',(err,result) => {
            if (err) {
                return reject(err);
            }else {
                let each = []
                result.forEach(element => {
                    if(element.Field != 'exchange'){
                        each.push(element.Field)
                    }
                });
                return resolve(each)
            }
        })
    })
}


mysqldb.exchange = (exchange) => {
    return new Promise((resolve,reject) => {
        pool.query('SELECT * FROM cryptos WHERE exchange="'+exchange+'"',(err,result) => {
            if (err) {
                return reject(err);
            }else {
                return resolve(result)
            }
        })
    })
}

mysqldb.coin = (coin) => {
    return new Promise((resolve,reject) => {
        pool.query('SELECT exchange,'+coin+' FROM cryptos',(err,result) => {
            if (err) {
                return reject(err);
            }else {
                let each = {coin:coin+'/USDT'}
                result.forEach(element => {
                    each[element.exchange] = element[coin];
                });
                return resolve(each)
            }
        })
    })
}

module.exports = mysqldb;s