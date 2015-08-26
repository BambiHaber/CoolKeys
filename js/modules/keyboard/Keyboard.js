namespace("com.oferHaber.coolKeys.modules.keyboard").Keyboard = Backbone.View.extend({
    initialize: function (options) {
        this.eventbus = options.eventbus;
        this.keyCollection = options.keyCollection;

        this.model = new com.oferHaber.coolKeys.modules.keyboard.KeyboardModel({
            keyCollection: this.keyCollection
        });

        this.view = new com.oferHaber.coolKeys.modules.keyboard.KeyboardView({
            el: $('body'),
            model: this.model,
            eventbus: this.eventbus
        });
    },

    render: function () {

    }
});