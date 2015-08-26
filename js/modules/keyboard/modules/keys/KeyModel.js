namespace("com.oferHaber.coolKeys.modules.keyboard.modules.keys").KeyModel = Backbone.Model.extend({
    defaults: {
        note: null,
        octave: null,
        isSharp: false,
        keyboardChar: null,
        frequency : null
    },
    initialize: function () {

    }
});