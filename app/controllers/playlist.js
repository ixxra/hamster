import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  playlist: Ember.computed.alias('controllers.application.playlist'),

  actions: {
    play: function play(item){
      Ember.$('#jplayer-slot').jPlayer("setMedia", {
        mp3: item.multimedia,
        title: item.name
      }).jPlayer("play");
    }
  }
});
