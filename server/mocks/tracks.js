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

  function encodePath(p){
    return path.join(ApiMedia, q.escape(p));
  };

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
            files.push({name: f, path: q.escape(path.join(dirPath,f))});
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
    var dirs = [];
    var files = [];

    fs.readdir(MusicDir, function(err, content){
      var total = 0;

      content.forEach(function (f) {
        var fpath = path.join(MusicDir, f);

        fs.stat(fpath, function (err, stats){
          if (stats.isDirectory()) {
            dirs.push({
              id: q.escape(f),
              name: f,
              path: encodeURI(path.join(ApiTrack, f))});
          } else if (stats.isFile()) {
            files.push({name: f, path: q.escape(f)});
          }

          total++;
          if (total >= content.length){
            res.send({
              dirs: dirs,
              files: files
            });
          }
        });
      });
    });
  });

  tracksRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  tracksRouter.get('/:dir_path', function(req, res) {
    var dirPath = path.join(ApiTrack, q.unescape(path.normalize(req.params.dir_path)));
    readDir(dirPath, function cb(err, tree){
      if (err){
        res.status(404).end();
      } else {
        res.send(tree);
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
