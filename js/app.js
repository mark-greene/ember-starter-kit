App = Ember.Application.create();

App.ApplicationStore = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.PostAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', {
      path: ':post_id'
    });
  });
});

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  intro: DS.attr('string'),
  extended: DS.attr('string'),
  publishedAt: DS.attr('date')
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post');
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,
  edit: function() {
    this.set('isEditing', true);
  },
  doneEditing: function() {
    this.set('isEditing', false);
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});

Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).fromNow();
});

var showdown = new Showdown.converter();
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
  return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
});
