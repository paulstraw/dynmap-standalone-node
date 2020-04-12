import express from 'express'

import mysqlTiles from './routes/mysqlTiles'

const app = express()
const port = 3000

app.get('/mysql-tiles', mysqlTiles)

app.listen(port, () => console.log(`Listening on port ${port}`))
