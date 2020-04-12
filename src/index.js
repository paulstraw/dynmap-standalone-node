import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import mysqlTiles from './routes/mysqlTiles'
import mysqlConfiguration from './routes/mysqlConfiguration'
import mysqlUpdate from './routes/mysqlUpdate'
import mysqlMarkers from './routes/mysqlMarkers'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(morgan('combined'))

app.get('/mysql-tiles', mysqlTiles)
app.get('/mysql-configuration', mysqlConfiguration)
app.get('/mysql-update', mysqlUpdate)
app.get('/mysql-markers', mysqlMarkers)
app.use(express.static('./src/static'))

app.listen(port, () => console.log(`Listening on port ${port}`))
