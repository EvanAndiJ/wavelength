const db = require("../models");
const Room = db.room

exports.adminLogin = async (req, res) => {
  const pass = req.body.pass
  if (pass === process.env.DASH_PASS) {
    return res.status(200).send({auth: true})
  } else {
    return res.status(403).send({auth: false, err: 'incorrect password'})
  }
}