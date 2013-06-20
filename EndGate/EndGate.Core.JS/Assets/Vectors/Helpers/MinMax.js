var eg;
(function (eg) {
    (function (_) {
        var MinMax = (function () {
            function MinMax(min, max) {
                this.Min = min;
                this.Max = max;
            }
            return MinMax;
        })();
        _.MinMax = MinMax;
    })(eg._ || (eg._ = {}));
    var _ = eg._;
})(eg || (eg = {}));
