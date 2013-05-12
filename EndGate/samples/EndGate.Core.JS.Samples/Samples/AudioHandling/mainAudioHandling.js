(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), audioHandler = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    audioHandler = new AudioHandler(canvas);
})($, window);
//@ sourceMappingURL=mainAudioHandling.js.map
