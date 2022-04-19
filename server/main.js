import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const sockets = {};
let UUID = 0;

// global.handleChat = handleChat = (data) => {

// }

// global.game = handleGame = (data) => {
// }

wss.on('connection', (ws) => {
  sockets[UUID] = ws;
  ws.id_socket = UUID;
  UUID = UUID + 1;

  ws.on('message', (data) => {
    //global[data.handle](data.handle);
  });

  ws.on('close', () => {
    delete sockets[ws.id_socket];
  });

  ws.send("Hello world ! ");
})
