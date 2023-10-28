const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const path = require('path')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(express.static(__dirname))

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach(client => {
      if(client != ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    })
  })
  ws.send('Welcome to the WebSocket chat!')
})

server.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
