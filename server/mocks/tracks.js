module.exports = function(app) {
  var express = require('express');
  var tracksRouter = express.Router();

  var ps = require('process');
  var path = require('path');
  var fs = require('fs');
  var q = require('querystring');

  const MusicDir = path.join(ps.env['HOME'], 'Music');
  const ApiMedia = '/api/media';
  const ApiTrack = '/api/tracks';

  function pathToMedia(p){
    return path.join(ApiMedia, q.escape(p));
  };

  /**
  ** readDir (dirPath, callback)
  ** reads dir with path relative to the Music folder.
  **
  ** Arguments:
  **
  ** @dirPath Path to dir, relative to Music folder.
  ** @callback callback function. Should be of the form
  **
  ** function callback(error, contents);
  **
  ** where contents is a json object of the form {dirs: [], files: []} or
  ** null if there is any error.
  **/
  function readDir(dirPath, callback){
    var dirs = [];
    var files = [];
    var rootPath = path.join(MusicDir, dirPath);
    fs.readdir(rootPath, function(err, content){
      if (err || !content){
        callback(err, null);
        return;
      }
      var total = 0;

      content.forEach(function (f) {
        var fpath = path.join(rootPath, f);

        fs.stat(fpath, function (err, stats){
          if (stats.isDirectory()) {
            dirs.push({
              id: q.escape(path.join(dirPath, f)),
              name: f,
              path: encodeURI(path.join(dirPath,f))
            });
          } else if (stats.isFile()) {
            files.push({
              id: q.escape(path.join(dirPath, f)),
              name: f,
              multimedia: pathToMedia(path.join(dirPath,f))
            });
          }

          total++;
          if (total >= content.length){
            callback(null, {
              dirs: dirs,
              files: files
            });
          }
        });
      });
    });
  };


  tracksRouter.get('/', function(req, res) {
    readDir('/', function callback(err, content){
      if (err){
        res.status(404).end();
      } else{
        res.send(content);
      }
    });
  });

  tracksRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  tracksRouter.get('/:dir_path', function(req, res) {
    var dirPath = q.unescape(path.normalize(req.params.dir_path));
    readDir(dirPath, function callback(err, content){
      if (err){
        res.status(404).end();
      } else {
        res.send(content);
      }
    });
  });

  tracksRouter.put('/:id', function(req, res) {
    res.send({
      'tracks': {
        id: req.params.id
      }
    });
  });

  tracksRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/tracks', tracksRouter);
};
