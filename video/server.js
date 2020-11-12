const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const { v4 } = require('uuid')
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${v4()}`)
})

app.get('/:room', (req, res) => {
  const roomId = req.params.room
  res.render('room', { roomId })
})

io.sockets.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(3000, () => console.log('Running on port 3000'))