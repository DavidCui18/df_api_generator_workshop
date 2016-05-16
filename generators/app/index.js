'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var glob = require('glob');
var slugify = require('underscore.string/slugify');
var moment = require('moment')

module.exports = yeoman.generators.Base.extend({
  prompting: {
    dir: function() {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the smashing ' + chalk.red('generator-df-api') + ' generator!'
      ));

      this.slugify = slugify;
      this.moment = moment;
      var prompt = [{
        type: 'confirm',
        name: 'createDirectory',
        message: 'Would you like to create a new directory for your project?'
      }];

      this.prompt(prompt, function(response) {
        this.options.createDirectory = response.createDirectory;
        done();
      }.bind(this));
    },
    dirname: function() {

      if (!this.options.createDirectory || this.options.dirname) {
        return true;
      }

      var done = this.async();
      var prompt = [{
        type: 'input',
        name: 'dirname',
        message: 'Enter directory name'
      }];

      this.prompt(prompt, function(response) {
        this.options.dirname = response.dirname;
        done();
      }.bind(this));
    }
  },

  writing: {
    buildEnv: function() {
      let templatesPath = path.join(__dirname, 'templates');
      // create directory
      if (this.options.createDirectory) {
        this.destinationRoot(this.options.dirname);
        this.appname = this.options.dirname;
      }

      this.sourceRoot(path.join(templatesPath,'basic'));
      this.directory('.', '.');

      this.sourceRoot(path.join(templatesPath,'basic-shared'));
      this.directory('.', '.');
    }
  },

  install: function() {
    if (!this.options['skip-install']) this.installDependencies();
  }
});
