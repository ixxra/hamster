import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  playlist: Ember.computed.alias('controllers.application.playlist'),
  player: Ember.computed.alias('controllers.application.player'),

  currentChanged: function (){
    var player = this.get('player');

    if (!player.get('current')){
      return;
    }

    player.get('playlist').forEach(function (item){
      item.set('isPlaying', false);
    });

    player.get('current').set('isPlaying', true);

  }.observes('player.current').on('init'),

  actions: {
    play: function play(item){
      this.get('player').jumpTo(item);
    }
  }
});
