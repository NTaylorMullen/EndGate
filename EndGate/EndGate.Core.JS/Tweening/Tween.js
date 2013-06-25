var eg;
(function (eg) {
    (function (Tweening) {
        var Tween = (function () {
            function Tween(from, to) {
            }
            Object.defineProperty(Tween.prototype, "Playing", {
                get: function () {
                    return this._playing;
                },
                enumerable: true,
                configurable: true
            });
            return Tween;
        })();
        Tweening.Tween = Tween;
    })(eg.Tweening || (eg.Tweening = {}));
    var Tweening = eg.Tweening;
})(eg || (eg = {}));
