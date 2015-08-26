namespace("com.oferHaber.coolKeys.modules.network").Controller = Backbone.View.extend({

    initialize: function (options) {/*
     _.bindAll(this, "playNote");*/
        this.eventbus = options.eventbus;
        /*
         this.listenTo(this.eventbus, com.oferHaber.coolKeys.Events.EVENT_PLAY_NOTE, this.broad);*/
        // Initiate a connection

        this.socket = new WebSocket('ws://example.com:1234');

        // Fired when the connection has been established
        this.socket.onopen = function () {
            console.log('Connected to the server!');
        };

        // Fired when there is an error
        this.socket.onerror = function (error) {
            console.log('Error:', error);
        };

        // Fired when we receive a message from the server
        this.socket.onmessage = function (message) {
            console.log('Received:', message.data);
        };

        // Fired when the server has closed the connection
        this.socket.onclose = function () {
            console.log('Server disconnected');
        };

        // Send a message to the server
        socket.send("Hmmm.. I have nothing smart to say.");

        // Close the connection
        socket.close();
    },
    /**
     * Websockets
     */

});
