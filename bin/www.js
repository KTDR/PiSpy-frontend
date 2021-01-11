#!/usr/bin/env node

/**
 * Module dependencies.
 */

var util = require('util') //Helpful for console debugging
var fs = require('fs');
var app = require('../app');
var debug = require('debug')('express-locallibrary-tutorial:server');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('security/certificates/key.pem', 'utf8');
var certificate = fs.readFileSync('security/certificates/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const HTTPS_MODE = true;
const ws = require('ws'); //websocket library
const { RequestTimeout } = require('http-errors');
var WebSocket = require('./MyWebsocket.js')

var WebSocket2 = new WebSocket();

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP or HTTPS server.
 */

var server = HTTPS_MODE ? https.createServer(credentials, app) : http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


//WEBSOCKETS//
//reference: https://stackoverflow.com/questions/22429744/how-to-setup-route-for-websocket-server-in-express
//from https://masteringjs.io/tutorials/express/websockets
// Set up a headless websocket server that prints any
// events that come in.

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
server.on('upgrade', (request, socket, head) => {
  var WebSocket2 = new WebSocket();
  WebSocket2.wsServer.handleUpgrade(request, socket, head, socket => {
    WebSocket2.wsServer.emit('connection', socket, request);
    console.log('New websocket connection! ' + util.inspect(head) );
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}