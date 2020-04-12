import { getStandaloneFile } from '../util/standaloneFiles'

export default async (req, res) => {
  const content = await getStandaloneFile('dynmap_config.json')

  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(200)

  if (process.env.DYNMAP_LOGIN_ENABLED === 'false') {
    res.send(content)
  }
}
