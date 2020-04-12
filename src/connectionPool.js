import mysql from 'mysql'

const connectionPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: parseInt(process.env.MYSQL_CONNECTION_POOL_SIZE, 10) || 3,
})

export default connectionPool
