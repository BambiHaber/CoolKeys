namespace("com.oferHaber.coolKeys.modules.presets").PresetsView = Backbone.View.extend({
    events: {
        'click': 'onSelectPreset'
    },
    initialize: function (options) {

        _.bindAll(this, "onSelectPreset");
        this.eventbus = options.eventbus;

        this.$presetElements = $('li', this.$el);
    },
    onSelectPreset: function (e) {

        this.$presetElements.removeClass('selected');
        $(e.target).addClass('selected');
    }
});