import express from 'express'
import cors from 'cors'

import mysqlTiles from './routes/mysqlTiles'

const app = express()
const port = 3000

app.use(cors())

app.get('/mysql-tiles', mysqlTiles)

app.listen(port, () => console.log(`Listening on port ${port}`))
