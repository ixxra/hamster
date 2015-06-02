import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  playlist: Ember.computed.alias('controllers.application.playlist'),
  actions: {
    add: function(item) {
      this.get('playlist').push(item);
    }
  }
});
