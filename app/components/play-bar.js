import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['play-bar'],
  didInsertElement: function(){
      console.log('bang');
      this.$('#jplayer-slot').jPlayer({
        supplied: 'mp3'
      });
  }
});
