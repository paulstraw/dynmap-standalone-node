import connectionPool from '../connectionPool'

export default (req, res) => {
  const tilePath = req.query.tile

  if (!tilePath || tilePath === '..') {
    res.status(500)
    res.send('500 Error')
    return
  }

  const tilePathParts = tilePath.split('/')

  if (tilePathParts.length != 4) {
    res.setHeader('Location', '../images/blank.png')
    return
  }

  let world = tilePathParts[0]
  let variant = 'STANDARD'
  let prefix = tilePathParts[1]
  let prefixLength = prefix.length
  if (prefixLength > 4 && prefix.substr(prefixLength - 4) === '_day') {
    prefix = prefix.substr(prefixLength - 4)
    variant = 'DAY'
  }

  const mapId = `${world}.${prefix}`

  const fParts = tilePathParts[3].split('_')
  let zoom, x, y
  if (fParts.length === 3) {
    // zoom_x_y
    zoom = fParts[0].length
    x = parseInt(fParts[1], 10)
    y = parseInt(fParts[2], 10)
  } else if (fParts.length === 2) {
    // x_y
    zoom = 0
    x = parseInt(fParts[0], 10)
    y = parseInt(fParts[1], 10)
  } else {
    res.setHeader('Location', '../images/blank.png')
    res.send('')
    return
  }

  const query = `SELECT t.Image,t.Format,t.HashCode,t.LastUpdate FROM Maps m JOIN Tiles t WHERE m.WorldID=${connectionPool.escape(
    world
  )} AND m.MapID=${connectionPool.escape(
    prefix
  )} AND m.Variant=${connectionPool.escape(
    variant
  )} AND m.ID=t.MapID AND t.x=${connectionPool.escape(
    x
  )} AND t.y=${connectionPool.escape(y)} and t.zoom=${connectionPool.escape(
    zoom
  )}`

  connectionPool.query(query, (err, results, fields) => {
    if (err) {
      throw err
    }
    const row = results[0]

    if (!row) {
      res.setHeader('Location', '../images/blank.png')
      res.send('')
      return
    }

    res.setHeader('Content-Type', row.Format === 0 ? 'image/png' : 'image/jpeg')
    res.setHeader('Etag', row.HashCode)
    res.setHeader('Last-Modified', new Date(row.LastUpdate).toUTCString())
    res.send(row.Image)
  })
}
