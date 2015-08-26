namespace("com.oferHaber.coolKeys.modules.midi").Controller = Backbone.View.extend({

    initialize: function (options) {
        _.bindAll(this, "getAccess", "getDeviceIoCollection", "frequencyFromNoteNumber", "onMidiReady", "noteOn", "noteOff");

        this.eventbus = options.eventbus;


        this.listenTo(this.eventbus, "MIDI_READY", this.onMidiReady);

        _.defer(_.bind(function () {
            this.getAccess();

        }, this));

        this.synth = T("OscGen", {wave: "saw", mul: 0.25}).play();
    },

    listenToMidiEvents: function () {

        this.onMidiMessage = _.bind(function (event) {
            var str = "MIDI message received at timestamp " + event.timestamp + "[" + event.data.length + " bytes]: ";
            for (var i = 0; i < event.data.length; i++) {
                str += "0x" + event.data[i].toString(16) + " ";
            }
            appInstance.console.log(str);


            // Mask off the lower nibble (MIDI channel, which we don't care about)
            switch (event.data[0] & 0xf0) {
                case 0x90:
                    if (event.data[2] != 0) {  // if velocity != 0, this is a note-on message
                        appInstance.console.log("Note on message");

                        this.noteOn(event.data[1]);
                        return;
                    }
                // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
                case 0x80:
                    appInstance.console.log("Note off message");

                    this.noteOff(event.data[1]);
                    return;
            }

        }, this);

        this.midi.inputs.forEach(_.bind(function (entry) {

            entry.onmidimessage = this.onMidiMessage;
        }, this));
    },

    frequencyFromNoteNumber: function (note) {

        return 440 * Math.pow(2, (note - 69) / 12);
    },

    getAccess: function () {


        this.midi = null;  // global MIDIAccess object

        var onMIDISuccess = _.bind(function (midiAccess) {
            this.midi = midiAccess;  // store in the global (in real usage, would probably keep in an object instance)
            appInstance.console.log('midi Ready');
            this.eventbus.trigger("MIDI_READY");
        }, this);

        var onMIDIFailure = function (msg) {
            appInstance.console.log('Failed to get MIDI access - ' + msg);
        };

        if (_.isUndefined(navigator.requestMIDIAccess)) {
            appInstance.console.log("Your browser does not support Midi access, please run Chrome Canary 44+");
        }
        else {
            navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
        }
    },


    getDeviceIoCollection: function () {

        appInstance.console.log("Input list");

        this.midi.inputs.forEach(function (input) {

            appInstance.console.log(JSON.stringify(input));
            for (var property in input) {
                appInstance.console.log(JSON.stringify(input[property]) + " -- ", false);
            }
        });
        appInstance.console.log("output list");

        this.midi.outputs.forEach(function (output) {

            appInstance.console.log(JSON.stringify(output));
            for (var property in output) {
                appInstance.console.log(JSON.stringify(output[property]) + " -- ", false);
            }
        });

    },

    onMidiReady: function () {

        this.getDeviceIoCollection();
        this.listenToMidiEvents();

    },
    noteOn: function (note) {

        console.log("note on " + note);

        var selectedInstrument = $('#presetContainer li.selected').data('instrument');
        var soundType = (selectedInstrument != "sin") ? "sample" : "sin";
        var noteModel = new com.oferHaber.coolKeys.models.NoteModel(
            {
                frequency: this.frequencyFromNoteNumber(note),
                multitude: 0.5,
                soundType: soundType,
                fk_keyView: null,
                instrument: selectedInstrument,
                number: note
            });

        this.eventbus.trigger(com.oferHaber.coolKeys.Events.EVENT_PLAY_NOTE, noteModel);

    },
    noteOff: function (note) {

        console.log("note off " + note);
        // this.synth.noteOff(this.frequencyFromNoteNumber(note), 100);
    }
});