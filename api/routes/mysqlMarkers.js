import { getStandaloneFile } from '../util/standaloneFiles'
import connectionPool from '../connectionPool'

const dbPrefix = process.env.MYSQL_DB_PREFIX

function getFace(req, res, markerPath, markerParts) {
  if (markerParts.length !== 3) {
    res.status(400)
    res.send(`400 Error. Bad face: ${markerPath}`)
    return
  }

  let faceTypeId = 0

  if (markerParts[1] === '8x8') {
    faceTypeId = 0
  } else if (markerParts[1] === '16x16') {
    faceTypeId = 1
  } else if (markerParts[1] === '32x32') {
    faceTypeId = 2
  } else if (markerParts[1] === '8x8') {
    faceTypeId = 3
  }

  const playerName = markerParts[2].split('.')[0]
  const query = `SELECT Image FROM ${dbPrefix}Faces WHERE PlayerName = ? AND TypeID = ?`

  connectionPool.query(query, [playerName, faceTypeId], (err, results) => {
    if (err) {
      throw err
    }
    const row = results[0]

    if (!row) {
      res.redirect('/images/blank.png')
      return
    }

    res.setHeader('Content-Type', 'image/png')
    res.send(row.Image)
  })
}

function getMarker(req, res, markerPath, markerParts) {
  // _markers_/marker_fixedblade2.json
  const markerNameParts = markerParts[1].split('.')
  const name = markerNameParts.slice(0, markerNameParts.length - 1).join('.')
  const extension = markerNameParts[markerNameParts.length - 1]

  if (extension === 'json' && name.indexOf('marker_') === 0) {
    const world = name.substr(7)
    const query = `SELECT Content FROM ${dbPrefix}MarkerFiles WHERE FileName = ?`

    connectionPool.query(query, [world], (err, results) => {
      if (err) {
        throw err
      }
      const row = results[0]

      res.setHeader('Content-Type', 'application/json; charset=utf-8')

      if (!row) {
        res.send({})
        return
      }

      res.send(row.Content)
    })
  } else {
    const query = `SELECT Image FROM ${dbPrefix}MarkerIcons WHERE IconName = ?`

    connectionPool.query(query, [name], (err, results) => {
      if (err) {
        throw err
      }
      const row = results[0]

      if (!row) {
        res.redirect('/images/blank.png')
        return
      }

      res.setHeader('Content-Type', 'image/png')
      res.send(row.Image)
    })
  }
}

export default async (req, res) => {
  const markerPath = req.query.marker

  if (!markerPath) {
    res.status(500)
    res.send('500 Error')
    return
  }

  const markerParts = markerPath.split('/')

  if (markerParts[0] != 'faces' && markerParts[0] != '_markers_') {
    res.status(400)
    res.send(`400 Error. Bad marker: ${markerPath}`)
    return
  }

  if (markerParts[0] === 'faces') {
    getFace(req, res, markerPath, markerParts)
  } else {
    getMarker(req, res, markerPath, markerParts)
  }
}
