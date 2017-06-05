let Poll = require('../models/Poll')
let User = require('../models/User')
module.exports = function (express) {
  let router = express.Router()
  router.route('/:id') 
    // requires user. Adds post to req.user
    .put((req, res, next) => {
      console.log(`[vue-vote] PUT /api/polls/:id`, req.body)
      if (!req.user) { return res.status(401).json({ error: 'Unauthorized' })}
      return res.status(501).json({error: 'Not implemented'})
    })

  router.route('/') 
    // requires user. Adds post to req.user
    .get((req, res, next) => {
      console.log(`[vue-vote] get /api/poll`)
      if (!req.user) { return res.status(401).json({ error: 'Unauthorized' })}
      //
    })
    .post((req, res, next) => {
      console.log(`[vue-vote] POST /api/poll`, req.body)
      // check auth
      if (!req.user) { return res.status(401).json({ error: 'Unauthorized' })}
      User.findOne({_id: req.user._id}, '-password')
      .exec(function (err, user) {
        if (err) { 
            return res.status(400).json({'error':err}
          )
        } else {
          console.info('Found the user, adding post')
          let newPoll = new Poll({question: req.body.question, options: req.body.options, creator_id: req.user._id})
          newPoll.save(function (err, poll) {
            if (err) { return res.status(400).json({'error': err}) }
            console.log('Success!')
            res.status(201).json(poll)
          })
        }     
      })
    })
  return router
}