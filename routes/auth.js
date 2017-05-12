let bcrypt = require('bcrypt')
let User = require('../models/User')
let jwt = require('jsonwebtoken')

module.exports = (express) => {
  let router = express.Router()
  router.route('/signup')
    .post((req, res, next) => {
      if (!req.body) {
        return res.status(400).json({
          error: 'empty body'
        })
      }
      req.body.password = bcrypt.hashSync(req.body.password, 10)
      console.log(`[vue-vote] POST /api/signup`, req.body.username)
      let newUser = new User(req.body)
      newUser.save((err, user) => {
        if (err) {
          if (err.code === 11000) {
            console.error(`[vue-vote] Failed to save new user "${req.body.username}". Username already exists.`, err)
            res.status(400).json({
              'error': 'Username already in use.'
            })
          } else {
            console.error(`[vue-vote] Failed to save new user "${req.body.username}".`, err)
            res.status(400).json({
              'error': err
            })
          }
        } else {
          console.info(`[vue-vote] User "${user}" created.`)
          let token = jwt.sign({username: user.username, _id: user._id}, 'a super secret awesome phras 312e')
          res.status(201).json({
            username: user.username,
            token: token
          })
        }
      })
    })
  router.route('/login')
    .post((req, res, next) => {
      console.log(`[vue-vote] POST /api/login`, req.body.username)
      if (!req.body) {
        console.error(`[vue-vote] Login attempt failed. No request body provided.`)
        return res.status(400).json({
          error: 'empty body'
        })
      }
      User.findOne({
        username: req.body.username
      }, (err, user) => {
        if (err) {
          console.warn(`[vue-vote] finding user "${req.body.username} failed."`, err)
          return res.status(401).json({
            error: 'unauthorized'
          })
        }
        if (!user) {
          console.warn(`[vue-vote] Login attempt failed for user "${req.body.username}". User does not exist.`)
          return res.status(401).json({
            error: 'unauthorized'
          })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // user.password = null
          // console.log('[vue-vote] Login attempt:', user)
          let token = jwt.sign({username: user.username, _id: user._id}, 'a super secret awesome phras 312e')
          return res.status(201).json({
            username: user.username,
            token: token
          })
        } else {
          console.warn(`[vue-vote] Login attempt failed for user "${req.body.username}". Invalid password.`)
          return res.status(401).json({
            error: 'unauthorized'
          })
        }
      })
    })
  router.route('/reset')
    .post((req, res, next) => {
      console.log(`[vue-vote] POST /api/reset`, req.user)
      if (!req.body) {
        console.error(`[vue-vote] reset attempt failed. No request body provided.`)
        return res.status(400).json({
          error: 'empty body'
        })
      }
      User.findOne({
        username: req.user.username
      }, (err, user) => {
        if (err) {
          console.warn(`[vue-vote] finding user "${req.user.username} failed."`, err)
          return res.status(500).json({
            error: 'db error'
          })
        }
        if (!user) {
          console.warn(`[vue-vote] Reset attempt failed for user "${req.user.username}". User does not exist.`)
          return res.status(400).json({
            error: 'User does not exist'
          })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // user.password = null
          // console.log('[vue-vote] Reset attempt:', user)
          user.password = bcrypt.hashSync(req.body.newPassword, 10)
          user.save((err, user) => {
            if (err) {
              console.error(`[vue-vote] Failed to save new user "${req.user.username}".`, err)
              res.status(400).json({
                'error': err
              })
            } else {
              console.info(`[vue-vote] User "${user.username}" password reset.`)
              let token = jwt.sign({username: user.username, _id: user._id}, 'a super secret awesome phras 312e')
              res.status(201).json({
                username: user.username,
                token: token
              })
            }
          })
        } else {
          console.warn(`[vue-vote] Reset attempt failed for user "${req.user.username}". Invalid password.`)
          return res.status(401).json({
            error: 'unauthorized'
          })
        }
      })
    })
  return router
}