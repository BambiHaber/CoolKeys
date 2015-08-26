namespace("com.oferHaber.coolKeys.modules.keyboard.modules.keys").Key = Backbone.View.extend({
    initialize: function (options) {
        this.eventbus = options.eventbus;
        this.view = new com.oferHaber.coolKeys.modules.keyboard.modules.keys.KeyView({
            el: this.$el,
            model: this.model,
            eventbus: this.eventbus
        });
    }
});