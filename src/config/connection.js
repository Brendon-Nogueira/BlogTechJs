// module.exports = {
//     username: 'root',
//     password: 'root',
//     database: 'blog_tech',
//     host: 'localhost',
//     dialect: 'mysql',
   
// }

require('dotenv').config()

module.exports = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
}
