/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsAudioHandling.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        audioHandler: AudioHandler = null;

    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    audioHandler = new AudioHandler(canvas);

})($, window);