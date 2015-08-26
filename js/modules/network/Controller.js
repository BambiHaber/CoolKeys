namespace("com.oferHaber.coolKeys.modules.network").Controller = Backbone.View.extend({

    initialize: function (options) {/*
     _.bindAll(this, "playNote");*/
        this.eventbus = options.eventbus;
        this.handler = new com.oferHaber.coolKeys.modules.network.modules.websocketHandler.Controller();
    },

    getHandler: function () {
        return this.handler
    }


});
