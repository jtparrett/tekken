window.opts = {
  padding: 45,
  size: {
    width: 1024,
    height: 555
  },
  players: [{

      name: 'Carl Kelly',
      height: 160,
      width: 61,
      health: 50,
      regen: 0.05,
      color: '#febdd1',
      actionSize: {
        height: 160,
        width: 122
      },
      images: {
        default: 'app/images/player-1.png',
        punch: 'app/images/player-1-punch.png'  
      },
      events: [{
        key: 65, // left
        event: 'moveBackward'
      },{
        key: 68, // right
        event: 'punch'
      },{
        key: 83, // down
        event: 'moveForward'
      },{
        key: 87, // up
        event: 'punch'
      }]

    },{

    name: 'Joshy P',
    height: 160,
    width: 61,
    health: 50,
    regen: 0.05,
    color: '#d23b3e',
    direction: 'left',
    actionSize: {
      height: 160,
      width: 122
    },
    images: {
      default: 'app/images/player-2.png',
      punch: 'app/images/player-2-punch.png'  
    },
    events: [{
      key: 37, // left
      event: 'punch'
    },{ 
      key: 39, // right
      event: 'moveForward'
    },{
      key: 40, // down
      event: 'moveBackward'
    },{
      key: 38, // up
      event: 'punch'
    }]

  }]
};