namespace("com.oferHaber.coolKeys.modules.keyboard.modules.keys").KeyView = Backbone.View.extend({
    initialize: function (options) {
        _.bindAll(this, "onClickKey");
        this.eventbus = options.eventbus;
        this.model.set("guid", guid());
        this.model.set("fk_keyView", this.model.get("guid"));
        this.render();
    },

    render: function () {

        var keyViewModel = this.model.toJSON();

        var keyTemplate = keyViewModel.isSharp ? $('#blackKeyTemplate').html() : $('#whiteKeyTemplate').html();
        var keyMarkup = _.template(keyTemplate);
        this.$el.append(keyMarkup(keyViewModel));

        //MOUSE CLICK
        $('#{0}'.format(this.model.get("guid"))).on("click", this.onClickKey);
    },

    /**
     * View events
     */
    onClickKey: function () {

        var noteModel = new com.oferHaber.coolKeys.models.NoteModel(this.model.toJSON());
        this.eventbus.trigger(com.oferHaber.coolKeys.Events.EVENT_PLAY_NOTE, noteModel);
        delete noteModel;
    }
});