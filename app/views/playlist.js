import Ember from 'ember';

export default Ember.View.extend({
  click: function (evt) {
    console.log('click');
    console.log(evt);
    console.log(evt.target);
  }
});
