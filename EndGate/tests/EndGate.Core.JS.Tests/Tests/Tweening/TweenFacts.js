/// <reference path="../../Scripts/endgate.js" />

(function () {

    QUnit.module("Tween Facts");

    QUnit.test("Tween's have onChange triggered on the last tween interval.", function () {
        var from = 0,
            to = 3,
            gameTime = new eg.GameTime(),
            tween = new eg.Tweening.NumberTween(from, to, eg.TimeSpan.FromSeconds(.3), eg.Tweening.Functions.Linear.EaseNone);

        tween.Play();

        tween.OnChange.Bind(function (newVal) {
            from += newVal;
        });

        // 1 + 2 + 3 = 6

        gameTime.Elapsed.Milliseconds = 100;
        tween.Update(gameTime);
        QUnit.equal(from, 1);
        tween.Update(gameTime);
        QUnit.equal(from, 3);
        tween.Update(gameTime);
        QUnit.equal(from, 6);
    });

})();
