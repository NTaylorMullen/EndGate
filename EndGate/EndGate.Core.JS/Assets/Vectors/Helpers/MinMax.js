var EndGate;
(function (EndGate) {
    (function (_) {
        var MinMax = (function () {
            function MinMax(min, max) {
                this.Min = min;
                this.Max = max;
            }
            return MinMax;
        })();
        _.MinMax = MinMax;        
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
