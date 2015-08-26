namespace("com.oferHaber.coolKeys.modules.soundEngine").Controller = Backbone.View.extend({

    initialize: function (options) {
        _.bindAll(this, "playNote");
        this.eventbus = options.eventbus;

        this.listenTo(this.eventbus, com.oferHaber.coolKeys.Events.EVENT_PLAY_NOTE, this.playNote);
    },

    playNote: function (noteModel) {

        var frequency = Number(noteModel.get("frequency"));
        var multitude = noteModel.get("multitude");
        var soundType = noteModel.get("soundType");
        var instrument = noteModel.get("instrument");
        var noteNumber = noteModel.get("number");

        //Play the note !
        if (!_.isUndefined(soundType)) {
            switch (soundType) {

                case "sample":

                    var src = './media/instruments/' + instrument + "/" + noteNumber + ".wav";
                    var audio1 = T("audio", {loop: false}).load(src);

                    $.when(audio1).then(function () {
                        T("+", audio1).play();
                    });
                    break;

                default:
                    var note = T(soundType, {freq: frequency, mul: multitude});
                    T("perc", {r: 500}, note).on("ended", function () {
                        this.pause();
                    }).bang().play();
                    delete note;
                    break;
            }
        }
        else {
            console.log("no soundtype declared in model !!");
        }
        delete frequency;
        delete  multitude;
        delete soundType;

    }

});