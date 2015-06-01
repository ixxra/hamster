import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    if (!params.track_path){
      return Ember.$.getJSON('/api/tracks');
    } else {
      return Ember.$.getJSON(params.track_path);
    }
  }
});
