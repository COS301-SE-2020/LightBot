module.exports = async (app) => {
  const io = require('socket.io')(app)

  let RLonline = false
  let Intersection = []
  let count = 0
  io.on('connection', (socket) => {
    console.log('Incoming Connection...')
    socket.on('RL Connected', (data) => {
      RLonline = true
      console.log('Current state of RLP: online')
    })
    socket.on('Int Connected', (data) => {
      console.log(data)
      Intersection[count++] = { id: socket.id, Int_name: data.Int_name }
      console.log('Current Intersections on Socket:')
      Intersection.forEach((element) => {
        console.log(element)
      })
    })
    socket.emit('send-data', 'state data')
    socket.on('get-data', (data) => {
      console.log(data)
      socket.emit('Intersection-Online', data)
    })
    socket.on('Optimize', (data) => {
      console.log(data)
    })
  })
}
