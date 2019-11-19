
const server=require('../server').io
var ion = require('socket.io')(server);

ion.on('connection', function(socket) {
	console.log('Un cliente se ha conectado');
});
