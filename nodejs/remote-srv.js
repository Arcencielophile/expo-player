var server = require('expo-remote-server').listen(2890)
  , log4js = require('log4js');

// set up logger
log4js.replaceConsole();

server.set('transports', [
    'xhr-polling'
  , 'flashsocket'
  , 'websocket'
  , 'htmlfile'
  , 'jsonp-polling'
]);