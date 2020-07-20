module.exports = async (app) => {
  const io = require('socket.io')(require('http').Server(app))

  let RLonline = false
  let Intersection = []
  let count = 0
  io.on('connection', (socket) => {
    console.log('Incoming Connection...')
    socket.on('RL Connected', (data) => {
      RLonline = true
      console.log('Current state of RLP: online')
    })
    socket.on('Intersection', (data) => {
      console.log()
      Intersection[count++] = socket.id
      console.log('Current Intersections on Socket:')
      Intersection.forEach((element) => {
        console.log(element)
      })
    })
  })
}
