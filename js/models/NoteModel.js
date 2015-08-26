namespace("com.oferHaber.coolKeys.models").NoteModel = Backbone.Model.extend({
    defaults: {
        frequency: null,
        multitude: 0.5,
        soundType: "sin",
        fk_keyView: null,
        instrument: null,
        number: null
    }
});


