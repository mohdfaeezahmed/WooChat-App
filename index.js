//Node server which will handle socket io connections.

const io = require('socket.io')(8001, {
    cors: {origin: "*"}
});



const users = {};

console.log("Socket.IO server is running on port 8001");

io.on('connection', socket => {
    socket.on('new-user-joined', userName => {
        //console.log("New user", userName);
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, userName: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})