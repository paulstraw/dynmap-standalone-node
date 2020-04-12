import connectionPool from '../connectionPool'

function getStandaloneFile(fileName, serverId = 0) {
  return new Promise((resolve, reject) => {
    const query = `SELECT Content from ${
      process.env.MYSQL_DB_PREFIX
    }StandaloneFiles WHERE FileName = ${connectionPool.escape(
      fileName
    )} AND ServerId = ${connectionPool.escape(serverId)}`

    connectionPool.query(query, (err, results, fields) => {
      if (err) {
        reject(err)
      }

      if (!results) {
        reject('Not found')
      }

      const row = results[0]

      resolve(row.Content)
    })
  })
}

export { getStandaloneFile }
