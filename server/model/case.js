const Mysql = require('../util/mysql')
const mysqlConfig = require('../config/mysql')

const model = new Mysql(
    mysqlConfig.admin,
    `t_case`
)

module.exports = model;