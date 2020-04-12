import {
  getStandaloneFile,
  updateStandaloneFile,
  insertStandaloneFile,
} from '../util/standaloneFiles'

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  const dynmapConfigContent = await getStandaloneFile('dynmap_config.json')
  const config = JSON.parse(dynmapConfigContent)
  let messageInterval = config['webchat-interval']
    ? config['webchat-interval'] * 1000
    : 2000

  const lastChat = req.session.lastChat || 0
  const now = new Date().getTime()

  if (lastChat < now) {
    const chatData = {
      ...req.body,
      timestamp: now,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    }

    let gotOldMessages = false
    let oldMessages
    let newMessages = []
    let dynmapWebchatContent

    try {
      dynmapWebchatContent = await getStandaloneFile('dynmap_webchat.json')
    } catch (err) {
      // noop
    }

    if (dynmapWebchatContent) {
      oldMessages = JSON.parse(dynmapWebchatContent)
      gotOldMessages = true
    }

    if (oldMessages) {
      oldMessages.forEach((message) => {
        if (now - config.updaterate - 10000 < message.timestamp) {
          newMessages.push(message)
        }
      })
    }

    newMessages.push(chatData)

    if (gotOldMessages) {
      await updateStandaloneFile(
        'dynmap_webchat.json',
        JSON.stringify(newMessages)
      )
    } else {
      await insertStandaloneFile(
        'dynmap_webchat.json',
        JSON.stringify(newMessages)
      )
    }

    req.session.lastChat = now + messageInterval
    res.status(201)
    res.send({ error: 'none' })
  } else if (lastChat >= now) {
    console.log('THERE SHE BLOWS')
    res.status(403)
    res.end()
  } else {
    res.send({ error: 'none' })
  }
}
