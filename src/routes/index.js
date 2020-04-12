import mysqlTiles from './mysqlTiles'
import mysqlConfiguration from './mysqlConfiguration'
import mysqlUpdate from './mysqlUpdate'
import mysqlMarkers from './mysqlMarkers'
import mysqlSendMessage from './mysqlSendMessage'

function initializeRoutes(app) {
  app.get('/mysql-tiles', mysqlTiles)
  app.get('/mysql-configuration', mysqlConfiguration)
  app.get('/mysql-update', mysqlUpdate)
  app.get('/mysql-markers', mysqlMarkers)
  app.post('/mysql-send-message', mysqlSendMessage)
}

export { initializeRoutes }
