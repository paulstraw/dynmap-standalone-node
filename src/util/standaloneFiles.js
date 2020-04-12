import connectionPool from '../connectionPool'

const dbPrefix = process.env.MYSQL_DB_PREFIX

function getStandaloneFile(fileName, serverId = 0) {
  return new Promise((resolve, reject) => {
    const query = `SELECT Content from ${dbPrefix}StandaloneFiles WHERE FileName = ? AND ServerID = ?`

    connectionPool.query(
      query,
      [fileName, serverId],
      (err, results, fields) => {
        if (err) {
          reject(err)
          return
        }

        if (!results) {
          reject('Not found')
          return
        }

        const row = results[0]

        resolve(row.Content)
      }
    )
  })
}

async function updateStandaloneFile(fileName, content, serverId = 0) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${dbPrefix}StandaloneFiles SET Content = ? WHERE FileName = ? AND ServerID = ?`

    connectionPool.query(query, [content, fileName, serverId], (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve('ok')
    })
  })
}

async function insertStandaloneFile(fileName, content, serverId = 0) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${dbPrefix}StandaloneFiles (Content, FileName, ServerID) VALUES (?, ?, ?)`

    connectionPool.query(query, [content, fileName, serverId], (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve('ok')
    })
  })
}

export { getStandaloneFile, updateStandaloneFile, insertStandaloneFile }
