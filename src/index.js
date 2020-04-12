import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import session from 'express-session'
import bodyParser from 'body-parser'

import { initializeRoutes } from './routes'

const app = express()
const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

app.use(bodyParser.json())
app.use(cors())
app.use(morgan(isDev ? 'dev' : 'combined'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
)
app.use(express.static('./src/static'))

initializeRoutes(app)

app.listen(port, () => console.log(`Listening on port ${port}`))
