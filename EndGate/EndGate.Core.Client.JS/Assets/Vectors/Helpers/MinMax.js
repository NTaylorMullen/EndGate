var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Assets) {
            var MinMax = (function () {
                function MinMax(min, max) {
                    this.Min = min;
                    this.Max = max;
                }
                return MinMax;
            })();
            Assets.MinMax = MinMax;            
        })(Core.Assets || (Core.Assets = {}));
        var Assets = Core.Assets;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
