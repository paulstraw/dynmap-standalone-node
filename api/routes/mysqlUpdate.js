import { getStandaloneFile } from '../util/standaloneFiles'

export default async (req, res) => {
  const { world } = req.query

  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (world.indexOf('/') > -1 || world.indexOf('\\') > -1) {
    res.status(400)
    res.send({ error: 'invalid-world ' })
    return
  }

  const content = await getStandaloneFile(`dynmap_${world}.json`)
  res.status(200)

  if (process.env.DYNMAP_LOGIN_ENABLED !== 'true') {
    res.send(content)
  }
}
