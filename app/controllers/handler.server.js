
var Going = require('../models/going.js')

module.exports = function ServerHandler () {
  this.going = (req,res) => {
    Going
      .findOne({name: req.query.name})
      .exec((err, result) => {
        if(err) {throw error;}
        if(result) {
          var index = result.people.indexOf(req.user.twitter.id)
          if(index===-1){
            console.log(2)
            var array = result.people
            array.push(req.user.twitter.id)
            console.log(array)
            Going
              .findOneAndUpdate({name: req.query.name, people: array})
              .exec((err, result) => {
                if (err) { throw err; }
                var test = result
                test.people = array
      					res.json(test);
              })
          }else{
            console.log(1)
            var array = result.people
            array.splice(index,1)
            console.log(array)
            Going
              .findOneAndUpdate({name: req.query.name, people: array})
              .exec((err, result) => {
                if (err) { throw err; }
                var test = result
                test.people = array
      					res.json(test);
              })
          }
        }else{
          let obj = new Going({
            name: req.query.name,
            people: [req.user.twitter.id]
          })
          obj.save((err, doc) => {
            if (err) {throw error;}
            res.json(doc)
          })
        }
      })
  }
  this.getPeople = (req, res) => {
    Going
      .findOne({name:req.query.name})
      .exec((err, result) => {
        if(err) {throw err;}
        if(result) {
          res.json(result)
        }else{
          let obj = new Going({
            name: req.query.name,
            people: []
          })
          obj.save((err, doc) => {
            if (err) {throw error;}
            res.json(doc)
          })
        }
      })
  }
}
