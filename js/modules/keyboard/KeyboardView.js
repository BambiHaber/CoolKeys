namespace("com.oferHaber.coolKeys.modules.keyboard").KeyboardView = Backbone.View.extend({

    initialize: function (options) {

        _.bindAll(this, "render");
        this.eventbus = options.eventbus;
        this.keyCollection = this.model.get("keyCollection");

        this.render();
        this.listenTo(this.eventbus, com.oferHaber.coolKeys.Events.EVENT_PLAY_NOTE, this.pushKey)
    },

    render: function () {
        this.keyCollection.each(_.bind(function (keyModel) {
            new com.oferHaber.coolKeys.modules.keyboard.modules.keys.Key({
                el: $('#keysContainer', this.$el),
                model: keyModel,
                eventbus: this.eventbus
            });
        }, this));
    },

    pushKey: function (noteModel) {

        $('#{0}'.format(noteModel.get("fk_keyView"))).addClass("clicked");
        setTimeout(function () {
            $('#{0}'.format(noteModel.get("fk_keyView"))).removeClass("clicked");
        }, 400);
    }
});