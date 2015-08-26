namespace("com.oferHaber.coolKeys").app = Backbone.View.extend({
    initialize: function () {

        this.eventbus = new Backbone.Model();

        // STATIC DATA, TO BE SYNC'd WITH THE COLLECTION FETCH / SYNC CHROMATIC KEYS
        this.keyCollection = new com.oferHaber.coolKeys.modules.keyboard.modules.keys.KeyCollection([
            {
                note: "C",
                octave: 4,
                frequency: "261",
                keyboardChar: "a"
            },
            {
                note: "C",
                isSharp: true,
                octave: 4,
                frequency: "277",
                keyboardChar: "w"
            },
            {
                note: "D",
                octave: 4,
                frequency: "293",
                keyboardChar: "s"
            },
            {
                note: "D",
                isSharp: true,
                octave: 4,
                frequency: "311",
                keyboardChar: "e"
            },
            {
                note: "E",
                octave: 4,
                frequency: "329.63",
                keyboardChar: "d"
            },
            {
                note: "F",
                octave: 4,
                frequency: "349.23",
                keyboardChar: "f"
            },
            {
                note: "F",
                isSharp: true,
                octave: 4,
                frequency: "369.99",
                keyboardChar: "t"
            },
            {
                note: "G",
                octave: 4,
                frequency: "392.00",
                keyboardChar: "g"
            },
            {
                note: "G",
                isSharp: true,
                octave: 4,
                frequency: "415.30",
                keyboardChar: "y"
            },
            {
                note: "A",
                octave: 4,
                frequency: "440.00",
                keyboardChar: "h"
            },
            {
                note: "A",
                isSharp: true,
                octave: 4,
                frequency: "466.16",
                keyboardChar: "u"
            },
            {
                note: "B",
                octave: 4,
                frequency: "493.88",
                keyboardChar: "j"
            },
            {
                note: "C",
                octave: 5,
                frequency: "523.25",
                keyboardChar: "k"
            },
            {
                note: "C",
                isSharp: true,
                octave: 5,
                frequency: "554.37",
                keyboardChar: "o"
            },
            {
                note: "D",
                octave: 5,
                frequency: "587.33",
                keyboardChar: "l"
            },
            {
                note: "D",
                isSharp: true,
                octave: 5,
                frequency: "622.25",
                keyboardChar: "p"
            },
            {
                note: "E",
                octave: 5,
                frequency: "659.26",
                keyboardChar: ";"
            },
            {
                note: "F",
                octave: 5,
                frequency: "698.46",
                keyboardChar: "'"
            },
            {
                note: "F",
                isSharp: true,
                octave: 5,
                frequency: "739.99",
                keyboardChar: "]"
            },
            {
                note: "G",
                octave: 5,
                frequency: "783.99"
            },
            {
                note: "G",
                isSharp: true,
                octave: 5,
                frequency: "830.61"
            },
            {
                note: "A",
                octave: 5,
                frequency: "880.00"
            },
            {
                note: "A",
                isSharp: true,
                octave: 5,
                frequency: "932.33"
            },
            {
                note: "B",
                octave: 5,
                frequency: "987.77"
            }
        ]);

        this.console = new com.oferHaber.coolKeys.modules.console.Controller({
            eventbus: this.eventbus
        });

        // Instanciate keyboard module
        this.keyboard = new com.oferHaber.coolKeys.modules.keyboard.Keyboard({
            eventbus: this.eventbus,
            keyCollection: this.keyCollection
        });

        // Instanciate sound-engine module
        this.soundEngine = new com.oferHaber.coolKeys.modules.soundEngine.Controller({
            eventbus: this.eventbus
        });

        // Instanciate the page-view module
        this.page = new com.oferHaber.coolKeys.pages.HomeView({
            eventbus: this.eventbus,
            keyCollection: this.keyCollection
        });

        this.presetsView = new com.oferHaber.coolKeys.modules.presets.PresetsView({
            el: $('#presetContainer ul'),
            eventbus: this.eventbus
        });

        // Instanciate Midi module
        this.midi = new com.oferHaber.coolKeys.modules.midi.Controller({
            eventbus: this.eventbus
        });

        /* this.network = com.oferHaber.coolKeys.modules.netowrk.Controller();*/
        return this;
    },

    render: function () {

    }
});