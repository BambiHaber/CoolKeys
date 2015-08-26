namespace("com.oferHaber.coolKeys.pages").HomeView = Backbone.View.extend({
    initialize: function (options) {
        _.bindAll(this, 'onKey');

        this.eventbus = options.eventbus;
        this.keyCollection = options.keyCollection;

        $(document).bind('keypress', this.onKey);
        console.log("init");
    },
    onKey: function (event) {
        var keyCode = event.keyCode;
        var queryResult = this.keyCollection.findWhere({keyboardChar: String.fromCharCode(keyCode).toLowerCase()});

        if (!_.isUndefined(queryResult)) {
            var noteModel = new com.oferHaber.coolKeys.models.NoteModel({
                frequency: queryResult.get("frequency"),
                fk_keyView: queryResult.get("guid")
            });
            this.eventbus.trigger(com.oferHaber.coolKeys.Events.EVENT_PLAY_NOTE, noteModel);
            delete noteModel;
        }

        delete queryResult;
    }
});