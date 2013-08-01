/// <reference path="../../Scripts/endgate.js" />

(function () {

    QUnit.module("Audio Clip Facts");

    QUnit.test("AudioClip's dispose unbinds bound events.", function () {
        var clip = new eg.Sound.AudioClip("");

        clip.OnComplete.Bind(function () { });

        QUnit.isTrue(clip.OnComplete.HasBindings());

        clip.Dispose();

        QUnit.isFalse(clip.OnComplete.HasBindings());
    });

    QUnit.test("AudioClip's throw if disposed more than once.", function () {
        var clip = new eg.Sound.AudioClip("");

        clip.Dispose();

        QUnit.throws(function () {
            clip.Dispose();
        });
    });

})();
