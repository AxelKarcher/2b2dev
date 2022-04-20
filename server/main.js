import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })
const sockets = {}
let UUID = 0

// global.handleChat = handleChat = (data) => {

// }

// global.game = handleGame = (data) => {
// }

const messages = ['salut', 'simon', 'btcqb']

wss.on('connection', (ws) => {
  sockets[UUID] = ws
  ws.id_socket = UUID
  UUID = UUID + 1

  ws.send(JSON.stringify(messages))

  ws.on('message', (data) => {
    let parsedData = JSON.parse(data)

    messages.push(parsedData)

    if (messages.length === 11) {
      messages.shift()
    }

    for (let i in sockets) {
      sockets[i].send(JSON.stringify(parsedData))
    }
  })

  ws.on('close', () => {
    delete sockets[ws.id_socket]
  })
})
