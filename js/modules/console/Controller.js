namespace("com.oferHaber.coolKeys.modules.console").Controller = Backbone.View.extend({
    el: '.output',
    initialize: function (options) {
        _.bindAll(this, "log");
    },
    log: function (text, breakline) {
        if (!breakline) {
            this.$el.append("<br/>");
        }
        this.$el.append(text);
    }
});