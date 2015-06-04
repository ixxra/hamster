import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['play-bar'],

  play: function(item) {
    if (!item){
      return;
    }

    this.$('#jplayer-slot').jPlayer("setMedia", {
      mp3: item.get('multimedia'),
      title: item.get('name')
    }).jPlayer("play");
  },

  currentChanged: function(player){
    this.play(player.get('current'));
  },

  didInsertElement: function(){
      var player = this.get('player');
      player.addObserver('current', this, 'currentChanged');

      this.$('#jplayer-slot').jPlayer({
        ended: function(){
          player.next();
        }
      });

      if (player.get('current')){
        this.play(player.get('current'));
      }
  },

  actions: {
    next: function (){
      this.get('player').next();
    },

    prev: function () {
      this.get('player').prev();
    }
  }
});
