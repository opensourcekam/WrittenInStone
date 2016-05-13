var _ = require('underscore');

// ALL VARS HERE ARE PASSED INTO THIS SOCKET.JS MODULE WITH THE bin/www file
module.exports = function(io, connections, title, audience, opinions, speaker, started, _24Hours) {

    // every second subtract a second :( from 24 hours :)
    setInterval(function() {
        _24Hours = _24Hours - 1000
            // console.log(_24Hours);
        io.sockets.emit('timer', {timeLeft: _24Hours})
    }, 1000);

    // console.log('in connection');
    console.log(typeof audience);
    io.on("connection", function(socket) {
        // disconnect func is called once user disconnect event occurs
        socket.once('disconnect', function() {
            // search audience arr for member id
            var member = _.findWhere(audience, {
                id: this.id
            });
            // search audience arr for member id
            if (member) {
                audience.splice(audience.indexOf(member), 1);
                io.sockets.emit('audience', audience);
                console.log(`${member.name} left! Audiende Size: ${audience.length}`);
            } else if (this.id === speaker.id) {
                console.log(`${speaker.name} left ${title} is over`);
                speaker = {};
                title = 'Untitled unmastered';
                started = 0;
                io.sockets.emit('end', {
                    title: title,
                    speaker: ''
                });
                // handle speakers leaving
            }

            connections.splice(connections.indexOf(socket), 1);
            // call s.disconnect in case socket doesent disconnect on client && server
            socket.disconnect;

            console.log('Disconnected socket! %s sockets remain', connections.length);
        });

        // Get join and emit new member and audience
        socket.on('join', function(payload) {
            var newMember = {
                id: this.id,
                name: payload.name,
                type: 'member'
            };
            // emit to recent joined member
            try {
                this.emit('joined', newMember);
            } catch (e) {
                console.log('Something is wrong here snag that bug! %s', e);
            }

            audience.push(newMember);
            io.sockets.emit('audience', audience);
            console.log('audience 2=> ', audience);
            console.log("Joined %s", payload.name);
            console.log('CUR audience', require('util').inspect(audience, {
                depth: null
            }));
        });

        socket.on('chat', function(payload) {
            // get the id of member, timestamp, and message
            var date = new Date()

            var chat = {
                id: this.id,
                timestamp: date.getTime(),
                chat: payload.chat
            }

            opinions.push(chat)
            io.sockets.emit('chat', opinions);
            console.log(chat);
        })

        // Start presentation
        socket.on('start', function(payload) {
            console.log(payload);
            speaker.name = payload.name;
            speaker.id = this.id;
            speaker.type = 'speaker';
            title = payload.title;
            started = 1;

            try {
                this.emit('joined', speaker);
            } catch (e) {
                console.log('Something is wrong here snag that bug! %s', e);
            }

            io.sockets.emit('start', {
                title: title,
                audience: audience,
                speaker: speaker.name,
                started: started
            });
            console.log(`Presentation on ${payload.title} by ${speaker.name} started`);
        });

        // Emit name of presentation to all users
        // socket.emit('welcome', function(payload){
        //   console.log('welcome');
        //   io.sockets.emit('start', {title:title, audience: audience, speaker:speaker.name, started: started});
        // })

        socket.emit('welcome', {
            title: title,
            audience: audience,
            opinions: opinions,
            speaker: speaker.name,
            started: started,
            timeLeft: _24Hours
        });


        // Add people into sockets && display to server how many connected
        connections.push(socket);
        console.log('Connected %s sockets', connections.length);
    });
}
