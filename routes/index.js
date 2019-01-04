var express = require('express');
var router = express.Router();

var mongo = require('../mongo');
/* GET home page. */
router.get('/api/get/list', function (req, res, next) {
  var params = req.query,
    page = params.page,
    page_size = params.page_size * 1,
    type = params.type * 1;
  mongo.connect(function (err, cols, db) {
    if (err) {
      res.json({ code: 0, msg: err });
    } else {
      cols.find({ type: type }).count(function (error, results) {
        var total = Math.ceil(results / page_size);
        
        var sizeNum = (page - 1) * page_size;
        cols.find({ type: type }).skip(sizeNum).limit(page_size).toArray(function (error, results) {
          db.close();
          if (error) {
            res.json({ code: 0, msg: error });
          } else {
            console.log(results)
            res.json({ code: 1, data: results,total:total});
          }
        })
      })
    }
  })
});

module.exports = router;
