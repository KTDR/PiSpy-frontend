const ws = require('ws'); //websocket library
const { RequestTimeout } = require('http-errors');
var events = require('events');
const fs = require('fs');

//WEBSOCKETS//
//reference: https://stackoverflow.com/questions/22429744/how-to-setup-route-for-websocket-server-in-express
//from https://masteringjs.io/tutorials/express/websockets
// Set up a headless websocket server that prints any
// events that come in.

class MyWebsocket extends events.EventEmitter {
    constructor() {
        super()
        this.wsServer = new ws.Server({ noServer: true});
        this.outgoing = new Array();
        this.connected = false;
        this.mainsocket = null
        this.runningInterval = null
        
        console.log('created websocket object')
        this.wsServer.on('connection', socket => {
            this.connected = true;
            this.mainsocket = socket;
            this.runningInterval = setInterval(() => {
                this.checkMessages();
                this.syncUserDB();
                this.checkForDeleteUsers();
            }
            , 1000); 
            socket.on('message', message => {
                console.log("WebSocket message received: ");
                var messageObject
                try {
                    messageObject = JSON.parse(message);
                    this.emit('message', messageObject);
                    if (messageObject.command == 'GET_USERLIST') {
                        console.log('GOT THE USER LIST, UPDATING');
                        fs.writeFileSync('./storage/userDB.json', JSON.stringify(messageObject.payload, null, 4), error => console.log(error));    //This shouldn't be synchronous, a DB solution is preferable
                        console.log('writing to storage')
                    }
                
                    
                
                }
                catch (error){
                    console.log('failed to parse websocket request, error ' + error)
                }
                
            });
            socket.on('error', error => {
                console.log('Caught an error on websocket');
            });
        });
      
    }

    send(message) {
        this.outgoing.push(message);
    }
    
    checkMessages() {
        if (this.connected) {
            for (message of this.outgoing) {
                this.mainsocket.send(message)
            }
        }
    }
    syncUserDB() {
        var request = new RequestWrapper('GET_USERLIST');
        var requestString =  JSON.stringify(request);
        this.mainsocket.send(requestString);
    }
    checkForDeleteUsers() {
        console.log(needsToBeDeleted)
        var request = new RequestWrapper('DELETE_USER');
        
        var needsToBeDeleted = fs.readFileSync('./storage/userToDelete.txt', {encoding:'utf8', flag:'r'}, error => console.log(error)).trim();
        
        if (needsToBeDeleted.length> 3) {
            request.payload = {name: needsToBeDeleted};
            console.log('Deleting user ' + needsToBeDeleted + ' from the backend')
            var requestString = JSON.stringify(request);
            this.mainsocket.send(requestString);
            fs.writeFileSync('./storage/userToDelete.txt', '', error => console.log(error));
        }
    }
}

class RequestWrapper {
    constructor(command='unspecified') {
        this.command = command
        this.passkey = ''
        this.replying = false
        this.payload = {}
    }
}

class UserObject {
    constructor() {
        this.name = '';
        this.imageEncode = '';
    }
}

class UserListObject {
    constructor() {
        this.name = '';
    }
}

module.exports = MyWebsocket