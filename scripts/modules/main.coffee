MainCtrl = require './controllers/MainCtrl.coffee'

module.exports = angular.module 'mainApp', []
  .controller 'MainCtrl', ['$scope', MainCtrl]
