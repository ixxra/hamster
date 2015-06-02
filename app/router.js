import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('track', {path: '/tracks/:track_path'});
  this.route('playlist');
});

export default Router;
