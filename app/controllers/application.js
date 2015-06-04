import Ember from 'ember';

var Player = Ember.Object.extend({
  playlist: [],
  _current: -1,
  current: function(){
    return this.get('playlist')[this.get('_current')];
  }.property('_current'),

  next: function(){
    if (this.get('_current') < this.get('playlist').length){
      this.incrementProperty('_current');
    }

    return this.get('current');
  },
  prev: function(){
    if (this.get('_current') > 0){
      this.decrementProperty('_current');
    }
  },

  jumpTo: function (item){
    this.set('_current', this.get('playlist').indexOf(item));
  }
});

var player = Player.create();

export default Ember.Controller.extend({
  playlist:player.playlist,
  player: player
});
