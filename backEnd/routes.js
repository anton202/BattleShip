let express = require('express');
let router = express.Router();

router.post('/setSession', (req, res) => {
    if (req.session.roomName) {
      req.session.positions = req.body.positions;
      return res.end()
    }
    req.session.positions = req.body.positions;
    req.session.roomName = req.body.roomName;
  
    res.redirect('../UI/battle/index.html');
  })
  
  router.get('/getSession', (req, res) => {
    res.json({
      positions: req.session.positions, roomName: req.session.roomName
    });
  })
  
  router.post('/setJoinGameRoomName', (req, res) => {
    req.session.roomName = req.body.roomName;
    res.end();
  })
  
  router.get('/deleteSession', (req, res) => {
    req.session.destroy(function (err) { })
    res.end();
  
  })
  
  router.get('/isSession', (req, res) => {
    if (req.session.roomName) {
      res.clearCookie('connect.sid', { path: '/' });
    }
    res.end();
  })

  module.exports = router;