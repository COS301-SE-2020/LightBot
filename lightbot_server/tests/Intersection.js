var socket = require('socket.io-client')('http://localhost:8000')
// var socket2 = require('socket.io-client')('http://localhost:8000')

function intervalsetter() {
  setInterval(
    () =>
      socket.emit('get-data', {
        'Direction_North_LN1:': 4,
        'Direction_North_LN2:': 5,
        'Direction_North_LN3:': 6,
        'Direction_East_LN1:': 3,
        'Direction_East_LN2:': 1,
        'Direction_South_LN1:': 5,
        'Direction_South_LN2:': 4,
        'Direction_South_LN3:': 5,
        'Direction_West_LN1:': 6,
        'Direction_West_LN2:': 8,
      }),
    3000
  )
}

//Intersection 1:
socket.emit('Int Connected', { Int_name: 'Jan Shoba X South St' })

socket.on('send-data', (data) => {
  console.log('Received request for ' + data)
  intervalsetter()
})

//Intersection 2:
// socket2.emit('Int Connected',"Lynwood X Jan Shoba");
