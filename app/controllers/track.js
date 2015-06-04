import Ember from 'ember';

var PlaylistItem = Ember.Object.extend({
  isPlaying: false
});

export default Ember.Controller.extend({
  needs: ['application'],
  playlist: Ember.computed.alias('controllers.application.playlist'),
  actions: {
    add: function(item) {
      this.get('playlist').push(PlaylistItem.create(item));
    }
  }
});
