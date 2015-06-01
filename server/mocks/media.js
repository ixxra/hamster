module.exports = function(app) {
  var express = require('express');
  var mediaRouter = express.Router();

  var fs = require('fs');
  var ps = require('process');
  var path = require('path');
  var q = require('querystring');

  const MusicDir = path.join(ps.env['HOME'], 'Music');


  mediaRouter.get('/', function(req, res) {
    res.status(403).end();
  });

  mediaRouter.get('/:encoded_path', function(req, res) {
    var target = path.join(
      MusicDir,
      path.normalize(q.unescape(req.params.encoded_path))
    );

    fs.stat(target, function(err, stats) {
      if (err || !stats.isFile()) {
        res.status(404).end();
      } else {
        res.sendFile(target);
      }
    });
  });

  mediaRouter.post('/', function(req, res) {
    res.status(403).end();
  });

  mediaRouter.put('/:id', function(req, res) {
   res.status(403).end();
  });

  mediaRouter.delete('/:id', function(req, res) {
    res.status(403).end();
  });

  app.use('/api/media', mediaRouter);
};
